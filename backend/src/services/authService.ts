import bcrypt from "bcryptjs";
import User from "../models/User";
import { signToken, verifyRefreshToken, signRefreshToken } from "../utils/jwt";

/**
 * Generate access & refresh token
 */
function generateTokens(user: any) {
  const accessToken = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = signRefreshToken({
    id: user.id,
  });

  return { accessToken, refreshToken };
}

export async function registerUser(
  username: string,
  email: string,
  password: string,
  role: "user" | "admin"
) {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hashedPassword, role });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User tidak ditemukan");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Password salah");

  const { accessToken, refreshToken } = generateTokens(user);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
}

/**
 * Refresh access token pakai refresh token
 */
export async function refreshUser(refreshToken: string) {
  const decoded = verifyRefreshToken(refreshToken);

  const user = await User.findByPk(decoded.id);
  if (!user) throw new Error("User tidak ditemukan");

  const { accessToken } = generateTokens(user);

  return { accessToken };
}
