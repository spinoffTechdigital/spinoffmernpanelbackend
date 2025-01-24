const Director = require("../model/Director");
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
    const { name, designation, profileSummary, image } = req.body;

    const newDirector = new Director({
      name,
      designation,
      profileSummary,
      image,
    });

    const savedDirector = await newDirector.save();

    await createLog(
      "create",
      "Director",
      savedDirector._id,
      req.user ? req.user.email : "system",
      { name, designation, profileSummary, image }
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
    const updatedBoardOfDirector = await Director.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: req.file ? req.file.path : undefined,
      },
      {
        new: true,
      }
    );

    await createLog(
      "update",
      "Director",
      updatedDirector._id,
      req.user ? req.user.email : "system",
      {
        before: oldDirector,
        after: updatedDirector,
      }
    );

    res.json(updatedDirector);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

const getAllChangeLogs = async(req,res)=>{
  try {
    const changeLogs = await ChangeLog.find();
    res.status(200).json({
      message: "Change logs fetched successfully!",
      data: changeLogs,
    });
  } catch (error) {
    console.error("Error fetching change logs:", error);
    res.status(500).json({ error: "Failed to fetch change logs." });
  }
}

const deleteboardofDirector = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await Director.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await createLog(
      "delete",
      "Director",
      deletedDirector._id,
      req.user ? req.user.email : "system",
      { deleted: deletedDirector }
    );

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
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
