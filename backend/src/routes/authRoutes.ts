import { Router } from "express";
import { register, login, profile } from "../controllers/authController";
import { validateDto } from "../middleware/validateDto";
import { RegisterDto } from "../dtos/registerDto";
import { LoginDto } from "../dtos/loginDto";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", validateDto(RegisterDto), register);
router.post("/login", validateDto(LoginDto), login);
router.get("/profile", authMiddleware, profile);

export default router;
