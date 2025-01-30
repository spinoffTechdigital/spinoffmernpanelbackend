const express = require('express');
const router = express.Router();
const { uploaddrhpDocument, getdrhpDocuments,getAllChangeLogs} = require('../controller/drhpController');

router.post('/upload-drhpDocument', uploaddrhpDocument);
router.get('/drhpDocument', getdrhpDocuments);

router.get('/changelogs',getAllChangeLogs);

module.exports = router;