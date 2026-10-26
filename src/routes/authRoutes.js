import { Router } from "express";
const router = Router();
import { register, login, getMe , forgotPassword , resetPassword , } from "../controllers/AuthController.js";
import { authenticate } from "../middlewares/Auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


export default router;
