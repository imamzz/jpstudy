import { Router } from "express";
import {
  createVocab,
  getAllVocab,
  getVocabById,
  getVocabByLevel,
  deleteVocab,
  updateVocab,
  getVocabForLearning,
} from "../controllers/vocabController";
import { validateDto } from "../middleware/validateDto";
import { CreateVocabDto } from "../dtos/vocabDto";
import { authMiddleware, authorize } from "../middleware/authMiddleware";
import { UpdateVocabDto } from "../dtos/updateVocabDto";

const router = Router();

// hanya admin yang boleh create, update, delete
router.post("/", authMiddleware, authorize("admin", "user"), validateDto(CreateVocabDto), createVocab);
router.put("/:id", authMiddleware, authorize("admin", "user"), validateDto(UpdateVocabDto), updateVocab);
router.delete("/:id", authMiddleware, authorize("admin", "user"), deleteVocab);

// public
// IZINKAN ADMIN & USER
router.get("/", authMiddleware, authorize("user", "admin"), getAllVocab);
router.get("/level/:level", authMiddleware, authorize("user", "admin"), getVocabByLevel);

// 🟢 letakkan di sini — sebelum :id
router.get("/study", authMiddleware, authorize("user", "admin"), getVocabForLearning);

router.get("/:id", authMiddleware, authorize("user", "admin"), getVocabById);

export default router;
