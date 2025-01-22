const multer = require('multer');
const express = require('express');
const { submitDealerForm, getDealersData } = require('../controller/dealersController');

const router = express.Router();

// Configure multer
const upload = multer();

// Middleware to parse multipart form data
router.post('/dealersubmit', upload.none(), submitDealerForm);
router.get('/getdealerdata', getDealersData);

module.exports = router;
