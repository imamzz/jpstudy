import { Router } from "express";
import { 
    createReview, 
    getAllReview, 
    getReviewById,
    updateReview 
} from "../controllers/reviewController";
import { validateDto } from "../middleware/validateDto";
import { CreateReviewDto } from "../dtos/reviewDto";
import { UpdateReviewDto } from "../dtos/updateReviewDto";

const router = Router();

router.post("/", validateDto(CreateReviewDto), createReview);
router.put("/:id", validateDto(UpdateReviewDto), updateReview);
router.get("/", getAllReview);
router.get("/:id", getReviewById);

export default router;
