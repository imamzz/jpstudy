import { Router } from "express";
import { 
    register, 
    login 
} from "../controllers/authController";
import { validateDto } from "../middleware/validateDto";
import { RegisterDto } from "../dtos/registerDto";
import { LoginDto } from "../dtos/loginDto";

const router = Router();

router.post("/register", validateDto(RegisterDto), register);
router.post("/login", validateDto(LoginDto), login);

export default router;
