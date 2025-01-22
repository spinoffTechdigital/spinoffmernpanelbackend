const express = require("express");
const {
  submitDealerForm,
  getDealersData,
} = require("../controller/dealersController");

const router = express.Router();

router.post("/dealersubmit", submitDealerForm);
router.get("/getdealerdata", getDealersData);

module.exports = router;