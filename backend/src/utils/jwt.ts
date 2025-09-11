import jwt, { JwtPayload, SignOptions, Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "supersecret";

// Fungsi buat generate token
export function signToken(
  payload: object,
  expiresIn: string | number = "1h"
): string {
  const options: SignOptions = { expiresIn: expiresIn as any }; // 👉 pakai casting biar aman
  return jwt.sign(payload, JWT_SECRET, options);
}

// Fungsi buat verifikasi token
export function verifyToken<T extends object = JwtPayload>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
