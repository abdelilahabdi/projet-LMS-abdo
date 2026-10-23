import NotificationJobLog from "../models/NotificationJobLog.js";
import { processNotifications } from "./notificationJobService.js";

export const executeNotificationJob = async (triggeredBy) => {
  try {
    const result = await processNotifications();

    await NotificationJobLog.create({
      status: "success",
      processed: result.processed,
      triggeredBy: triggeredBy,
    });

    return result;
  } catch (error) {
    await NotificationJobLog.create({
      status: "failed",
      processed: 0,
      triggeredBy: triggeredBy,
      errorMessage: error.message,
    });

    throw error;
  }
};
