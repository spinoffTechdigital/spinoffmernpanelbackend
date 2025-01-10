const express = require('express');
const {
    createCommittee,
    getAllCommittees,
    getCommitteeById,
    updateCommitteeById,
    deleteCommitteeById,
  } = require("../controller/committeeController");
  
  const upload = require("../middleware/upload");
  
  const router = express.Router();
  
  router.post("/board-of-Committees", upload.single("image"), createCommittee);
  router.get("/board-of-Committees", getAllCommittees);
  router.get("/boardofCommittee/:id", getCommitteeById);
  router.put("/updateboardofCommittee/:id", upload.single("image"), updateCommitteeById);
  router.delete("/deleteboardofCommittee/:id", deleteCommitteeById);
  
  module.exports = router;