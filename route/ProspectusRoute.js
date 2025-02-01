const express = require("express");
const router = express.Router();

const { uploadProspectusDocument, getProspectusDocuments,getAllChangeLogs} = require('../controller/ProspectusController');

router.post('/upload-ProspectusDocument', uploadProspectusDocument);
router.get('/ProspectusDocument', getProspectusDocuments);
router.get('/changelogs',getAllChangeLogs);

module.exports = router;