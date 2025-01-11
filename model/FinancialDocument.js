const mongoose = require('mongoose');

const financialDocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const FinancialDocument = mongoose.model('FinancialDocument', financialDocumentSchema);

module.exports = FinancialDocument;
