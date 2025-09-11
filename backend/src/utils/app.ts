import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes";

const app = express();

// Middleware
app.use(express.json());

// CORS fix (allow frontend localhost:5173 misalnya kalau pakai Vite)
app.use(cors({
  origin: "http://localhost:5173", // ganti sesuai port frontend kamu
  credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);

export default app;
