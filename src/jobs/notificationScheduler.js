import cron from "node-cron";
import { executeNotificationJob } from "../services/notificationJobRunner.js";

export const startNotificationScheduler = () => {
  cron.schedule(
    "0 9 * * *",
    async () => {
      try {
        console.log("Starting scheduled notification job...");

        const result = await executeNotificationJob("scheduled");

        console.log("Notification job completed:", result.processed);
      } catch (error) {
        console.error("Scheduled notification job failed:", error);
      }
    },
    {
      timezone: "Africa/Casablanca",
      noOverlap: true,
    },
  );

  console.log("Notification scheduler started");
};
