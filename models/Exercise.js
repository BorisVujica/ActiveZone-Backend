import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  muscle: { type: String, required: true },

  isCustom: { type: Boolean, default: false },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
});

export default mongoose.model("Exercise", exerciseSchema);