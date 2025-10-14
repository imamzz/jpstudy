import { Response } from "express";

export interface ApiResponse<T = any> {
  data?: T;
  meta?: any;
  message?: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export function successResponse<T>(
  res: Response,
  data?: T,
  meta?: any,
  message?: string,
  statusCode: number = 200
) {
  const response: ApiResponse<T> = { data, meta, message };
  return res.status(statusCode).json(response);
}

export function errorResponse(
  res: Response,
  code: string,
  message: string,
  details?: any,
  statusCode: number = 400
) {
  const error: ApiError = {
    error: {
      code,
      message,
      details,
    },
  };
  return res.status(statusCode).json(error);
}
