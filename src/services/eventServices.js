const Event = require('../models/Event');

async function getEvents() {
    try {
        const events = await Event.find({});
        return events;
    } catch (error) {
        console.log('[ERROR] Error getting events:', error);
        throw error;
    }
}

async function getEventById(id) {
    try {
        const event = await Event.findById(id);
        return event;
    } catch (error) {
        console.log('[ERROR] Error service getting event by Id:', error);
        throw error;
    }
}

async function createEvent(eventData) {
    try {
        const event = new Event(eventData);
        const res = await event.save();
        return res;
    } catch (error) {
        console.log('[ERROR] Error creating event:', error);
        throw error;
    }
}

async function updateEvent(id, eventData) {
    try {
        const event = await Event.findByIdAndUpdate(
            id,
            eventData,
            { 
                new: true,
                runValidators: true // Ejecuta las validaciones del esquema
            }
        );

        if (!event) {
            throw new Error('[Error] Event not found.');
        }

        return event;
    } catch (error) {
        console.log('[ERROR] Error updating event:', error);
        throw error;
    }
}

async function deleteEvent(id) {
    try {
        const event = await Event.findByIdAndDelete(id);
        
        if (!event) {
            throw new Error('[Error] Event not found.');
        }

        return event;
    } catch (error) {
        console.log('[ERROR] Error deleting event:', error);
        throw error;
    }
}

async function filterEvents(filter) {
    try {
        const events = await Event.find(filter);
        return events;
    } catch (error) {
        console.log('[ERROR] Error filtering event:', error);
        throw error;
    }
}

module.exports = { 
    getEvents,
    getEventById,
    createEvent,  
    updateEvent, 
    deleteEvent,
    filterEvents,
};