const mongoose = require("mongoose");

const boardOfDirectorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  profileSummary: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Director = mongoose.model("BoardOfDirector", boardOfDirectorsSchema);

module.exports = Director;
