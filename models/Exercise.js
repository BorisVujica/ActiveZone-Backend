import mongoose from "mongoose";
const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  muscle: {
    type: String,
    required: true
    },
});

export default mongoose.model("Exercise", exerciseSchema);