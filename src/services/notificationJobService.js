import NotificationPreference from "../models/NotificationPreference.js";

export const processNotifications = async () => {
  const preferences = await NotificationPreference.find({
    enabled: true,
  }).populate("trainer", "name email accountStatus");
  const today = new Date();

  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "Africa/Casablanca",
  }).format(today);

  const isMonday = weekday === "Monday";
  let processed = 0;

  for (const preference of preferences) {
    const trainer = preference.trainer;

    // Skip deleted or suspended trainers
    if (!trainer || trainer.accountStatus !== "active") {
      continue;
    }
    if (preference.frequency === "weekly" && !isMonday) {
      continue;
    }

    console.log(`Processing notifications for ${trainer.email}`);

    console.log("Frequency:", preference.frequency);
    console.log("Courses:", preference.courses);

    processed++;
  }

  return {
    processed: processed,
  };
};
