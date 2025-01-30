const express = require('express');
const router = express.Router();
const { uploadpolicyDocument, getpolicyDocuments,getAllChangeLogs} = require('../controller/policyController');

router.post('/upload-policyDocument', uploadpolicyDocument);
router.get('/policyDocument', getpolicyDocuments);
router.get('/changelogs',getAllChangeLogs);

module.exports = router;