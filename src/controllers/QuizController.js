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
      return res.status(404).json(
        { 
          success: false,
          message: "Module not found" 
        }
      );
    }

    if (req.user.role !== "admin" && target_module.course.instructor.toString() !== req.user.id.toString()) {
      return res.status(403).json(
        { 
          success: false,
          message: "Access denied: you are not the owner of this course" 
        }
      );
    }

    const existing_quiz = await Quiz.findOne(
      { 
        module 
      }
    );
    if (existing_quiz) {
      return res.status(400).json(
        { 
          success: false,
          message: "A quiz already exists for this module" 
        }
      );
    }

    const new_quiz = new Quiz(
      {
        title,
        module,
        questions,
        passing_score,
        is_mandatory,
        created_by: req.user.id
      }
    );

    const saved_quiz = await new_quiz.save();

    return res.status(201).json(
      {
        success: true,
        message: "Quiz created successfully",
        data: saved_quiz
      }
    );
  } catch (error) {
    return res.status(500).json(
      { 
        success: false,
        message: error.message 
      }
    );
  }
};

export const get_all_quizzes = async (req, res) => {
  try {
    const filter = {};
    if (req.query.module) {
      filter.module = req.query.module;
    }

    const quizzes = await Quiz.find(filter)
      .populate("module", "title course")
      .populate("created_by", "name email");

    return res.status(200).json(
      {
        success: true,
        count: quizzes.length,
        data: quizzes
      }
    );
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: error.message
      }
    );
  }
};

export const get_quiz_by_id = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id)
      .populate(
        {
          path: "module",
          populate: { path: "course" }
        }
      )
      .populate("created_by", "name email");

    if (!quiz) {
      return res.status(404).json(
        {
          success: false,
          message: "Quiz not found"
        }
      );
    }

    return res.status(200).json(
      {
        success: true,
        data: quiz
      }
    );
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: error.message
      }
    );
  }
};

export const update_quiz = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const quiz = await Quiz.findById(id).populate(
      {
        path: "module",
        populate: { path: "course" }
      }
    );

    if (!quiz) {
      return res.status(404).json(
        {
          success: false,
          message: "Quiz not found"
        }
      );
    }

    if (req.user.role !== "admin" && quiz.module.course.instructor.toString() !== req.user.id.toString()) {
      return res.status(403).json(
        {
          success: false,
          message: "Access denied: modification not allowed"
        }
      );
    }

    Object.keys(updates).forEach(
      (key) => {
        quiz[key] = updates[key];
      }
    );

    const updated_quiz = await quiz.save();

    return res.status(200).json(
      {
        success: true,
        message: "Quiz updated successfully",
        data: updated_quiz
      }
    );
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: error.message
      }
    );
  }
};

export const delete_quiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id).populate(
      {
        path: "module",
        populate: { path: "course" }
      }
    );

    if (!quiz) {
      return res.status(404).json(
        {
          success: false,
          message: "Quiz not found"
        }
      );
    }

    if (req.user.role !== "admin" && quiz.module.course.instructor.toString() !== req.user.id.toString()) {
      return res.status(403).json(
        {
          success: false,
          message: "Access denied: deletion not allowed"
        }
      );
    }

    await quiz.deleteOne();

    return res.status(200).json(
      {
        success: true,
        message: "Quiz deleted successfully"
      }
    );
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: error.message
      }
    );
  }
};

export const toggle_quiz_status = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id).populate(
      {
        path: "module",
        populate: { path: "course" }
      }
    );

    if (!quiz) {
      return res.status(404).json(
        {
          success: false,
          message: "Quiz not found"
        }
      );
    }

    if (req.user.role !== "admin" && quiz.module.course.instructor.toString() !== req.user.id.toString()) {
      return res.status(403).json(
        {
          success: false,
          message: "Access denied"
        }
      );
    }

    quiz.is_active = !quiz.is_active;
    await quiz.save();

    return res.status(200).json(
      {
        success: true,
        message: "Quiz status updated successfully",
        data: quiz
      }
    );
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: error.message
      }
    );
  }
};