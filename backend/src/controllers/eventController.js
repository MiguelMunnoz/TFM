const { getEvents, getEventById, createEvent, deleteEvent, updateEvent, filterEvents } = require('../services/eventServices');
const { getEventByIdValidations, createEventValidations, updateEventValidations, deleteEventValidations, filterEventValidations } = require('../validations/eventValidations');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const eventController = {
    getEventsController: [
        async (req, res) => {
            try {
                const data = await getEvents();
                res.status(200).json(data);
            } catch (error) {
                console.log('[ERROR] Error getting event info: ', error);
                res.status(500).json({ error: '[ERROR] Error getting event info.' });
            }
        }
    ],

    getEventByIdController: [
        ...getEventByIdValidations,
        async (req, res) => {
            try {
                const { id } = req.params;
                const data = await getEventById(id);
                res.status(200).json(data);
            } catch (error) {
                console.log('[ERROR] Error getting event by Id: ', error);
                res.status(500).json({ error: '[ERROR] Error getting event by Id.' });
            }
        }
    ],

    createEventController: [
        ...createEventValidations,
        async (req, res) => {
            try {
                const eventData = req.body;
                const response = await createEvent(eventData);
                res.status(201).json(response);
            } catch (error) {
                console.log('[ERROR] Error creating event: ', error);
                res.status(500).json({ error: '[ERROR] Error creating event.' });
            }
        }
    ],

    updateEventController: [
        ...updateEventValidations,
        async (req, res) => {
            try {
                const { id, updatedData } = req.body;
                const response = await updateEvent(id, updatedData);
                res.status(200).json(response);
            } catch (error) {
                console.log('[ERROR] Error updating event info: ', error);
                res.status(500).json({ error: '[ERROR] Error updating event info.' });
            }
        }
    ],

    deleteEventController: [
        ...deleteEventValidations,
        async (req, res) => {
            try {
                const { id } = req.params;
                const data = await deleteEvent(id);
                res.status(203).json(data);
            } catch (error) {
                console.log('[ERROR] Error deleting event info: ', error);
                res.status(500).json({ error: '[ERROR] Error deleting event info.' });
            }
        }
    ],

    filterEventsController: [
        ...filterEventValidations,
        async (req, res) => {
            try {
                const { status, fav } = req.query;
                let filter = {};

                //Añadimos el filtro de status
                if(status) {
                    if(status.toLowerCase() === 'all') {
                        filter = {};
                    } else {
                        filter.status = status.toLowerCase();
                    }
                }

                if(fav === 'true') {
                    filter.fav = fav
                }

                const cookie = getCookieInfo(req);
                filter.userID = cookie.userId;

                const data = await filterEvents(filter);
                res.status(200).json(data);
            } catch (error) {
                console.log('[ERROR] Error filtering events: ', error);
                res.status(500).json({ error: '[ERROR] Error filtering events in BBDD.' });
            }
        }
    ]
};

function getCookieInfo(req) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, config.SECRET_KEY);
    
    return decoded;
}

module.exports = eventController;