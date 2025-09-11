import { Router } from "express";
import { 
    createBookmark, 
    getAllBookmark, 
    getBookmarkById, 
    getBookmarkByLevel, 
    deleteBookmark,
    updateBookmark 
} from "../controllers/bookmarkController";
import { validateDto } from "../middleware/validateDto";
import { CreateBookmarkDto } from "../dtos/bookmarkDto";

const router = Router();

router.post("/", validateDto(CreateBookmarkDto), createBookmark);
router.put("/:id", validateDto(CreateBookmarkDto), updateBookmark);
router.get("/", getAllBookmark);
router.get("/:id", getBookmarkById);
router.get("/level/:level", getBookmarkByLevel);
router.delete("/:id", deleteBookmark);

export default router;