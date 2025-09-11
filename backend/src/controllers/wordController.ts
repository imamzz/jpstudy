import { Request, Response, NextFunction } from "express";
import * as wordService from "../services/wordService";

export async function getWords(req: Request, res: Response, next: NextFunction) {
  try {
    const words = await wordService.getAllWords();
    res.json({ success: true, data: words });
  } catch (err) {
    next(err);
  }
}

export async function createWord(req: Request, res: Response, next: NextFunction) {
  try {
    const { kanji, kana, romaji, meaning } = req.body;
    const word = await wordService.createWord(kanji, kana, romaji, meaning);
    res.status(201).json({ success: true, data: word });
  } catch (err) {
    next(err);
  }
}

export async function updateWord(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { kanji, kana, romaji, meaning } = req.body;
    const word = await wordService.updateWord(id, kanji, kana, romaji, meaning);
    if (!word) return res.status(404).json({ success: false, message: "Word not found" });
    res.json({ success: true, data: word });
  } catch (err) {
    next(err);
  }
}

export async function deleteWord(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const word = await wordService.deleteWord(id);
    if (!word) return res.status(404).json({ success: false, message: "Word not found" });
    res.json({ success: true, data: word });
  } catch (err) {
    next(err);
  }
}
