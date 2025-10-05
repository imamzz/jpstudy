import { Router } from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware";
import { validateDto } from "../middleware/validateDto";
import { saveVocabProgress, deleteVocabProgress } from "../controllers/vocabProgressController";
import { CreateVocabProgressDto } from "../dtos/createVocabProgressDto";

const router = Router();

router.post("/", authMiddleware, authorize("user"), validateDto(CreateVocabProgressDto), saveVocabProgress);
router.put("/:id", authMiddleware, authorize("user"), validateDto(CreateVocabProgressDto), saveVocabProgress);
router.delete("/:id", authMiddleware, authorize("user"), deleteVocabProgress);
export default router;
