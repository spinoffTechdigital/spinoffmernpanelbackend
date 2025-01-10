const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);

module.exports = router;
