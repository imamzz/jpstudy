import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes";
import userRoutes from "../routes/userRoutes";
import grammarRoutes from "../routes/grammarRoutes";
import kanjiRoutes from "../routes/kanjiRoutes";
import vocabRoutes from "../routes/vocabRoutes";
import reviewRoutes from "../routes/reviewRoutes";
import bookmarkRoutes from "../routes/bookmarkRoutes";

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS (sesuaikan origin sesuai frontend kamu)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);   // /api/auth/register, /api/auth/login
app.use("/api/users", userRoutes);  // /api/users/me
app.use("/api/grammar", grammarRoutes);  // /api/grammar/create, /api/grammar/all, /api/grammar/:id, /api/grammar/level/:level
app.use("/api/kanji", kanjiRoutes);  // /api/kanji/create, /api/kanji/all, /api/kanji/:id, /api/kanji/level/:level
app.use("/api/vocab", vocabRoutes);  // /api/vocab/create, /api/vocab/all, /api/vocab/:id, /api/vocab/level/:level
app.use("/api/review", reviewRoutes);  // /api/review/create, /api/review/all, /api/review/:id, /api/review/level/:level
app.use("/api/bookmark", bookmarkRoutes);  // /api/bookmark/create, /api/bookmark/all, /api/bookmark/:id, /api/bookmark/level/:level

// ✅ Health check (opsional, best practice untuk monitoring)
app.get("/health", (_, res) => {
  res.json({ status: "ok", message: "API is running 🚀" });
});

export default app;
