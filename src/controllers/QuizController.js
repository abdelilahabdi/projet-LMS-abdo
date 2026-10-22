import Quiz from "../models/Quiz.js";
import Module from "../models/Module.js";

export const create_quiz = async (req, res) => {
  try {
    const { 
      title, 
      module, 
      questions, 
      passing_score, 
      is_mandatory 
    } = req.body;

    const target_module = await Module.findById(module).populate("course");
    if (!target_module) {
      return res.status(404).json({ 
        message: "Module not found" 
      });
    }

    if (req.user.role !== "admin" && target_module.course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: "Access denied: you are not the owner of this course" 
      });
    }

    const existing_quiz = await Quiz.findOne({ module });
    if (existing_quiz) {
      return res.status(400).json({ 
        message: "A quiz already exists for this module" 
      });
    }

    const new_quiz = new Quiz({
      title,
      module,
      questions,
      passing_score,
      is_mandatory,
      created_by: req.user._id
    });

    const saved_quiz = await new_quiz.save();

    return res.status(201).json({
      message: "Quiz created successfully",
      data: saved_quiz
    });
  } catch (error) {
    return res.status(500).json({ 
      message: error.message 
    });
  }
};