import { AuthRequest } from "../middleware/authMiddleware";
import { Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../utils/response";
import * as progressService from "../services/progressService";

export const getProgressSummary = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user_id = req.user?.id;
    const level = req.query.level as string;
    const progressSummary = await progressService.getProgressSummary(user_id, level);

    return successResponse(res, progressSummary, null, "Progress summary berhasil diambil");
  } catch (error: any) {
    console.error("❌ getProgressSummary error:", error);
    return errorResponse(
      res,
      "PROGRESS_SUMMARY_GET_ERROR",
      error.message || "Gagal mengambil progress summary",
      error,
      400
    );
  }
};