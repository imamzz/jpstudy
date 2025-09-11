import { Router } from "express";
import { createVocab, getAllVocab, getVocabById, getVocabByLevel } from "../controllers/vocabController";

const router = Router();

router.post("/", createVocab);
router.get("/", getAllVocab);
router.get("/:id", getVocabById);
router.get("/level/:level", getVocabByLevel);

export default router;
