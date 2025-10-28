import { Router } from "express";
import { getVocabSetting, saveVocabSetting } from "../controllers/userSettingVocabController";
import { getGrammarSetting, saveGrammarSetting } from "../controllers/userSettingGrammarController";
import { getKanjiSetting, saveKanjiSetting } from "../controllers/userSettingKanjiController";
import { getReviewSetting, saveReviewSetting } from "../controllers/userSettingReviewController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/vocab/:userId", authMiddleware, getVocabSetting);
router.put("/vocab/:userId", authMiddleware, saveVocabSetting);

router.get("/grammar/:userId", authMiddleware, getGrammarSetting);
router.put("/grammar/:userId", authMiddleware, saveGrammarSetting);

router.get("/kanji/:userId", authMiddleware, getKanjiSetting);
router.put("/kanji/:userId", authMiddleware, saveKanjiSetting);

router.get("/review/:userId", authMiddleware, getReviewSetting);
router.put("/review/:userId", authMiddleware, saveReviewSetting);

export default router;
