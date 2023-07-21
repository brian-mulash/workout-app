import mongoose from "mongoose";
import Workout from "../models/workout.model.js";
import { StatusCodes } from "http-status-codes"

//create new workout
const createWorkout = async (req, res) => {
    try {
        const {title, reps, loads} = req.body;

        let emptyFields = []
    
        if (!title) {
            emptyFields.push('title')
        }
    
        if (!loads) {
            emptyFields.push('loads')
        }
    
        if (!reps) {
            emptyFields.push('reps')
        }
    
        if (emptyFields.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({error: 'please fill in all the fields', emptyFields})
        }

        const workout = await Workout.create({title, reps, loads});
        res.status(StatusCodes.OK).json(workout)

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
    }
};

//get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1});
        res.status(StatusCodes.OK).json(workouts)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message});
    }
}

//get a single workout
const getWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.NOT_FOUND).json({error: 'no such id'})
        }
        const workout = await Workout.findById(id)

        if (!workout) {
            return res.status(StatusCodes.NOT_FOUND).json({error: 'not found'});
        }

        res.status(StatusCodes.OK).json(workout)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message});
    }
}

//delete workout
const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.NOT_FOUND).json({error: 'no such id'})
        }

        const workout = await Workout.findOneAndDelete({ _id: id });

        if (!workout) {
            return res.status(StatusCodes.NOT_FOUND).json({error: 'not found'});
        }

        res.status(StatusCodes.OK).json(workout)

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message});
    }
}

//update workouts
const updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.NOT_FOUND).json({error: 'no such id'})
        }

        const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

        if (!workout) {
            return res.status(StatusCodes.NOT_FOUND).json({error: 'not found'});
        }

        res.status(StatusCodes.OK).json(workout)
    } catch (error) {
        
    }
}

export default {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
}
