import { Request, Response, NextFunction } from "express";
import * as bookmarkService from "../services/bookmarkService";
import { successResponse, errorResponse } from "../utils/response";

export async function createBookmark(req: Request, res: Response, next: NextFunction) {
    try {
        const { kanji, kana, romaji, meaning } = req.body;
        const bookmark = await bookmarkService.createBookmark({kanji, kana, romaji, meaning});
        res.status(201).json(successResponse("Bookmark berhasil dibuat", bookmark));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function updateBookmark(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bookmark = await bookmarkService.updateBookmark(id, req.body);
      res.status(200).json(successResponse("Bookmark berhasil diperbarui", bookmark));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
}

export async function getAllBookmark(req: Request, res: Response, next: NextFunction) {
    try {
        const bookmark = await bookmarkService.getAllBookmark();
        res.status(200).json(successResponse("Bookmark berhasil diambil", bookmark));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function getBookmarkById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const bookmark = await bookmarkService.getBookmarkById(id);
        res.status(200).json(successResponse("Bookmark berhasil diambil", bookmark));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function getBookmarkByLevel(req: Request, res: Response, next: NextFunction) {
    try {
        const { level } = req.params;
        const bookmark = await bookmarkService.getBookmarkByLevel(level);
        res.status(200).json(successResponse("Bookmark berhasil diambil", bookmark));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function deleteBookmark(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const bookmark = await bookmarkService.deleteBookmark(id);
        res.status(200).json(successResponse("Bookmark berhasil dihapus", bookmark));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}
