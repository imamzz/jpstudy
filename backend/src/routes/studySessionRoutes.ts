import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

import {
  getStudySessionSummary,
  getVocabStudySession,
  getGrammarStudySession,
  getKanjiStudySession,
  createStudySessionController,
} from "../controllers/studySessionController";

const router = Router();

router.get("/summary/:userId", authMiddleware, getStudySessionSummary);
router.get("/vocab/:userId", authMiddleware, getVocabStudySession);
router.get("/grammar/:userId", authMiddleware, getGrammarStudySession);
router.get("/kanji/:userId", authMiddleware, getKanjiStudySession);

router.post("/", authMiddleware, createStudySessionController);

export default router;
