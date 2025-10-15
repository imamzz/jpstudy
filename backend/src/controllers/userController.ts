import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";


export async function profile(req: Request, res: Response) {
  try {
    const user = (req as any).user; // dari authMiddleware
    return successResponse(res, { user }, null, "Profile berhasil diambil");
  } catch (error: any) {
    return errorResponse(res, "PROFILE_FETCH_FAILED", error.message, error, 400);
  }
}
