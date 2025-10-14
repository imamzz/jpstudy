import { Router } from "express";
import { 
    createReview, 
    getAllReview, 
    getReviewById,
    updateReview,
    reviewStudy,
    saveBatchReview 
} from "../controllers/reviewController";
import { validateDto } from "../middleware/validateDto";
import { CreateReviewDto } from "../dtos/reviewDto";
import { UpdateReviewDto } from "../dtos/updateReviewDto";
import { authMiddleware, authorize } from "../middleware/authMiddleware";

const router = Router();

router.get("/study", authMiddleware, authorize("user", "admin"), reviewStudy);
router.post("/submit-batch", authMiddleware, authorize("user", "admin"), saveBatchReview);

router.post("/", validateDto(CreateReviewDto), createReview);
router.put("/:id", validateDto(UpdateReviewDto), updateReview);
router.get("/", getAllReview);
router.get("/:id", getReviewById);


export default router;
