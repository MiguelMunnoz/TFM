const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', authenticate, authorizeRole('user', 'admin'), taskController.getTasksController);
router.get('/filter', authenticate, authorizeRole('user', 'admin'), taskController.filterTasksController);
router.get('/:id', authenticate, authorizeRole('admin'), taskController.getTaskByIdController);
router.post('/',  authenticate, authorizeRole('admin'), taskController.createTaskController);
router.delete('/:id', authenticate, authorizeRole('admin'), taskController.deleteTaskController);
router.put('/', authenticate, authorizeRole('admin'), taskController.updateTaskController);

module.exports = router;
