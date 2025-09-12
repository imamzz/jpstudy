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
import { UpdateBookmarkDto } from "../dtos/updateBookmarkDto";

const router = Router();

router.post("/", validateDto(CreateBookmarkDto), createBookmark);
router.put("/:id", validateDto(UpdateBookmarkDto), updateBookmark);
router.delete("/:id", deleteBookmark);

router.get("/", getAllBookmark);
router.get("/:id", getBookmarkById);
router.get("/level/:level", getBookmarkByLevel);

export default router;