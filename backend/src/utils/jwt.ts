import jwt, { JwtPayload, SignOptions, Secret } from "jsonwebtoken";

// gunakan secret berbeda biar lebih aman
const ACCESS_TOKEN_SECRET: Secret = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const REFRESH_TOKEN_SECRET: Secret = process.env.REFRESH_TOKEN_SECRET || "refresh-secret";

// ============================================================
// Generate Access Token (umur pendek, misal 15 menit)
// ============================================================

const JWT_SECRET: Secret = process.env.JWT_SECRET || "supersecret";
const REFRESH_SECRET: Secret = process.env.REFRESH_SECRET || "refreshsupersecret";

// Access token (umur pendek, misalnya 15 menit)
export function signToken(
  payload: object,
  expiresIn: string | number = "2h"
): string {
  const options: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload, JWT_SECRET, options);
}

// Refresh token (umur panjang, misalnya 7 hari)
export function signRefreshToken(
  payload: object,
  expiresIn: string | number = "7d"
): string {
  const options: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload, REFRESH_SECRET, options);
}

// Verify access token
export function verifyToken<T extends object = JwtPayload>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}

// Verify refresh token
export function verifyRefreshToken<T extends object = JwtPayload>(token: string): T {
  return jwt.verify(token, REFRESH_SECRET) as T;
}