const express = require('express');
const router = express.Router();
const { uploadShareHoldingDocument, getShareHoldingDocuments} = require('../controller/shareHoldingController');

router.post('/upload-shareHoldingDocument', uploadShareHoldingDocument);
router.get('/shareHoldingDocument', getShareHoldingDocuments);

module.exports = router;