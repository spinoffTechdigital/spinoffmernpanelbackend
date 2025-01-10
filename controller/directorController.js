const Director = require("../model/Director");

const createDirector = async (req, res) => {
  try {
    const { name, designation, profileSummary } = req.body;
    const image = req.file ? req.file.filename : null;

    const newDirector = new Director({
      name,
      designation,
      profileSummary,
      image,
    });

    const savedDirector = await newDirector.save();

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

    res.json(updatedBoardOfDirector);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

const deleteDirectorById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await Director.findByIdAndDelete(id);

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
  createDirector,
  getAllDirectors,
  getDirectorById,
  updateDirectorById,
  deleteDirectorById,
};
