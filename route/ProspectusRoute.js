const express = require("express");
const router = express.Router();

const { uploadProspectusDocument, getProspectusDocuments} = require('../controller/ProspectusController');

router.post('/upload-ProspectusDocument', uploadProspectusDocument);
router.get('/ProspectusDocument', getProspectusDocuments);

module.exports = router;