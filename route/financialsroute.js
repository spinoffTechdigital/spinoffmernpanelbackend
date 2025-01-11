const express = require('express');
const router = express.Router();
const { upload, uploadFinancialDocument,getFinancialDocuments } = require('../controller/financialController');

router.post('/upload-financials', upload.single('file'), uploadFinancialDocument);
router.get('/financials', getFinancialDocuments);

module.exports = router;
