const cloudinary = require('cloudinary').v2;
const Committee = require("../model/Committee");


const createCommittee = async (req, res) => {
  try {
    const { name, designation, profileSummary, committeecategory, image } = req.body;

    if (!name || !designation || !profileSummary || !committeecategory) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const imageUrl = image || null;  
    const newCommittee = new Committee({
      name,
      designation,
      profileSummary,
      committeecategory,
      image: imageUrl,
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
    const imageUrl = req.file ? req.file.secure_url : undefined;

    const updatedBoardOfCommittee = await Committee.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: imageUrl, 
      },
      {
        new: true,
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
    const deletedCommittee = await Committee.findByIdAndDelete(id);

    if (!deletedCommittee) {
      return res.status(404).json({ message: "Committee not found" });
    }

    res.status(200).json({
      message: "Committee deleted successfully",
      committee: deletedCommittee,
    });
  } catch (error) {
    console.error("Error deleting committee:", error);
    res.status(500).json({ message: "Error deleting committee" });
  }
};

module.exports = {
  createCommittee,
  getAllCommittees,
  getCommitteeById,
  updateCommitteeById,
  deleteCommitteeById,
};
