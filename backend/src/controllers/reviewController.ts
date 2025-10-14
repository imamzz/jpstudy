import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/reviewService";
import { successResponse, errorResponse } from "../utils/response";
import { AuthRequest } from "../middleware/authMiddleware";

export async function createReview(req: Request, res: Response, next: NextFunction) {
  try {
    const { kanji, kana, romaji, meaning } = req.body;
    const review = await reviewService.createReview({ kanji, kana, romaji, meaning });
    res.status(201).json(successResponse("Review berhasil dibuat", review));
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message));
  }
}

export async function updateReview(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const review = await reviewService.updateReview(id, req.body);
    res.status(200).json(successResponse("Review berhasil diperbarui", review));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
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

export async function reviewStudy(req: AuthRequest, res: Response) {
  try {
    const user_id = req.user.id;
    const { type } = req.query;
    const limit = parseInt(req.query.limit as string, 10) || 20;

    const reviews = await reviewService.reviewStudy(
      user_id,
      type as string,
      limit
    );

    return res.status(200).json(successResponse("Review berhasil diambil", reviews));
  } catch (error: any) {
    console.error("❌ reviewStudy error:", error);
    return res.status(400).json(errorResponse(error.message));
  }
}

export async function saveBatchReview(req: AuthRequest, res: Response) {
  try {
    const user_id = req.user.id;
    const { reviews } = req.body; // pastikan body-nya berbentuk { reviews: [...] }

    // 🧩 Validasi sederhana
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return res.status(400).json(errorResponse("Tidak ada data review untuk disimpan."));
    }

    const result = await reviewService.saveBatchReview(user_id, reviews);

    return res.status(200).json(
      successResponse("✅ Review berhasil disimpan", {
        count: result.length,
        items: result,
      })
    );
  } catch (error: any) {
    console.error("❌ saveBatchReview error:", error);
    return res.status(500).json(errorResponse(error.message || "Gagal menyimpan review"));
  }
}