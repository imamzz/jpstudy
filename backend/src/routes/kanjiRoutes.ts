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
import { UpdateKanjiDto } from "../dtos/updateKanjiDto";
import { authMiddleware, authorize } from "../middleware/authMiddleware";

const router = Router();

// hanya admin yang boleh create, update, delete
router.post("/", authMiddleware, authorize("admin"), validateDto(CreateKanjiDto), createKanji);
router.put("/:id", authMiddleware, authorize("admin"), validateDto(UpdateKanjiDto), updateKanji);
router.delete("/:id", authMiddleware, authorize("admin"), deleteKanji);

// public
router.get("/", getAllKanji);
router.get("/:id", getKanjiById);
router.get("/level/:level", getKanjiByLevel);

export default router;
