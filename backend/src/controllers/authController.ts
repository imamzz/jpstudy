import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { successResponse, errorResponse } from "../utils/response";
import { signToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import User from "../models/User";

/**
 * Register user baru
 */
export async function register(req: Request, res: Response) {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return errorResponse(
        res,
        "VALIDATION_ERROR",
        "Field username, email, dan password wajib diisi",
        { username, email, password },
        400
      );
    }

    const user = await registerUser(username, email, password, role);

    return successResponse(res, { user }, null, "User berhasil didaftarkan", 201);
  } catch (error: any) {
    console.error("❌ Register error:", error);
    return errorResponse(
      res,
      "REGISTER_FAILED",
      error.message || "Gagal mendaftarkan user",
      error,
      400
    );
  }
}

/**
 * Login user
 */
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(
        res,
        "VALIDATION_ERROR",
        "Email dan password wajib diisi",
        { email, password },
        400
      );
    }

    const result = await loginUser(email, password);
    const refreshToken = signRefreshToken({ id: result.user.id });

    // Simpan refresh token di cookie HttpOnly
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    const data = {
      accessToken: result.accessToken,
      user: result.user,
    };

    return successResponse(res, data, null, "Login berhasil");
  } catch (error: any) {
    console.error("❌ Login error:", error);
    return errorResponse(
      res,
      "LOGIN_FAILED",
      error.message || "Email atau password salah",
      error,
      401
    );
  }
}

/**
 * Refresh access token menggunakan refresh token dari cookie
 */
export async function refresh(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return errorResponse(res, "TOKEN_MISSING", "Refresh token tidak ditemukan", null, 401);
    }

    const decoded = verifyRefreshToken<{ id: number }>(refreshToken);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return errorResponse(res, "USER_NOT_FOUND", "User tidak ditemukan", { id: decoded.id }, 404);
    }

    const newAccessToken = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const data = {
      accessToken: newAccessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };

    return successResponse(res, data, null, "Token berhasil diperbarui");
  } catch (error: any) {
    console.error("❌ Refresh token error:", error);
    return errorResponse(res, "TOKEN_INVALID", "Refresh token tidak valid", error, 403);
  }
}

/**
 * Logout user (hapus cookie refresh token)
 */
export async function logout(req: Request, res: Response) {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return successResponse(res, null, null, "Logout berhasil");
  } catch (error: any) {
    console.error("❌ Logout error:", error);
    return errorResponse(res, "LOGOUT_FAILED", error.message || "Gagal logout", error, 400);
  }
}
