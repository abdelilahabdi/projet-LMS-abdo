import { processNotifications } from "../services/notificationJobService.js";

export const runNotificationJob = async (req, res) => {
  try {
    const result = await processNotifications();

    return res.status(200).json({
      message: "Notification job executed successfully",
      processed: result.processed,
    });
  } catch (error) {
    console.error("Notification job error:", error);

    return res.status(500).json({
      message: "Failed to execute notification job",
    });
  }
};
