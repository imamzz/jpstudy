import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import * as grammarService from "../services/UserSettingsGrammarService";

export async function getGrammarSetting(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const data = await grammarService.getGrammarSetting(Number(userId));
        return successResponse(res, data, null, "Pengaturan grammar berhasil diambil");
    } catch (error: any) {
        console.error("❌ getGrammarSetting error:", error);
        return errorResponse(res, "FETCH_FAILED", error.message, error, 500);
    }
}

export async function saveGrammarSetting(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const data = await grammarService.saveGrammarSetting(Number(userId), req.body);
        return successResponse(res, data, null, "Pengaturan grammar berhasil disimpan");
    } catch (error: any) {
        console.error("❌ saveGrammarSetting error:", error);
        return errorResponse(res, "SAVE_FAILED", error.message, error, 500);
    }
}