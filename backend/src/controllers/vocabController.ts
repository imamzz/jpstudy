import { Request, Response, NextFunction } from "express";
import * as vocabService from "../services/vocabService";
import { successResponse, errorResponse } from "../utils/newResponse";

export async function createVocab(req: Request, res: Response, next: NextFunction) {
    try {
        const { kana, kanji, romaji, meaning, level } = req.body;
        const vocab = await vocabService.createVocab({kana, kanji, romaji, meaning, level});
        res.status(201).json(successResponse("Vocab berhasil dibuat", vocab));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message, error.details));
    }
}

export async function updateVocab(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const vocab = await vocabService.updateVocab(id, req.body);
      res.status(200).json(successResponse("Vocab berhasil diperbarui", vocab));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message, error.details));
    }
  }

  export async function getAllVocab(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, level, page = "1", pageSize = "10" } = req.query;
  
      const result = await vocabService.getAllVocab(
        search as string,
        level as string,
        parseInt(page as string, 10),
        parseInt(pageSize as string, 10)
      );
  
      // ✅ gunakan response baru
      return res.status(200).json(successResponse(result.data, result.meta, "Vocab berhasil diambil"));
    } catch (error: any) {
      return res
        .status(400)
        .json(errorResponse("VOCAB_FETCH_ERROR", error.message, error.errors));
    }
  }
  

export async function getVocabById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const vocab = await vocabService.getVocabById(id);
        res.status(200).json(successResponse("Vocab berhasil diambil", vocab));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message, error.details));
    }
}

export async function getVocabByLevel(req: Request, res: Response, next: NextFunction) {
    try {
        const { level } = req.params;
        const vocab = await vocabService.getVocabByLevel(level);
        res.status(200).json(successResponse("Vocab berhasil diambil", vocab));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message, error.details));
    }
}

export async function deleteVocab(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const vocab = await vocabService.deleteVocab(id);
        res.status(200).json(successResponse("Vocab berhasil dihapus", vocab));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message, error.details));
    }
}
