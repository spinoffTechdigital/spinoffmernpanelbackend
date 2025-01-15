const express = require('express');
const router = express.Router();
const { uploadFinancialDocument, getFinancialDocuments } = require('../controller/financialController');

router.post('/upload-financials', uploadFinancialDocument);
router.get('/financials', getFinancialDocuments);

module.exports = router;
