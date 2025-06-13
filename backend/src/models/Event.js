const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/  // formato HH:mm
    },
    details: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    trelloID: {
        type: String,
        require: true,
    },
    fav: {
        type: Boolean,
        default: false
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;