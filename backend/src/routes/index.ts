import { Router } from "express";
import authRoutes from "./authRoutes";
import wordRoutes from "./wordRoutes";
// nanti tambah questionRoutes kalau sudah siap

const router = Router();

router.use("/auth", authRoutes);
router.use("/words", wordRoutes);

export default router;
