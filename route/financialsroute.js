const express = require('express');
const router = express.Router();
const { uploadFinancialDocument, getFinancialDocuments, getAllChangeLogs} = require('../controller/financialController');

router.post('/upload-financials', uploadFinancialDocument);
router.get('/financials', getFinancialDocuments);
router.get("/changelogs",getAllChangeLogs);
module.exports = router;
