import { Router } from "express";
import { createBookmark, getAllBookmark, getBookmarkById, getBookmarkByLevel, deleteBookmark } from "../controllers/bookmarkController";

const router = Router();

router.post("/", createBookmark);
router.get("/", getAllBookmark);
router.get("/:id", getBookmarkById);
router.get("/level/:level", getBookmarkByLevel);
router.delete("/:id", deleteBookmark);

export default router;