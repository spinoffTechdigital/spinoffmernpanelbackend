const mongoose = require("mongoose");
const { Schema } = mongoose;
const shareHoldingChangelogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  collectionName: {
    type: String,
    required: true,
  },
  itemId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'shareHolding',
  },
  performedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  changeDetails: {
    type: Schema.Types.Mixed, 
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ShareholdingChangeLog',shareHoldingChangelogSchema);
