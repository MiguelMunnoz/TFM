const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', authenticate, authorizeRole('user', 'admin'), eventController.getEventsController);
router.get('/filter', authenticate, authorizeRole('user', 'admin'),eventController.filterEventsController);
router.get('/:id', authenticate, authorizeRole('admin'),eventController.getEventByIdController);
router.post('/',  authenticate, authorizeRole('admin'),eventController.createEventController);
router.delete('/:id', authenticate, authorizeRole('admin'),eventController.deleteEventController);
router.put('/', authenticate, authorizeRole('admin'), eventController.updateEventController);

module.exports = router;
