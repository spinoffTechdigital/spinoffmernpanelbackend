const express = require('express');
const router = express.Router();
const { uploadInvestorGrievanceDocument, getAllInvestorGrievance,getAllChangeLogs } = require('../controller/InvestorGrievanceController');

router.post('/uploadInvestorGrievanceDocument', uploadInvestorGrievanceDocument);
router.get('/InvestorGrievanceDocument', getAllInvestorGrievance);
router.get('/changelogs',getAllChangeLogs);

module.exports = router;
