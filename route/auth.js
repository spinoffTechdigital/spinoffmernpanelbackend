const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Log = require("../model/Log");
const Director = require("../model/Director");
const Contact = require('../model/Contactus');
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const router = express.Router();

router.post("/logClick", async (req, res) => {
  const { element } = req.body;
  try {
    if (!element) {
      return res.status(400).json({ message: "Element is required" });
    }

    const log = new Log({ type: "navigation", element });
    await log.save();
    res.status(200).json({ message: "Navigation logged successfully" });
  } catch (error) {
    console.error("Error logging navigation:", error.message || error);
    res.status(500).json({ message: "Error logging navigation" });
  }
});

router.get("/typeCount", async (req, res) => {
  try {
    const typeCounts = await Log.aggregate([
      {
        $group: {
          _id: "$element",
          count: { $sum: 1 },
        },
      },
    ]);

    const response = typeCounts.map((entry) => ({
      element: entry._id,
      count: entry.count,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching type counts:", error);
    res.status(500).json({ message: "Error fetching type counts" });
  }
});

router.post("/register", upload.single("profileImage"), async (req, res) => {
  const { name, email, password, mobile, designation, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const profileImage = req.file ? req.file.path : null;

    const user = new User({
      name,
      email,
      password,
      mobile,
      profileImage,
      designation,
      role,
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token, role: user.role });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log("Error in fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

router.post('/contactsubmit',async (req,res)=>{
  try {
    const { name, mobile, email, message } = req.body;

    const newContact = new Contact({ name, mobile, email, message });
    await newContact.save();

    res.status(201).json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting the form', error });
  }
});

router.get('/getcontactdata',async (req,res)=>{
  try {
    const contactdata= await Contact.find();
    res.json(contactdata);
  } catch (error) {
    console.log("Error in fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

router.post("/board-of-directors", upload.single("image"), async (req, res) => {
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
});

router.get("/board-of-directors", async (req, res) => {
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
});

router.get("/boardofDirector/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const  BoardOfDirector = await  Director.findById(id);

    if (!BoardOfDirector) {
      return res.status(404).json({ error: "BoardOfDirector not found" });
    }

    res.json(BoardOfDirector);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/updateboardofDirector/:id", upload.single('image'), async (req, res) => {
  try {
    const updatedBoardOfDirector = await Director.findByIdAndUpdate(req.params.id, {
      ...req.body, 
      image: req.file ? req.file.path : undefined
    }, {
      new: true,
    });
    res.json(updatedBoardOfDirector);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

router.delete("/deleteboardofDirector/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await Director.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;
