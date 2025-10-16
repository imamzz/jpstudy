import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import * as reviewService from "../services/UserSettingsReviewService";

export async function getReviewSetting(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const data = await reviewService.getReviewSetting(Number(userId));
    return successResponse(res, data, null, "Pengaturan review berhasil diambil");
  } catch (error: any) {
    console.error("❌ getReviewSetting error:", error);
    return errorResponse(res, "FETCH_FAILED", error.message, error, 500);
  }
}

export async function saveReviewSetting(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const data = await reviewService.saveReviewSetting(Number(userId), req.body);
    return successResponse(res, data, null, "Pengaturan review berhasil disimpan");
  } catch (error: any) {
    console.error("❌ saveReviewSetting error:", error);
    return errorResponse(res, "SAVE_FAILED", error.message, error, 500);
  }
}