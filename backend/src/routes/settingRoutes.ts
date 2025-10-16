// routes/settingRoutes.ts
import { Router } from "express";
import { getVocabSetting, saveVocabSetting } from "../controllers/userSettingVocabController";
import { getGrammarSetting, saveGrammarSetting } from "../controllers/userSettingGrammarController";
import { getKanjiSetting, saveKanjiSetting } from "../controllers/userSettingKanjiController";
import { getReviewSetting, saveReviewSetting } from "../controllers/userSettingReviewController";

const router = Router();

router.get("/vocab/:userId", getVocabSetting);
router.put("/vocab/:userId", saveVocabSetting);

router.get("/grammar/:userId", getGrammarSetting);
router.put("/grammar/:userId", saveGrammarSetting);

router.get("/kanji/:userId", getKanjiSetting);
router.put("/kanji/:userId", saveKanjiSetting);

router.get("/review/:userId", getReviewSetting);
router.put("/review/:userId", saveReviewSetting);

export default router;
