import { Router } from "express";
import { register, login, logout } from "../controllers/authController";
import { refresh } from "../controllers/authController"; // ✅

import { validateDto } from "../middleware/validateDto";
import { RegisterDto } from "../dtos/registerDto";
import { LoginDto } from "../dtos/loginDto";

const router = Router();

router.post("/register", validateDto(RegisterDto), register);
router.post("/login", validateDto(LoginDto), login);
router.post("/logout", logout); 
router.post("/refresh", refresh); 

export default router;
