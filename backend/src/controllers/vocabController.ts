import { Request, Response, NextFunction } from "express";
import * as vocabService from "../services/vocabService";
import { successResponse, errorResponse } from "../utils/response";

export async function createVocab(req: Request, res: Response, next: NextFunction) {
    try {
        const { word, kanji, romaji, meaning, level } = req.body;
        const vocab = await vocabService.createVocab({word, kanji, romaji, meaning, level});
        res.status(201).json(successResponse("Vocab berhasil dibuat", vocab));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function updateVocab(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const vocab = await vocabService.updateVocab(id, req.body);
      res.status(200).json(successResponse("Vocab berhasil diperbarui", vocab));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  }

export async function getAllVocab(req: Request, res: Response, next: NextFunction) {
    try {
        const vocab = await vocabService.getAllVocab();
        res.status(200).json(successResponse("Vocab berhasil diambil", vocab));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function getVocabById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const vocab = await vocabService.getVocabById(id);
        res.status(200).json(successResponse("Vocab berhasil diambil", vocab));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function getVocabByLevel(req: Request, res: Response, next: NextFunction) {
    try {
        const { level } = req.params;
        const vocab = await vocabService.getVocabByLevel(level);
        res.status(200).json(successResponse("Vocab berhasil diambil", vocab));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function deleteVocab(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const vocab = await vocabService.deleteVocab(id);
        res.status(200).json(successResponse("Vocab berhasil dihapus", vocab));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}
