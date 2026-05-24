import express from "express";
import Exercise from "../models/Exercise.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();

    res.json(exercises);

  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;