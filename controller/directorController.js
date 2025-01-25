const Director = require("../model/Director");
const User = require("../model/User")
const ChangeLog = require("../model/BoardOfDirectorchangeLog");

const createLog = async (
  action,
  collectionName,
  itemId,
  performedBy,
  changeDetails
) => {
  const log = new ChangeLog({
    action,
    collectionName,
    itemId,
    performedBy,
    changeDetails,
  });
  await log.save();
};

const createDirector = async (req, res) => {
  try {
    const { name, designation, profileSummary, image, userId } = req.body;
    const newDirector = new Director({
      name,
      designation,
      profileSummary,
      image,
      userId,
    });

    const savedDirector = await newDirector.save();

    await createLog(
      "create",
      "Director",
      savedDirector._id,
      userId ,
      { name, designation, profileSummary, image , userId }
    );

    res.status(201).json({
      message: "Board of Directors details submitted successfully!",
      data: savedDirector,
    });
  } catch (error) {
    console.error("Error saving Board of Director:", error);
    res.status(500).json({ error: "Failed to submit data." });
  }
};

const getAllDirectors = async (req, res) => {
  try {
    const directors = await Director.find();
    res.status(200).json({
      message: "Directors fetched successfully!",
      data: directors,
    });
  } catch (error) {
    console.error("Error fetching directors:", error);
    res.status(500).json({ error: "Failed to fetch directors." });
  }
};

const getDirectorById = async (req, res) => {
  try {
    const { id } = req.params;
    const boardOfDirector = await Director.findById(id);

    if (!boardOfDirector) {
      return res.status(404).json({ error: "BoardOfDirector not found" });
    }


    res.json(boardOfDirector);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateDirectorById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; 

    const oldDirector = await Director.findById(id);

    if (!oldDirector) {
      return res.status(404).json({ error: "Director not found" });
    }

    const updatedBoardOfDirector = await Director.findByIdAndUpdate(
      id,
      {
        ...req.body,
        image: req.file ? req.file.path : undefined,
      },
      { new: true }
    );

    if (!updatedBoardOfDirector) {
      return res.status(404).json({ error: "Director update failed" });
    }

    await createLog(
      "update",
      "Director",
      updatedBoardOfDirector._id,
      userId,
      {
        before: oldDirector,
        after: updatedBoardOfDirector,
      }
    );

    res.status(200).json({
      message: "Director updated successfully",
      data: updatedBoardOfDirector,
    });
  } catch (error) {
    console.error("Error updating director:", error);
    res.status(500).json({ error: "Error updating director" });
  }
};


const getAllChangeLogs = async(req,res)=>{
  try {
    const changeLogs = await ChangeLog.find();

    const enrichedLogs = await Promise.all(
      changeLogs.map(async (log) => {
        if (log.performedBy && log.performedBy !== "system") {
          const user = await User.findById(log.performedBy);
          return {
            ...log.toObject(),
            performedByName: user ? user.name : "Unknown User",
          };
        }
        return { ...log.toObject(), performedByName: "System" };
      })
    );

    res.status(200).json({
      message: "Change logs fetched successfully!",
      data: enrichedLogs,
    });
  } catch (error) {
    console.error("Error fetching change logs:", error);
    res.status(500).json({ error: "Failed to fetch change logs." });
  }
}

const deleteboardofDirector = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId }= req.body;

    const deletedUser = await Director.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Director not found" });
    }

    await createLog(
      "delete",
      "Director",
      deletedUser._id,
      userId,
      { deleted: deletedUser }
    );

    res.status(200).json({
      message: "Director deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting director:", error);
    res.status(500).json({ message: "Error deleting director" });
  }
};


module.exports = {
  createDirector,
  getAllDirectors,
  getDirectorById,
  updateDirectorById,
  getAllChangeLogs,
  deleteboardofDirector,
};
