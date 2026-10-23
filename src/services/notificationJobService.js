import NotificationPreference from "../models/NotificationPreference.js";

export const processNotifications = async () => {
  // Find trainers who enabled notifications
  const preferences = await NotificationPreference.find({
    enabled: true,
  }).populate("trainer", "name email accountStatus");

  let processed = 0;

  for (const preference of preferences) {
    const trainer = preference.trainer;

    // Skip deleted or suspended trainers
    if (!trainer || trainer.accountStatus !== "active") {
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
