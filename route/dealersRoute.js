const express = require("express");
const {
  submitDealerForm,
  getAllDealerData,
} = require("../controller/dealersController");

const router = express.Router();

router.post("/dealersubmit", submitDealerForm);
router.get("/getdealerdata", getAllDealerData);

module.exports = router;