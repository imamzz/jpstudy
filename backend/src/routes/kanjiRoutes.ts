import { Router } from "express";
import { 
    createKanji, 
    getAllKanji, 
    getKanjiById, 
    getKanjiByLevel, 
    deleteKanji,
    updateKanji 
} from "../controllers/kanjiController";
import { validateDto } from "../middleware/validateDto";
import { CreateKanjiDto } from "../dtos/kanjiDto";

const router = Router();

router.post("/", validateDto(CreateKanjiDto), createKanji);
router.put("/:id", validateDto(CreateKanjiDto), updateKanji);
router.get("/", getAllKanji);
router.get("/:id", getKanjiById);
router.get("/level/:level", getKanjiByLevel);
router.delete("/:id", deleteKanji);

export default router;
