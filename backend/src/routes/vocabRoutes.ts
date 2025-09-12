import { Router } from "express";
import {
  createVocab,
  getAllVocab,
  getVocabById,
  getVocabByLevel,
  deleteVocab,
  updateVocab,
} from "../controllers/vocabController";
import { validateDto } from "../middleware/validateDto";
import { CreateVocabDto } from "../dtos/vocabDto";
import { authMiddleware, authorize } from "../middleware/authMiddleware";
import { UpdateVocabDto } from "../dtos/updateVocabDto";

const router = Router();

// hanya admin yang boleh create, update, delete
router.post("/", authMiddleware, authorize("admin"), validateDto(CreateVocabDto), createVocab);
router.put("/:id", authMiddleware, authorize("admin"), validateDto(UpdateVocabDto), updateVocab);
router.delete("/:id", authMiddleware, authorize("admin"), deleteVocab);

// public
router.get("/", getAllVocab);
router.get("/level/:level", getVocabByLevel); // taruh sebelum :id
router.get("/:id", getVocabById);

export default router;
