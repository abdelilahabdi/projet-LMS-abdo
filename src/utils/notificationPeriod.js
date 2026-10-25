export const getNotificationPeriod = (frequency, date = new Date()) => {
  // Get the date in Morocco's timezone
  const formatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Africa/Casablanca",
  });

  const parts = formatter.formatToParts(date);

  const year = Number(parts.find((p) => p.type === "year").value);
  const month = Number(parts.find((p) => p.type === "month").value);
  const day = Number(parts.find((p) => p.type === "day").value);

  const dateString = [
    year,
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");

  if (frequency === "daily") {
    return dateString;
  }

  if (frequency === "weekly") {
    // Calculate the Monday of this week
    const utcDate = new Date(Date.UTC(year, month - 1, day));

    const dayOfWeek = utcDate.getUTCDay();
    const daysSinceMonday = (dayOfWeek + 6) % 7;

    utcDate.setUTCDate(utcDate.getUTCDate() - daysSinceMonday);

    return utcDate.toISOString().slice(0, 10);
  }

  throw new Error("Invalid notification frequency");
};
