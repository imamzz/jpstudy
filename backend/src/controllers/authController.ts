import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { successResponse, errorResponse } from "../utils/response";

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password, role } = req.body;
    const user = await registerUser(username, email, password, role);

    return res
      .status(201)
      .json(successResponse("User berhasil didaftarkan", { user }));
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message));
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    return res.json(successResponse("Login berhasil", result));
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message));
  }
}
