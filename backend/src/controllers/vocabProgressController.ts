import { Request, Response, NextFunction } from "express";
import * as vocabProgressService from "../services/vocabProgressService";
import { successResponse, errorResponse } from "../utils/response";
import { AuthRequest } from "../middleware/authMiddleware";

/**
 * Simpan progress vocab per item
 */
export const saveVocabProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user_id = req.user?.id;
    const vocab_id = parseInt(req.params.id || req.body.vocab_id, 10);
    const { status } = req.body;

    if (!user_id || !vocab_id) {
      return errorResponse(
        res,
        "VALIDATION_ERROR",
        "User ID dan Vocab ID wajib diisi",
        { user_id, vocab_id },
        400
      );
    }

    const vocabProgress = await vocabProgressService.saveVocabProgress(
      user_id,
      vocab_id,
      status || "learned"
    );

    return successResponse(res, vocabProgress, null, "Vocab progress berhasil disimpan");
  } catch (error: any) {
    console.error("❌ saveVocabProgress error:", error);
    return errorResponse(
      res,
      "VOCAB_PROGRESS_SAVE_ERROR",
      error.message || "Gagal menyimpan vocab progress",
      error,
      400
    );
  }
};

/**
 * Simpan banyak progress vocab sekaligus
 */
export const saveBulkVocabProgress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user?.id;
    const { items } = req.body; // [{ id, status }, ...]

    if (!user_id || !Array.isArray(items) || items.length === 0) {
      return errorResponse(
        res,
        "VALIDATION_ERROR",
        "Data tidak valid. Diperlukan array berisi vocab progress.",
        { items },
        400
      );
    }

    const result = await vocabProgressService.saveBulkVocabProgress(user_id, items);

    return successResponse(res, result, null, "Bulk vocab progress berhasil disimpan");
  } catch (error: any) {
    console.error("❌ saveBulkVocabProgress error:", error);
    return errorResponse(
      res,
      "VOCAB_PROGRESS_BULK_ERROR",
      error.message || "Gagal menyimpan bulk vocab progress",
      error,
      400
    );
  }
};

/**
 * Hapus progress vocab tertentu
 */
export const deleteVocabProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user_id = req.user?.id;
    const vocab_id = parseInt(req.params.id, 10);

    if (!user_id || !vocab_id) {
      return errorResponse(
        res,
        "VALIDATION_ERROR",
        "User ID dan Vocab ID wajib diisi",
        { user_id, vocab_id },
        400
      );
    }

    const deleted = await vocabProgressService.deleteVocabProgress(user_id, vocab_id);

    return successResponse(res, deleted, null, "Vocab progress berhasil dihapus");
  } catch (error: any) {
    console.error("❌ deleteVocabProgress error:", error);
    return errorResponse(
      res,
      "VOCAB_PROGRESS_DELETE_ERROR",
      error.message || "Gagal menghapus vocab progress",
      error,
      400
    );
  }
};
