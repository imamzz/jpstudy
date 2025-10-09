import { Router } from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware";
import { validateDto } from "../middleware/validateDto";
import { saveVocabProgress, deleteVocabProgress, saveBulkVocabProgress } from "../controllers/vocabProgressController";
import { CreateVocabProgressDto } from "../dtos/createVocabProgressDto";

const router = Router();

// single save (lama)
router.post("/", authMiddleware, authorize("user"), validateDto(CreateVocabProgressDto), saveVocabProgress);
router.put("/:id", authMiddleware, authorize("user"), validateDto(CreateVocabProgressDto), saveVocabProgress);
router.delete("/:id", authMiddleware, authorize("user"), deleteVocabProgress);

// ✅ bulk save (baru)
router.post("/bulk", authMiddleware, authorize("user"), saveBulkVocabProgress);

export default router;
