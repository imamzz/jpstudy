import { Request, Response, NextFunction } from "express";
import * as vocabProgressService from "../services/vocabProgressService";
import { successResponse, errorResponse } from "../utils/newResponse";
import { AuthRequest } from "../middleware/authMiddleware";

export const createVocabProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user_id = req.user.id; // dari token, bukan dari body
    const { vocab_id, status } = req.body;

    const vocabProgress = await vocabProgressService.createVocabProgress(user_id, vocab_id, status);
    res.status(201).json(successResponse("Vocab progress created successfully", vocabProgress));
  } catch (error) {
    next(error);
  }
};

export const updateVocabProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user?.id; 
      const vocab_id = parseInt(req.params.id, 10);
      const { status } = req.body;
  
      const vocabProgress = await vocabProgressService.updateVocabProgress(user_id!, vocab_id, status);
      res.status(200).json(successResponse("Vocab progress updated successfully", vocabProgress));
    } catch (error) {
      next(error);
    }
};
  
export const deleteVocabProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user?.id;
        const vocab_id = parseInt(req.params.id, 10);
        const vocabProgress = await vocabProgressService.deleteVocabProgress(user_id!, vocab_id);
        res.status(200).json(successResponse("Vocab progress deleted successfully", vocabProgress));
    } catch (error) {
        next(error);
    }
};
