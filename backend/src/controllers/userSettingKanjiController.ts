import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import * as kanjiService from "../services/UserSettingsKanjiService";

export async function getKanjiSetting(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const data = await kanjiService.getKanjiSetting(Number(userId));
        return successResponse(res, data, null, "Pengaturan kanji berhasil diambil");
    } catch (error: any) {
        console.error("❌ getKanjiSetting error:", error);
        return errorResponse(res, "FETCH_FAILED", error.message, error, 500);
    }
}

export async function saveKanjiSetting(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const data = await kanjiService.saveKanjiSetting(Number(userId), req.body);
        return successResponse(res, data, null, "Pengaturan kanji berhasil disimpan");
    } catch (error: any) {
        console.error("❌ saveKanjiSetting error:", error);
        return errorResponse(res, "SAVE_FAILED", error.message, error, 500);
    }
}       