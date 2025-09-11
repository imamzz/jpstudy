import { Router } from "express";
import { 
    createGrammar, 
    getAllGrammar, 
    getGrammarById, 
    getGrammarByLevel 
} from "../controllers/grammarController";
import { validateDto } from "../middleware/validateDto";
import { CreateGrammarDto } from "../dtos/grammarDto";

const router = Router();

router.post("/", validateDto(CreateGrammarDto), createGrammar);
router.get("/", getAllGrammar);
router.get("/:id", getGrammarById);
router.get("/level/:level", getGrammarByLevel);

export default router;
