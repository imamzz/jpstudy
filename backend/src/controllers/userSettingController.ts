import { NextFunction, Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import * as userSettingService from "../services/userSettingService";

export async function getUserSetting(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;
        const userSetting = await userSettingService.getUserSetting(parseInt(userId));
        return res.json(successResponse("Profile berhasil diambil", { userSetting }));
    } catch (error: any) {
        return res.status(500).json(errorResponse(error.message));
    }
}   

export async function updateUserSetting(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;
        const userSetting = await userSettingService.updateUserSetting(parseInt(userId), req.body);
        return res.json(successResponse("Profile berhasil diambil", { userSetting }));
    } catch (error: any) {
        return res.status(500).json(errorResponse(error.message));
    }
}   
