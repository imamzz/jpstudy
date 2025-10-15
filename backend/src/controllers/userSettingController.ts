import { NextFunction, Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import * as userSettingService from "../services/userSettingService";

/**
 * Ambil pengaturan user
 */
export async function getUserSetting(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    if (!userId || isNaN(Number(userId))) {
      return errorResponse(
        res,
        "VALIDATION_ERROR",
        "Parameter userId tidak valid",
        { userId },
        400
      );
    }

    const userSetting = await userSettingService.getUserSetting(parseInt(userId, 10));

    if (!userSetting) {
      return errorResponse(res, "NOT_FOUND", "Pengaturan user tidak ditemukan", { userId }, 404);
    }

    return successResponse(res, userSetting, null, "Profile berhasil diambil");
  } catch (error: any) {
    console.error("❌ getUserSetting error:", error);
    return errorResponse(
      res,
      "FETCH_FAILED",
      error.message || "Gagal mengambil pengaturan user",
      error,
      500
    );
  }
}

/**
 * Update pengaturan user
 */
export async function updateUserSetting(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    if (!userId || isNaN(Number(userId))) {
      return errorResponse(
        res,
        "VALIDATION_ERROR",
        "Parameter userId tidak valid",
        { userId },
        400
      );
    }

    const updatedSetting = await userSettingService.updateUserSetting(parseInt(userId, 10), req.body);

    return successResponse(res, updatedSetting, null, "Profile berhasil diperbarui");
  } catch (error: any) {
    console.error("❌ updateUserSetting error:", error);
    return errorResponse(
      res,
      "UPDATE_FAILED",
      error.message || "Gagal memperbarui pengaturan user",
      error,
      500
    );
  }
}
