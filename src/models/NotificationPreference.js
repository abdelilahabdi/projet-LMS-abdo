import mongoose from "mongoose";

const notificationPreferenceSchema = new mongoose.Schema(
  {
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    enabled: {
      type: Boolean,
      default: true,
    },

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily",
    },
  },
  { timestamps: true },
);

const NotificationPreference = mongoose.model(
  "NotificationPreference",
  notificationPreferenceSchema,
);

export default NotificationPreference;
