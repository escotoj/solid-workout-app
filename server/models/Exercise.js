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
    picture: {
        data: Buffer,
        contentType: String,
    }
    
});

const Workout = model('Workout', workoutSchema);
module.exports = Card;