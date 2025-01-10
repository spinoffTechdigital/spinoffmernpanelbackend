const express = require("express");
const { logClick, getTypeCounts } = require("../controller/logController");

const router = express.Router();

router.post("/logClick", logClick);
router.get("/typeCount", getTypeCounts);

module.exports = router;
