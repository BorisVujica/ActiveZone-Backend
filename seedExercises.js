import Exercise from "./models/Exercise.js";
import exercises from "./data/exercises.js";

const seedExercises = async () => {

  try {

    await Exercise.deleteMany();

    await Exercise.insertMany(exercises);

    console.log("Exercises seeded");

  } catch (err) {

    console.log(err);

  }

};

export default seedExercises;