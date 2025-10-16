import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import * as vocabService from "../services/UserSettingsVocabService";

export async function getVocabSetting(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const data = await vocabService.getVocabSetting(Number(userId));
    return successResponse(res, data, null, "Pengaturan vocab berhasil diambil");
  } catch (error: any) {
    console.error("❌ getVocabSetting error:", error);
    return errorResponse(res, "FETCH_FAILED", error.message, error, 500);
  }
}

export async function saveVocabSetting(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const data = await vocabService.saveVocabSetting(Number(userId), req.body);
    return successResponse(res, data, null, "Pengaturan vocab berhasil disimpan");
  } catch (error: any) {
    console.error("❌ saveVocabSetting error:", error);
    return errorResponse(res, "SAVE_FAILED", error.message, error, 500);
  }
}
