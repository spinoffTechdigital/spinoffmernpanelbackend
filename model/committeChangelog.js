const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommitteChangeLogSchema = new Schema({
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
    ref: 'Committee',
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

module.exports = mongoose.model('CommitteChangeLog', CommitteChangeLogSchema);
