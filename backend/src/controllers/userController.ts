import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";

export async function profile(req: Request, res: Response) {
  try {
    const user = (req as any).user; // ditambahkan dari authMiddleware

    return res.status(200).json(
      successResponse("Profil user berhasil diambil", user)
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse(error.message));
  }
}
