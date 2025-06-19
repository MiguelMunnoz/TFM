const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', authenticate, taskController.getTasksController);
router.get('/filter', authenticate, taskController.filterTasksController);
router.get('/:id', authenticate, taskController.getTaskByIdController);
router.post('/',  authenticate, taskController.createTaskController);
router.delete('/:id', authenticate, taskController.deleteTaskController);
router.put('/', authenticate, taskController.updateTaskController);

module.exports = router;
