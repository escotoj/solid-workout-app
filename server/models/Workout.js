const { Schema, model } = require('mongoose');

const workoutSchema = new Schema ({
    title: {
        type: String, 
        require: true,
        trim: true,
    },
    details: {
        type: String,
        require: true,
        trim: true,
    },
    date: {
        type: Date,
    },
    workoutAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    notes: {
        type: String,
        require: false,
        trim: true,
    }
    
});

const Workout = model('Workout', workoutSchema);
module.exports = Workout;