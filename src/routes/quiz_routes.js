import express from "express";
import { 
  create_quiz, 
  get_all_quizzes, 
  get_quiz_by_id, 
  update_quiz, 
  delete_quiz, 
  toggle_quiz_status 
} from "../controllers/QuizController.js";
import { authenticate, authorize } from "../middlewares/Auth.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize("admin", "instructor", "trainer"), create_quiz);
router.get("/", get_all_quizzes);
router.get("/:id", get_quiz_by_id);
router.put("/:id", authorize("admin", "instructor", "trainer"), update_quiz);
router.delete("/:id", authorize("admin", "instructor", "trainer"), delete_quiz);
router.patch("/:id/toggle-status", authorize("admin", "instructor", "trainer"), toggle_quiz_status);

export default router;