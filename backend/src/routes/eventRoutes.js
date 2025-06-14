const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', authenticate, eventController.getEventsController);
router.get('/filter', authenticate, eventController.filterEventsController);
router.get('/:id', authenticate, eventController.getEventByIdController);
router.post('/',  authenticate, eventController.createEventController);
router.delete('/:id', authenticate, eventController.deleteEventController);
router.put('/', authenticate, eventController.updateEventController);

module.exports = router;
