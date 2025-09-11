import { Router } from "express";
import { createKanji, getAllKanji, getKanjiById, getKanjiByLevel, deleteKanji } from "../controllers/kanjiController";

const router = Router();

router.post("/", createKanji);
router.get("/", getAllKanji);
router.get("/:id", getKanjiById);
router.get("/level/:level", getKanjiByLevel);
router.delete("/:id", deleteKanji);

export default router;
