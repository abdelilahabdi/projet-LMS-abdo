import { Router } from "express";
const router = Router();
import { register, login, getMe } from "../controllers/AuthController.js";
import { authenticate } from "../middlewares/Auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);

export default router;
