import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({

});


const  Workout = mongoose.model('Workout', workoutSchema);

export default Workout;