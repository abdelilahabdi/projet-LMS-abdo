import app from "./app.js";
import { connectDB } from "./config/database.js";
import dotenv from "dotenv";
import { startNotificationScheduler } from "./jobs/notificationScheduler.js";
dotenv.config();
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
      startNotificationScheduler();
    });
  } catch (error) {
    console.error("Failed to start the server", error);
    process.exit(1);
  }
}
startServer();
