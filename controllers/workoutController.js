import Workout from "../models/Workout.js";

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

export const addWorkout = async (req, res) => {
  try {
    const { day, exercise, calories, sets, reps, weight } = req.body;

    
    const best = await Workout.findOne({
      user: req.user.id,
      exercise
    }).sort({
      weight: -1,
      sets: -1,
      reps: -1
    });

    const isPR =
      !best ||
      weight > best.weight ||
      sets > best.sets ||
      reps > best.reps;

    const workout = new Workout({
      user: req.user.id,
      day,
      exercise,
      calories,
      sets,
      reps,
      weight,
      isPR
    });

    await workout.save();
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: "Add failed" });
  }
};


   


export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    await workout.deleteOne();
    res.json({ message: "Workout deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
