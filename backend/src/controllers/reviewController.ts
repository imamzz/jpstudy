import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/reviewService";
import { successResponse, errorResponse } from "../utils/response";
import { AuthRequest } from "../middleware/authMiddleware";

export async function createReview(req: Request, res: Response, next: NextFunction) {
  try {
    const { kanji, kana, romaji, meaning } = req.body;
    const review = await reviewService.createReview({ kanji, kana, romaji, meaning });

    return successResponse(res, review, null, "Review berhasil dibuat", 201);
  } catch (error: any) {
    return errorResponse(res, "CREATE_FAILED", error.message, error, 400);
  }
}

export async function updateReview(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const review = await reviewService.updateReview(id, req.body);

    return successResponse(res, review, null, "Review berhasil diperbarui");
  } catch (error: any) {
    return errorResponse(res, "UPDATE_FAILED", error.message, error, 400);
  }
}

export async function getAllReview(req: Request, res: Response) {
  try {
    const reviews = await reviewService.getAllReview();

    return successResponse(res, reviews, null, "Review berhasil diambil");
  } catch (error: any) {
    return errorResponse(res, "FETCH_FAILED", error.message, error, 400);
  }
}

export async function getReviewById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const review = await reviewService.getReviewById(id);

    if (!review) {
      return errorResponse(res, "NOT_FOUND", "Review tidak ditemukan", { id }, 404);
    }

    return successResponse(res, review, null, "Review berhasil diambil");
  } catch (error: any) {
    return errorResponse(res, "FETCH_FAILED", error.message, error, 400);
  }
}

export async function reviewStudy(req: AuthRequest, res: Response) {
  try {
    const user_id = req.user.id;
    const { type, days } = req.query;
    const parsedDays = parseInt(days as string, 10) || 7;
    console.log("reviewStudy => user_id", req.user.id, req.query, parsedDays);
    const { data, meta } = await reviewService.reviewStudy(
      user_id,
      type as string,
      parsedDays
    );

    return successResponse(res, data, meta, "Review berhasil diambil");
  } catch (error: any) {
    return errorResponse(res, "REVIEW_STUDY_FAILED", error.message, error, 400);
  }
}

export async function saveBatchReview(req: AuthRequest, res: Response) {
  try {
    const user_id = req.user.id;
    const { reviews } = req.body;

    if (!Array.isArray(reviews) || reviews.length === 0) {
      return errorResponse(
        res,
        "VALIDATION_ERROR",
        "Tidak ada data review untuk disimpan.",
        null,
        400
      );
    }

    const result = await reviewService.saveBatchReview(user_id, reviews);

    return successResponse(
      res,
      { count: result.length, items: result },
      null,
      "✅ Review berhasil disimpan"
    );
  } catch (error: any) {
    return errorResponse(res, "SAVE_FAILED", error.message || "Gagal menyimpan review", error, 500);
  }
}
