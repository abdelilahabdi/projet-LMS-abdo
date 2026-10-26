import mongoose from "mongoose";

const notificationJobLogSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["success", "failed"],
      required: true,
    },

    processed: {
      type: Number,
      default: 0,
    },

    triggeredBy: {
      type: String,
      enum: ["manual", "scheduled"],
      required: true,
    },

    errorMessage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const NotificationJobLog = mongoose.model(
  "NotificationJobLog",
  notificationJobLogSchema,
);

export default NotificationJobLog;
