const mongoose = require("mongoose");

const BoardOfDirectorchangeLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, 
    collectionName: { type: String, required: true }, 
    itemId: { type: mongoose.Schema.Types.ObjectId, refPath: "boardofdirectors" },
    performedBy: { type: String, required: true }, 
    changeDetails: { type: Object, required: true }, 
  },
  { timestamps: true }
);

const BoardOfDirectorchangeLog = mongoose.model("BodChangeLog", BoardOfDirectorchangeLogSchema);

module.exports = BoardOfDirectorchangeLog;
