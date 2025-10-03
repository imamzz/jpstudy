import { Router } from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware";
import { validateDto } from "../middleware/validateDto";
import { createVocabProgress, updateVocabProgress, deleteVocabProgress } from "../controllers/vocabProgressController";
import { CreateVocabProgressDto } from "../dtos/createVocabProgressDto";
import { UpdateVocabProgressDto } from "../dtos/updateVocabProgressDto";

const router = Router();

router.post("/", authMiddleware, authorize("user"), validateDto(CreateVocabProgressDto), createVocabProgress);
router.put("/:id", authMiddleware, authorize("user"), validateDto(UpdateVocabProgressDto), updateVocabProgress);
router.delete("/:id", authMiddleware, authorize("user"), deleteVocabProgress);
export default router;
