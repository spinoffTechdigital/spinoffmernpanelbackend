const express = require("express");
const {
  submitContactForm,
  getAllContactData,
} = require("../controller/contactController");

const router = express.Router();

router.post("/contactsubmit", submitContactForm);
router.get("/getcontactdata", getAllContactData);

module.exports = router;
