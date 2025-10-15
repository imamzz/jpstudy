import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { errorResponse } from "../utils/response";

export interface AuthRequest extends Request {
  user?: any;
}

/**
 * 🧩 Middleware untuk memverifikasi JWT token
 * Format header wajib: "Authorization: Bearer <token>"
 */
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization || req.get("authorization");

    if (!authHeader) {
      return errorResponse(
        res,
        "AUTH_HEADER_MISSING",
        "Authorization header tidak ditemukan",
        null,
        401
      );
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return errorResponse(
        res,
        "INVALID_TOKEN_FORMAT",
        "Format token tidak valid, gunakan 'Bearer <token>'",
        { header: authHeader },
        401
      );
    }

    const decoded = verifyToken<any>(token);
    req.user = decoded;

    return next();
  } catch (err: any) {
    console.error("❌ authMiddleware error:", err);
    return errorResponse(
      res,
      "INVALID_OR_EXPIRED_TOKEN",
      "Token tidak valid atau sudah kadaluarsa",
      err.message,
      403
    );
  }
};

/**
 * 🔒 Middleware untuk otorisasi berdasarkan role
 * Contoh penggunaan:
 *   app.get("/admin", authMiddleware, authorize("admin"), handler);
 */
export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return errorResponse(
        res,
        "UNAUTHENTICATED",
        "User tidak terautentikasi",
        null,
        401
      );
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        "FORBIDDEN",
        "Akses ditolak, role tidak sesuai",
        { requiredRoles: roles, userRole: req.user.role },
        403
      );
    }

    next();
  };
