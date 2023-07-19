import express from 'express';
import workoutRoutes from '../routes/workout.route.js'

const Route = express.Router({mergeParams: true})

Route.use('/workouts', workoutRoutes)

export default Route;

