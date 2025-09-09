const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const {
  getWords,
  createWord,
  updateWord,
  deleteWord,
} = require("../controllers/wordController");

router.get("/", authenticateToken, getWords);
router.post("/", authenticateToken, createWord);
router.put("/:id", authenticateToken, updateWord);
router.delete("/:id", authenticateToken, deleteWord);

module.exports = router;
