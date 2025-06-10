const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    time: {
        type: String,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/  // formato HH:mm
    },
    status: {
        type: String,
        require: false,
        default: 'Pending',
    },
    trelloID: {
        type: String,
        require: false,
    },
    images: {
        type: [String],
        default: [],
    },
    fav: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;