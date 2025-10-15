import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";

/**
 * 🧩 Global Error Handler
 * Semua error dari controller atau middleware akan ditangkap di sini.
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("❌ [ERROR HANDLER]:", {
    message: err.message,
    stack: err.stack,
    name: err.name,
    details: err.details || null,
  });

  // Ambil status code dan detail error
  const statusCode = err.status || err.statusCode || 500;

  // Tentukan code error berdasarkan konteks
  const code =
    err.code ||
    (statusCode >= 500
      ? "INTERNAL_SERVER_ERROR"
      : statusCode === 404
      ? "NOT_FOUND"
      : "BAD_REQUEST");

  // Susun response JSON standar
  return errorResponse(
    res,
    code,
    err.message || "Terjadi kesalahan pada server",
    err.details || err.errors || null,
    statusCode
  );
}
