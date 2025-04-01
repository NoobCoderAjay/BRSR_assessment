import express, { Application } from "express";
import cors from "cors";
import config from "./config";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

export { app, startServer };
