import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { successResponse, errorResponse } from "../utils/response";

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const result = await registerUser(username, email, password);

    return res.status(201).json(
      successResponse("User berhasil didaftarkan", result)
    );
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message));
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    return res.status(200).json(
      successResponse("Login berhasil", result)
    );
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message));
  }
}
