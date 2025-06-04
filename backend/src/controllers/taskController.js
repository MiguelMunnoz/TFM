const { getTasks, getTaskById, createTask, deleteTask, updateTask, filterTasks } = require('../services/taskServices');
const { createTaskValidations } = require('../validations/taskValidations');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');

const taskController = {
    getTasksController: [
        
        async (req, res) => {
            try {
                console.log('Recogiendo todas las tasks...')
                const data = await getTasks();
                console.log('Tasks: ', data);
                res.status(200).json(data);
            } catch (error) {
                console.log('[ERROR] Error getting task info: ', error);
                res.status(500).json({ error: '[ERROR] Error getting task info.' });
            }
        }
    ],

    getTaskByIdController: [

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

        async (req, res) => {
            try {
                const taskData = req.body;
                const response = await createTask(taskData);
                res.status(201).json(response);
            } catch (error) {
                console.log('[ERROR] Error creating task: ', error);
                res.status(500).json({ error: '[ERROR] Error creating task.' });
            }
        }
    ],

    updateTaskController: [

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
                console.log('Recibe llamada para eliminar...');
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
        async (req, res) => {
            try {
                
                const { status } = req.query;
                let filter = {};

                //Añadimos el filtro de status
                if(status) {
                    if(status.toLowerCase() === 'all') {
                        filter = {};
                    } else {
                        filter.status = status.toLowerCase();
                    }
                }

                //A los usuarios sin permisos les impedimos ver otras tareas que no sean las suyas
                /*const cookie = getCookieInfo(req);
                const role = cookie.role;
                if (role !== 'admin') {
                    filter.userID = cookie.userId;
                }*/

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
    const decoded = jwt.verify(token, SECRET_KEY);
    
    return decoded;
}

module.exports = taskController;