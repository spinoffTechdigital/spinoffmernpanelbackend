const express = require('express');
const router = express.Router();
const { uploadDetailsofRegistrarDocument, getAllDetailsofRegistrar,getAllChangeLogs } = require('../controller/DetailsofRegistrarController');

router.post('/uploadDetailsofRegistrarDocument', uploadDetailsofRegistrarDocument);
router.get('/DetailsofRegistrarDocument', getAllDetailsofRegistrar);
router.get('/changelogs',getAllChangeLogs);

module.exports = router;
