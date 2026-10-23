import express from "express";
import { authenticate, authorize } from "../middlewares/Auth.js";
import { runNotificationJob } from "../controllers/notificationJobController.js";

const router = express.Router();

router.post(
  "/notifications/run",
  authenticate,
  authorize("admin"),
  runNotificationJob,
);

export default router;
