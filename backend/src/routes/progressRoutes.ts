import { Router } from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware";
import { validateDto } from "../middleware/validateDto";
import { getProgressSummary } from "../controllers/progressController";

const router = Router();

router.get("/summary", authMiddleware, authorize("user"), getProgressSummary);

export default router;
