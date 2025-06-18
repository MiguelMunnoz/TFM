const { getTasks, getTaskById, createTask, deleteTask, updateTask, filterTasks } = require('../services/taskServices');
const { getTaskByIdValidations, filterTasksValidations, createTaskValidations, updateTaskValidations } = require('../validations/taskValidations');
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
                console.log('Entrando en el manejador de tareas -> creando...');
                const taskData = req.body;

                // Convertir campo 'date' a objeto Date si existe
                if (taskData.date && typeof taskData.date === 'string') {
                    taskData.date = new Date(taskData.date);
                }

                console.log('Info que llega: ', taskData);
                console.log('Info de las imagenes: ', taskData.images);
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
                console.log('Body recibido:', req.body);
                const { id, updatedData } = req.body;
                const response = await updateTask(id, updatedData);
                console.log('Respuesta del servidor: ', response);
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
        ...filterTasksValidations,
        async (req, res) => {
            try {
                const { status, fav } = req.query;
                console.log('STATUS: ', status);
                console.log('Favoritos: ', fav);
                const cookie = getCookieInfo(req);
                console.log('UserId: ', cookie.userId);
                let filter = {};

                //Añadimos el filtro de status
                if(status) { 
                    if(status.toLowerCase() === 'all') {
                        filter = {};
                    } else {
                        filter.status = status.toLowerCase();
                    }
                }
                console.log('FILTRO despues de status: ', filter);

                if(fav === 'true') {
                    console.log('Hemos encontrado un fav verdadero');
                    filter.fav = fav
                }
                console.log('FILTRO despues de fav: ', filter);

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
    const decoded = jwt.verify(token, SECRET_KEY);
    
    return decoded;
}

module.exports = taskController;