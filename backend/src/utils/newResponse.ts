export interface ApiResponse<T = any> {
    data?: T;
    meta?: any;       // untuk pagination/info tambahan
    message?: string; // opsional, bisa dipakai untuk debug / logs
  }
  
  export interface ApiError {
    error: {
      code: string;
      message: string;
      details?: any;
    };
  }
  
  export function successResponse<T>(data?: T, meta?: any, message?: string): ApiResponse<T> {
    return { data, meta, message };
  }
  
  export function errorResponse(code: string, message: string, details?: any): ApiError {
    return { error: { code, message, details } };
  }
  