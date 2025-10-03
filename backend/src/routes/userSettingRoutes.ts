import { Router } from "express";
import { getUserSetting } from "../controllers/userSettingController";

const router = Router();

router.get("/:userId", getUserSetting);
// router.put("/user-settings", authMiddleware, updateUserSetting);

export default router;