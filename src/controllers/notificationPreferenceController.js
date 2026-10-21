import mongoose from "mongoose";
import Course from "../models/course.js";
import NotificationPreference from "../models/NotificationPreference.js";

// GET the logged-in trainer's preferences
export const getMyPreferences = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const preferences = await NotificationPreference.findOne({
      trainer: trainerId,
    });

    if (!preferences) {
      return res.status(200).json({
        enabled: true,
        courses: [],
        frequency: "daily",
      });
    }

    return res.status(200).json(preferences);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
