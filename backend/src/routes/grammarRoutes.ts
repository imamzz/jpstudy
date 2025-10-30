import { Router } from "express";
import { 
    createGrammar, 
    getAllGrammar, 
    getGrammarById, 
    getGrammarByLevel,
    updateGrammar,
    deleteGrammar,
    getGrammarForLearning 
} from "../controllers/grammarController";
import { validateDto } from "../middleware/validateDto";
import { CreateGrammarDto } from "../dtos/grammarDto";
import { UpdateGrammarDto } from "../dtos/updateGrammarDto";
import { authMiddleware, authorize } from "../middleware/authMiddleware";

const router = Router();

router.get("/study", authMiddleware, authorize("user", "admin"), getGrammarForLearning);

// hanya admin yang boleh create, update, delete
router.post("/", authMiddleware, authorize("admin"), validateDto(CreateGrammarDto), createGrammar);
router.put("/:id", authMiddleware, authorize("admin"), validateDto(UpdateGrammarDto), updateGrammar);
router.delete("/:id", authMiddleware, authorize("admin"), deleteGrammar);

// public
router.get("/", authMiddleware, authorize("user", "admin"), getAllGrammar);
router.get("/:id", authMiddleware, authorize("user", "admin"), getGrammarById);
router.get("/level/:level", authMiddleware, authorize("user", "admin"), getGrammarByLevel);

export default router;
