import express from "express";
import { authenticate, authorize } from "../middlewares/Auth.js";
import {
  getCourseLearners,
  getTrainerCourses,
} from "../controllers/trainerController.js";
import { ownCourse } from "../middlewares/ownCourse.js";
import {
  getMyPreferences,
  updateMyPreferences,
} from "../controllers/notificationPreferenceController.js";

const router = express.Router();

router.get(
  "/Courses",
  authenticate,
  authorize("admin", "trainer"),
  getTrainerCourses,
);
router.get(
  "/courses/:courseId/learners",
  authenticate,
  authorize("admin", "trainer"),
  ownCourse,
  getCourseLearners,
);

router.get(
  "/preferences",
  authenticate,
  authorize("trainer"),
  getMyPreferences,
);

router.put(
  "/preferences",
  authenticate,
  authorize("trainer"),
  updateMyPreferences,
);

export default router;
