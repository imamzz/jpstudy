import { Router } from "express";
import { getWords, createWord, updateWord, deleteWord } from "../controllers/wordController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getWords);
router.post("/", authMiddleware, createWord);
router.put("/:id", authMiddleware, updateWord);
router.delete("/:id", authMiddleware, deleteWord);

export default router;
