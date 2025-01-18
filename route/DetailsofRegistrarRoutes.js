const express = require('express');
const router = express.Router();
const { uploadDetailsofRegistrarDocument, getAllDetailsofRegistrar } = require('../controller/DetailsofRegistrarController');

router.post('/uploadDetailsofRegistrarDocument', uploadDetailsofRegistrarDocument);
router.get('/DetailsofRegistrarDocument', getAllDetailsofRegistrar);

module.exports = router;
