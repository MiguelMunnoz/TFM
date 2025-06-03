import axios from 'axios';

const URL_API = 'http://127.0.0.1:3000';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    headers: {
        'Content-Type' : 'application/json'
    },
    /*
    withCredentials: true,
    responseType: 'json',
    params: {
        'api_key': 'TU_API_KEY'
    },
    */
    //maxContentLength: 20000, //20KB
    //maxRedirects: 3
});

const taskService = {
    getAll: () => {
        console.log('Enviando peticion...');
        return api.get('/tasks')
    },
    create: (taskData) => api.post('/tasks', taskData),
    update: (id, taskData) => api.put(`/tasks/${id}`, taskData),
    delete: (id) => api.delete(`/tasks/${id}`)
}

export {
    taskService
}