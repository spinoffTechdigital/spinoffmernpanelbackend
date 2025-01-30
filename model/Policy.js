const mongoose = require("mongoose");

const policySchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  file: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});
const policy = mongoose.model("policy", policySchema);

module.exports = policy;
