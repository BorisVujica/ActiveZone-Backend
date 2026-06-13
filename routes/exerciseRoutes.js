import express from "express";
import Exercise from "../models/Exercise.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", auth, async (req, res) => {
  try {
    const exercises = await Exercise.find({
      $or: [
        { isCustom: false },
        { user: req.user.id }
      ]
    });

    res.json(exercises);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/", auth, async (req, res) => {
  try {
    const { name, category } = req.body;

    const exercise = new Exercise({
      name,
      category,
      muscle: category,
      isCustom: true,
      user: req.user.id
    });

    await exercise.save();
    res.json(exercise);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete("/:id", auth, async (req, res) => {
  try {
    const ex = await Exercise.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!ex) {
      return res.status(404).json({ message: "Not found" });
    }

    await ex.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;