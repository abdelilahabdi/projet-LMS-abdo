import express from "express";
import { create_quiz } from "../controllers/quiz_controller.js";
import { authenticate, authorize } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin", "instructor"),
  create_quiz
);

export default router;