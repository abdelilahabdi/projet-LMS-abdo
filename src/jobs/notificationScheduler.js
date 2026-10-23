import cron from "node-cron";
import { processNotifications } from "../services/notificationJobService.js";

export const startNotificationScheduler = () => {
  // Every day at 09:00, Morocco time
  cron.schedule(
    "0 9 * * *",
    async () => {
      try {
        console.log("Starting scheduled notification job...");

        const result = await processNotifications();

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
