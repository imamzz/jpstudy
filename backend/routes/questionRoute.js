const express = require("express");
const router = express.Router();
const { getSoal } = require("../controllers/questionController");

router.post("/get-soal", getSoal);

module.exports = router;
