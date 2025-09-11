import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // lebih aman: gunakan get() atau optional chaining
  const authHeader = req.headers?.authorization || req.get("authorization");
  const token = authHeader && (authHeader as string).split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Token tidak ada" });
  }

  try {
    const decoded = verifyToken<any>(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Token tidak valid" });
  }
};
