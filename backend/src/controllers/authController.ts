import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { successResponse, errorResponse } from "../utils/response";

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const result = await registerUser(username, email, password);
    res.status(201).json(successResponse("User berhasil didaftarkan", result));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(successResponse("Login berhasil", result));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
}

export async function profile(req: Request, res: Response) {
  try {
    // `authMiddleware` nanti akan menambahkan `req.user`
    const user = (req as any).user;
    res.json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
