const express = require('express');
const {
    registerUser
}= require("../controller/subscribeController");

const router = express.Router();

router.post('/subscribe',registerUser);

module.exports = router;