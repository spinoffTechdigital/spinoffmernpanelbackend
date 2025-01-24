const express = require("express");
const {
  createDirector,
  getAllDirectors,
  getDirectorById,
  updateDirectorById,
  getAllChangeLogs,
  deleteboardofDirector,
} = require("../controller/directorController");

const upload = require("../middleware/upload");

const router = express.Router();

router.post("/board-of-directors", upload.single("image"), createDirector);
router.get("/board-of-directors", getAllDirectors);
router.get("/boardofDirector/:id", getDirectorById);
router.put("/updateboardofDirector/:id", upload.single("image"), updateDirectorById);
router.get("/changelogs",getAllChangeLogs);
router.delete("/deleteboardofDirector/:id", deleteboardofDirector);

module.exports = router;
