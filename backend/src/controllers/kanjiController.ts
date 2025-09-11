import { Request, Response, NextFunction } from "express";
import * as kanjiService from "../services/kanjiService";
import { successResponse, errorResponse } from "../utils/response";

export async function createKanji(req: Request, res: Response, next: NextFunction) {
    try {
        const { kanji, kana, romaji, meaning, level, example_words } = req.body;
        const kanjiData = await kanjiService.createKanji({kanji, kana, romaji, meaning, level, example_words});
        res.status(201).json(successResponse("Kanji berhasil dibuat", kanjiData));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function updateKanji(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const kanji = await kanjiService.updateKanji(id, req.body);
      res.status(200).json(successResponse("Kanji berhasil diperbarui", kanji));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
}

export async function getAllKanji(req: Request, res: Response, next: NextFunction) {
    try {
        const kanjiData = await kanjiService.getAllKanji();
        res.status(200).json(successResponse("Kanji berhasil diambil", kanjiData));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function getKanjiById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const kanjiData = await kanjiService.getKanjiById(id);
        res.status(200).json(successResponse("Kanji berhasil diambil", kanjiData));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function getKanjiByLevel(req: Request, res: Response, next: NextFunction) {
    try {
        const { level } = req.params;
        const kanjiData = await kanjiService.getKanjiByLevel(level);
        res.status(200).json(successResponse("Kanji berhasil diambil", kanjiData));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function deleteKanji(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const kanji = await kanjiService.deleteKanji(id);
        res.status(200).json(successResponse("Kanji berhasil dihapus", kanji));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}
