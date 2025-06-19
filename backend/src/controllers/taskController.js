const { getTasks, getTaskById, createTask, deleteTask, updateTask, filterTasks } = require('../services/taskServices');
const { getTaskByIdValidations, filterTasksValidations, createTaskValidations, updateTaskValidations } = require('../validations/taskValidations');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const taskController = {
    getTasksController: [
        async (req, res) => {
            try {
                const data = await getTasks();
                res.status(200).json(data);
            } catch (error) {
                console.log('[ERROR] Error getting task info: ', error);
                res.status(500).json({ error: '[ERROR] Error getting task info.' });
            }
        }
    ],

    getTaskByIdController: [
        ...getTaskByIdValidations,
        async (req, res) => {
            try {
                const { id } = req.params;
                const data = await getTaskById(id);
                res.status(200).json(data);
            } catch (error) {
                console.log('[ERROR] Error getting task by Id: ', error);
                res.status(500).json({ error: '[ERROR] Error getting task by Id.' });
            }
        }
    ],

    createTaskController: [
        createTaskValidations,
        async (req, res) => {
            try {
                const taskData = req.body;

                // Convertir campo 'date' a objeto Date si existe
                if (taskData.date && typeof taskData.date === 'string') {
                    taskData.date = new Date(taskData.date);
                }

                const response = await createTask(taskData);
                res.status(201).json(response);
            } catch (error) {
                console.log('[ERROR] Error creating task: ', error);
                res.status(500).json({ error: '[ERROR] Error creating task.' });
            }
        }
    ],

    updateTaskController: [
        ...updateTaskValidations,
        async (req, res) => {
            try {
                const { id, updatedData } = req.body;
                const response = await updateTask(id, updatedData);
                res.status(200).json(response);
            } catch (error) {
                console.log('[ERROR] Error updating task info: ', error);
                res.status(500).json({ error: '[ERROR] Error updating task info.' });
            }
        }
    ],

    deleteTaskController: [
        async (req, res) => {
            try {
                const { id } = req.params;
                const data = await deleteTask(id);
                res.status(203).json(data);
            } catch (error) {
                console.log('[ERROR] Error deleting task info: ', error);
                res.status(500).json({ error: '[ERROR] Error deleting task info.' });
            }
        }
    ],

    filterTasksController: [
        ...filterTasksValidations,
        async (req, res) => {
            try {
                const { status, fav } = req.query;
                const cookie = getCookieInfo(req);
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

                filter.userID = cookie.userId;

                const data = await filterTasks(filter);
                res.status(200).json(data);
            } catch (error) {
                console.log('[ERROR] Error filtering tasks: ', error);
                res.status(500).json({ error: '[ERROR] Error filtering tasks in BBDD.' });
            }
        }
    ]
};

function getCookieInfo(req) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, config.SECRET_KEY);
    
    return decoded;
}

module.exports = taskController;