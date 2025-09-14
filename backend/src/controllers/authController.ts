import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { successResponse, errorResponse } from "../utils/response";
import { signToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import User from "../models/User";

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

    // bikin refresh token
    const refreshToken = signRefreshToken({ id: result.user.id });

    // simpan di cookie HttpOnly
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // balikin hanya accessToken + user
    return res.json(
      successResponse("Login berhasil", {
        accessToken: result.accessToken,
        user: result.user,
      })
    );
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message));
  }
}


export async function refresh(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json(errorResponse("Refresh token tidak ditemukan"));
    }

    const decoded = verifyRefreshToken<{ id: number }>(refreshToken);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json(errorResponse("User tidak ditemukan"));
    }

    const newAccessToken = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return res.json(
      successResponse("Token berhasil diperbarui", {
        token: newAccessToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      })
    );
  } catch (error: any) {
    return res.status(403).json(errorResponse("Refresh token tidak valid"));
  }
}


export async function logout(req: Request, res: Response) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    sameSite: "lax",
  });

  return res.json(successResponse("Logout berhasil"));
}
