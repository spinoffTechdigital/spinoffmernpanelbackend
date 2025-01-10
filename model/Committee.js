const mongoose = require("mongoose");

const CommitteeofBordSchema = new mongoose.Schema({
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
  committeecategory: {
    type: String,
    required: true,
  },
  profileSummary: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Committee = mongoose.model("CommitteeofBord", CommitteeofBordSchema);

module.exports = Committee;