const Committee = require("../model/Committee");
const User = require("../model/User")
const CommitteChangeLog = require("../model/committeChangelog");

const CreateChangelog = async(
  action,
  collectionName,
  itemId,
  performedBy,
  changeDetails
) => {
  const committelog = new CommitteChangeLog({
    action,
    collectionName,
    itemId,
    performedBy,
    changeDetails,
  });
  await committelog.save();
}

const createCommittee = async (req, res) => {
  try {
    const { name, designation, profileSummary, committeecategory, image, userId } = req.body; 

    if (!name || !designation || !profileSummary || !committeecategory) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newCommittee = new Committee({
      name,
      designation,
      profileSummary,
      committeecategory,
      image, 
      userId,
    });

    const savedCommittee = await newCommittee.save();

    await CreateChangelog(
      "create",
      "Committee",
      savedCommittee._id,
      userId ,
      { name, designation, profileSummary, image , userId }
    );

    res.status(201).json({
      message: "Board of Committees details submitted successfully!",
      data: savedCommittee,
    });

  } catch (error) {
    console.error("Error saving Board of Committee:", error);
    res.status(500).json({ error: "Failed to submit data." });
  }
};

const getAllCommittees = async (req, res) => {
  try {
    const Committees = await Committee.find();
    res.status(200).json({
      message: "Committees fetched successfully!",
      data: Committees,
    });
  } catch (error) {
    console.error("Error fetching Committees:", error);
    res.status(500).json({ error: "Failed to fetch Committees." });
  }
};


const getCommitteeById = async (req, res) => {
  try {
    const { id } = req.params;
    const boardOfCommittee = await Committee.findById(id);

    if (!boardOfCommittee) {
      return res.status(404).json({ error: "BoardOfCommittee not found" });
    }

    res.json(boardOfCommittee);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const updateCommitteeById = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const oldCommittee = await Committee.findById(id);
  try {
    const imageUrl = req.file ? req.file.secure_url : undefined;

    const updatedBoardOfCommittee = await Committee.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: imageUrl,
      },
      { new: true }
    );

    if (!updatedBoardOfCommittee) {
      return res.status(404).json({ error: "Committee not found" });
    }

    await CreateChangelog(
      "update",
      "Committee",
      updatedBoardOfCommittee._id,
      userId,
      {
        before: oldCommittee,
        after: updatedBoardOfCommittee,
      }
    );

    res.json(updatedBoardOfCommittee);
  } catch (error) {
    console.error("Error updating committee:", error);

    res.status(500).json({ error: "Error updating committee" });
  }
};

const deleteCommitteeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const deletedCommittee = await Committee.findByIdAndDelete(id);

    if (!deletedCommittee) {
      return res.status(404).json({ message: "Committee not found" });
    }

    await CreateChangelog(
      "delete",
      "Committee", 
      deletedCommittee._id,
      userId,
      { deleted: deletedCommittee }
    );

    res.status(200).json({
      message: "Committee deleted successfully",
      committee: deletedCommittee,
    });
  } catch (error) {
    console.error("Error deleting committee:", error);
    res.status(500).json({ message: "Error deleting committee" });
  }
};

const getAllChangeLogs = async(req,res)=>{
  try {
    const changeLogs = await CommitteChangeLog.find();

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


module.exports = {
  createCommittee,
  getAllCommittees,
  getCommitteeById,
  getAllChangeLogs,
  updateCommitteeById,
  deleteCommitteeById,
};
