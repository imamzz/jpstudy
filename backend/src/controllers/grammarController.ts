import { Request, Response, NextFunction } from "express";
import * as grammarService from "../services/grammarService";
import { successResponse, errorResponse } from "../utils/response";

export async function createGrammar(req: Request, res: Response, next: NextFunction) {
    try {
        const { pattern, meaning, example, level } = req.body;
        const grammar = await grammarService.createGrammar({pattern, meaning, example, level});
        res.status(201).json(successResponse("Grammar berhasil dibuat", grammar));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function updateGrammar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const grammar = await grammarService.updateGrammar(id, req.body);
      res.status(200).json(successResponse("Grammar berhasil diperbarui", grammar));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
}

export async function getAllGrammar(req: Request, res: Response, next: NextFunction) {
    try {
        const grammar = await grammarService.getAllGrammar();
        res.status(200).json(successResponse("Grammar berhasil diambil", grammar));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function getGrammarById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const grammar = await grammarService.getGrammarById(id);
        res.status(200).json(successResponse("Grammar berhasil diambil", grammar));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function getGrammarByLevel(req: Request, res: Response, next: NextFunction) {
    try {
        const { level } = req.params;
        const grammar = await grammarService.getGrammarByLevel(level);
        res.status(200).json(successResponse("Grammar berhasil diambil", grammar));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function deleteGrammar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const grammar = await grammarService.deleteGrammar(id);
      res.status(200).json(successResponse("Grammar berhasil dihapus", grammar));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
}
