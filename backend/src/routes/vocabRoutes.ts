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

const router = Router();

router.post("/", validateDto(CreateVocabDto), createVocab);
router.put("/:id", validateDto(CreateVocabDto), updateVocab);
router.get("/", getAllVocab);
router.get("/level/:level", getVocabByLevel); // taruh sebelum :id
router.get("/:id", getVocabById);
router.delete("/:id", deleteVocab);

export default router;
