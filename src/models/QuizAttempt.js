import mongoose from "mongoose";

const answer_schema = new mongoose.Schema(
  {
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    submitted_answer: {
      type: String,
      required: true,
      trim: true
    }
  }
);

const quiz_attempt_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true
    },
    answers: {
      type: [answer_schema],
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    is_passed: {
      type: Boolean,
      required: true
    }
  },{ timestamps: true }
);

quiz_attempt_schema.index( { user: 1, quiz: 1 } );

export default mongoose.model("QuizAttempt", quiz_attempt_schema);