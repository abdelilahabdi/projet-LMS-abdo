import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true,
  },

  options: {
    type: [String],
    required: true,
    validate: {
      validator: (options) => options.length >= 2,
      message: "A question must have at least two options",
    },
  },

  correct_Answer: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },

    questions: {
      type: [questionSchema],
      required: true,
      validate: {
        validator: (questions) => questions.length > 0,
        message: "A quiz must contain at least one question",
      },
    },

    passing_Score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 70,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    is_Mandatory: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
