const express = require('express');
const router = express.Router();
const { uploadrhpDocument, getrhpDocuments ,getAllChangeLogs } = require('../controller/rhpController');

router.post('/upload-rhpDocument', uploadrhpDocument);
router.get('/rhpDocument', getrhpDocuments);

router.get('/changelogs',getAllChangeLogs);

module.exports = router;