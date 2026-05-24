import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  getWorkouts,
  addWorkout,
  deleteWorkout
} from "../controllers/workoutController.js";

const router = express.Router();

router.get("/", auth, getWorkouts);
router.post("/", auth, addWorkout);
router.delete("/:id", auth, deleteWorkout);

export default router;
