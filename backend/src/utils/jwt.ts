import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Fungsi buat generate token
export function signToken(
  payload: object,
  expiresIn: string | number = "1h"
): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

// Fungsi buat verifikasi token
export function verifyToken<T extends object = JwtPayload>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
