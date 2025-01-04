const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, 
    page: { type: String, required: false }, 
    element: { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
