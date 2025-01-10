const Committee = require("../model/Committee");

const createCommittee = async (req, res) => {
  try {
    const { name, designation, profileSummary,committeecategory} = req.body;
    const image = req.file ? req.file.filename : null;

    const newCommittee = new Committee({
      name,
      designation,
      profileSummary,
      committeecategory,
      image,
    });

    const savedCommittee = await newCommittee.save();

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
  try {
    const updatedBoardOfCommittee = await Committee.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: req.file ? req.file.path : undefined,
      },
      {
        new: true,
      }
    );

    res.json(updatedBoardOfCommittee);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

const deleteCommitteeById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await Committee.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

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
  createCommittee,
  getAllCommittees,
  getCommitteeById,
  updateCommitteeById,
  deleteCommitteeById,
};
