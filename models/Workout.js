import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  day: String,
  exercise: String,

  calories: Number,
  sets: Number,
  reps: Number,
  weight: Number,

  isPR: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Workout", workoutSchema);
