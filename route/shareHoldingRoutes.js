const express = require('express');
const router = express.Router();
const { uploadShareHoldingDocument, getShareHoldingDocuments,getAllChangeLogs} = require('../controller/shareHoldingController');

router.post('/upload-shareHoldingDocument', uploadShareHoldingDocument);
router.get('/shareHoldingDocument', getShareHoldingDocuments);

router.get("/changelogs",getAllChangeLogs);

module.exports = router;