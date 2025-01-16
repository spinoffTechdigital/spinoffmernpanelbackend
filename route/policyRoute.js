const express = require('express');
const router = express.Router();
const { uploadpolicyDocument, getpolicyDocuments} = require('../controller/policyController');

router.post('/upload-policyDocument', uploadpolicyDocument);
router.get('/policyDocument', getpolicyDocuments);

module.exports = router;