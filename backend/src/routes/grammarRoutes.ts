import { Router } from "express";
import { createGrammar, getAllGrammar, getGrammarById, getGrammarByLevel } from "../controllers/grammarController";

const router = Router();

router.post("/", createGrammar);
router.get("/", getAllGrammar);
router.get("/:id", getGrammarById);
router.get("/level/:level", getGrammarByLevel);

export default router;
