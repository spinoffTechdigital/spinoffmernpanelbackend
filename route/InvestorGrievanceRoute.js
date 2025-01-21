const express = require('express');
const router = express.Router();
const { uploadInvestorGrievanceDocument, getAllInvestorGrievance } = require('../controller/InvestorGrievanceController');

router.post('/uploadInvestorGrievanceDocument', uploadInvestorGrievanceDocument);
router.get('/InvestorGrievanceDocument', getAllInvestorGrievance);

module.exports = router;
