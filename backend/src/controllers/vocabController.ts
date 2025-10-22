import { Request, Response, NextFunction } from "express";
import * as vocabService from "../services/vocabService";
import { successResponse, errorResponse } from "../utils/response";
import { AuthRequest } from "../middleware/authMiddleware";

/**
 * Create new vocab
 */
export async function createVocab(req: Request, res: Response, next: NextFunction) {
  try {
    const { kana, kanji, romaji, meaning, level } = req.body;

    if (!kana || !meaning) {
      return errorResponse(res, "VALIDATION_ERROR", "Field kana dan meaning wajib diisi", {
        required: ["kana", "meaning"],
      });
    }

    const vocab = await vocabService.createVocab({ kana, kanji, romaji, meaning, level });
    return successResponse(res, vocab, null, "Vocab berhasil dibuat", 201);
  } catch (error: any) {
    return errorResponse(res, "CREATE_FAILED", error.message, error, 400);
  }
}

/**
 * Update vocab by ID
 */
export async function updateVocab(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const vocab = await vocabService.updateVocab(id, req.body);

    return successResponse(res, vocab, null, "Vocab berhasil diperbarui");
  } catch (error: any) {
    return errorResponse(res, "UPDATE_FAILED", error.message, error, 400);
  }
}

/**
 * Get all vocab (with pagination & filters)
 */
export async function getAllVocab(req: Request, res: Response, next: NextFunction) {
  try {
    const { search, level, page = "1", pageSize = "10" } = req.query;

    const result = await vocabService.getAllVocab(
      req,
      search as string,
      level as string,
      parseInt(page as string, 10),
      parseInt(pageSize as string, 10)
    );

    return successResponse(res, result.data, result.meta, "Vocab berhasil diambil");
  } catch (error: any) {
    console.error("❌ getAllVocab error:", error);
    return errorResponse(res, "VOCAB_FETCH_ERROR", error.message || "Gagal mengambil vocab", error, 400);
  }
}

/**
 * Get vocab by ID
 */
export async function getVocabById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const vocab = await vocabService.getVocabById(id);

    if (!vocab) {
      return errorResponse(res, "NOT_FOUND", "Vocab tidak ditemukan", { id }, 404);
    }

    return successResponse(res, vocab, null, "Vocab berhasil diambil");
  } catch (error: any) {
    return errorResponse(res, "FETCH_FAILED", error.message, error, 400);
  }
}

/**
 * Get vocab list by JLPT level
 */
export async function getVocabByLevel(req: Request, res: Response, next: NextFunction) {
  try {
    const { level } = req.params;
    const vocab = await vocabService.getVocabByLevel(level);

    return successResponse(res, vocab, null, "Vocab berhasil diambil");
  } catch (error: any) {
    return errorResponse(res, "FETCH_FAILED", error.message, error, 400);
  }
}

/**
 * Delete vocab
 */
export async function deleteVocab(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const deleted = await vocabService.deleteVocab(id);

    return successResponse(res, deleted, null, "Vocab berhasil dihapus");
  } catch (error: any) {
    return errorResponse(res, "DELETE_FAILED", error.message, error, 400);
  }
}

/**
 * Get vocab for learning (based on user progress)
 */
export const getVocabForLearning = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user!.id;
    const limit = Number(req.query.words_per_set) || 5;
    const level = req.query.level as string;

    const words = await vocabService.getVocabForLearning(user_id, limit, level);

    return successResponse(res, words, null, "Vocab untuk belajar berhasil diambil");
  } catch (error: any) {
    console.error("❌ getVocabForLearning error:", error);
    return errorResponse(res, "VOCAB_FETCH_ERROR", error.message || "Gagal mengambil vocab", error, 400);
  }
};
