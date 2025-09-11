import { Router } from "express";
import { createReview, getAllReview, getReviewById } from "../controllers/reviewController";

const router = Router();

router.post("/", createReview);
router.get("/", getAllReview);
router.get("/:id", getReviewById);

export default router;
