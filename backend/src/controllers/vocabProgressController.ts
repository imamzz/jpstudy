import { Request, Response, NextFunction } from "express";
import * as vocabProgressService from "../services/vocabProgressService";
import { successResponse, errorResponse } from "../utils/newResponse";
import { AuthRequest } from "../middleware/authMiddleware";

export const saveVocabProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user_id = req.user?.id;
    const vocab_id = parseInt(req.params.id || req.body.vocab_id, 10);
    const { status } = req.body;

    if (!user_id || !vocab_id) {
      return res
        .status(400)
        .json(errorResponse("User ID dan Vocab ID wajib diisi", "User ID dan Vocab ID wajib diisi"));
    }

    const vocabProgress = await vocabProgressService.saveVocabProgress(
      user_id,
      vocab_id,
      status || "learned"
    );

    res
      .status(200)
      .json(successResponse("Vocab progress saved successfully", vocabProgress));
  } catch (error: any) {
    console.error("❌ Error saving vocab progress:", error);
    res.status(400).json(errorResponse("VOCAB_PROGRESS_SAVE_ERROR", error.message));
  }
};

export const deleteVocabProgress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user?.id;
    const vocab_id = parseInt(req.params.id, 10);

    const vocabProgress = await vocabProgressService.deleteVocabProgress(
      user_id!,
      vocab_id
    );

    res
      .status(200)
      .json(successResponse("Vocab progress deleted successfully", vocabProgress));
  } catch (error) {
    next(error);
  }
};