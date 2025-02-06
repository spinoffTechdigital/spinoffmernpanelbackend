const express = require("express");
const {
  logClick,
  getTypeCounts,
  getAllLogs,
  getVisitCounts,
  getRecentLogs,
  getHighestVisitedPage,
} = require("../controller/logController");

const router = express.Router();

router.post("/logClick", logClick);
router.get("/typeCount", getTypeCounts);
router.get("/allLogs", getAllLogs);
router.get("/highestVisitedPage",getHighestVisitedPage);
router.get("/visitCounts", getVisitCounts);
router.get("/recentLogs",getRecentLogs);

module.exports = router;
