import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { errorResponse } from "../utils/response";

export interface AuthRequest extends Request {
  user?: any;
}

/**
 * Middleware untuk memverifikasi JWT token
 * Format wajib: "Authorization: Bearer <token>"
 */
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || req.get("authorization");
  console.log("👉 Auth header:", authHeader); // DEBUG

  if (!authHeader) {
    return res
      .status(401)
      .json(errorResponse("Authorization header tidak ditemukan"));
  }

  const [scheme, token] = authHeader.split(" ");
  console.log("👉 Extracted token:", token); // DEBUG

  if (scheme !== "Bearer" || !token) {
    return res
      .status(401)
      .json(errorResponse("Format token tidak valid, gunakan Bearer <token>"));
  }

  try {
    const decoded = verifyToken<any>(token);
    console.log("👉 Decoded JWT:", decoded); // DEBUG
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err); // DEBUG
    return res
      .status(403)
      .json(errorResponse("Token tidak valid atau sudah kadaluarsa"));
  }
};


/**
 * Middleware untuk otorisasi berdasarkan role
 * Contoh: authorize("admin") → hanya admin yang bisa akses
 */
export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json(errorResponse("User tidak terautentikasi"));
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json(errorResponse("Akses ditolak, role tidak sesuai"));
    }

    next();
  };

