import { Router } from "express";
import { 
    createKanji, 
    getAllKanji, 
    getKanjiById, 
    getKanjiByLevel, 
    deleteKanji 
} from "../controllers/kanjiController";
import { validateDto } from "../middleware/validateDto";
import { CreateKanjiDto } from "../dtos/kanjiDto";

const router = Router();

router.post("/", validateDto(CreateKanjiDto), createKanji);
router.get("/", getAllKanji);
router.get("/:id", getKanjiById);
router.get("/level/:level", getKanjiByLevel);
router.delete("/:id", deleteKanji);

export default router;
