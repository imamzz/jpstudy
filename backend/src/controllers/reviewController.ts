import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/reviewService";
import { successResponse, errorResponse } from "../utils/response";

export async function createReview(req: Request, res: Response, next: NextFunction) {
    try {
        const { kanji, kana, romaji, meaning } = req.body;
        const review = await reviewService.createReview({kanji, kana, romaji, meaning});
        res.status(201).json(successResponse("Review berhasil dibuat", review));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function getAllReview(req: Request, res: Response, next: NextFunction) {
    try {
        const reviewData = await reviewService.getAllReview();
        res.status(200).json(successResponse("Review berhasil diambil", reviewData));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}

export async function getReviewById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const reviewData = await reviewService.getReviewById(id);
        res.status(200).json(successResponse("Review berhasil diambil", reviewData));
    } catch (error: any) {
        return res.status(400).json(errorResponse(error.message));
    }
}
