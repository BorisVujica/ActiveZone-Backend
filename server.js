import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";

import seedExercises from "./seedExercises.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://active-zone-frontend.vercel.app"
        : "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await seedExercises();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();