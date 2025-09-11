import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("❌ [ERROR]:", err);

  res.status(err.status || 500).json(
    errorResponse(
      err.message || "Internal Server Error",
      err.errors || null
    )
  );
}
