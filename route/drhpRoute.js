const express = require('express');
const router = express.Router();
const { uploaddrhpDocument, getdrhpDocuments} = require('../controller/drhpController');

router.post('/upload-drhpDocument', uploaddrhpDocument);
router.get('/drhpDocument', getdrhpDocuments);

module.exports = router;