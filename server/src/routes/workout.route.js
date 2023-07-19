import express from 'express';
import workoutController from '../controllers/workout.controller.js';

const Route = express.Router();

// get all workout
Route.get(
    '/',

    workoutController.getWorkouts
)

//get a single workout
Route.get(
    '/:id',

    workoutController.getWorkout
)

//post a new workout
Route.post(
    '/',

    workoutController.createWorkout
)

//delete a new workout
Route.delete(
    '/:id',

    workoutController.deleteWorkout
)

//update a new workout
Route.patch(
    '/:id',

    workoutController.updateWorkout
)

export default Route;
