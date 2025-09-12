import { Router } from "express";
import { 
    createGrammar, 
    getAllGrammar, 
    getGrammarById, 
    getGrammarByLevel,
    updateGrammar,
    deleteGrammar 
} from "../controllers/grammarController";
import { validateDto } from "../middleware/validateDto";
import { CreateGrammarDto } from "../dtos/grammarDto";
import { UpdateGrammarDto } from "../dtos/updateGrammarDto";
import { authMiddleware, authorize } from "../middleware/authMiddleware";

const router = Router();

// hanya admin yang boleh create, update, delete
router.post("/", authMiddleware, authorize("admin"), validateDto(CreateGrammarDto), createGrammar);
router.put("/:id", authMiddleware, authorize("admin"), validateDto(UpdateGrammarDto), updateGrammar);
router.delete("/:id", authMiddleware, authorize("admin"), deleteGrammar);

// public
router.get("/", getAllGrammar);
router.get("/:id", getGrammarById);
router.get("/level/:level", getGrammarByLevel);

export default router;
