const Task = require('../models/Task');

async function getTasks() {
    try {
        const tasks = await Task.find({});
        return tasks;
    } catch (error) {
        console.log('[ERROR] Error getting tasks:', error);
        throw error;
    }
}

async function getTaskById(id) {
    try {
        const task = await Task.findById(id);
        return task;
    } catch (error) {
        console.log('[ERROR] Error service getting task by Id:', error);
        throw error;
    }
}

async function createTask(taskData) {
    try {
        const task = new Task(taskData);
        const res = await task.save();
        return res;
    } catch (error) {
        console.log('[ERROR] Error creating task:', error);
        throw error;
    }
}

async function updateTask(id, taskData) {
    try {
        const task = await Task.findByIdAndUpdate(
            id,
            taskData,
            { 
                new: true,
                runValidators: true // Ejecuta las validaciones del esquema
            }
        );

        if (!task) {
            throw new Error('[Error] Task not found.');
        }

        return task;
    } catch (error) {
        console.log('[ERROR] Error updating task:', error);
        throw error;
    }
}

async function deleteTask(id) {
    try {
        const task = await Task.findByIdAndDelete(id);
        
        if (!task) {
            throw new Error('[Error] Task not found.');
        }

        return task;
    } catch (error) {
        console.log('[ERROR] Error deleting task:', error);
        throw error;
    }
}

async function filterTasks(filter) {
    try {
        const tasks = await Task.find(filter);
        return tasks;
    } catch (error) {
        console.log('[ERROR] Error filtering task:', error);
        throw error;
    }
}

module.exports = { 
    getTasks,
    getTaskById,
    createTask,  
    updateTask, 
    deleteTask,
    filterTasks,
};