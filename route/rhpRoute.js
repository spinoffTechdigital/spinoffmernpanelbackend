const express = require('express');
const router = express.Router();
const { uploadrhpDocument, getrhpDocuments} = require('../controller/rhpController');

router.post('/upload-rhpDocument', uploadrhpDocument);
router.get('/rhpDocument', getrhpDocuments);

module.exports = router;