import axios from 'axios';

const URL_API = 'http://localhost:3000';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    withCredentials: true,
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
        return api.get('/tasks', {
            withCredentials: true
        })
    },
    create: (taskData) => api.post('/tasks', taskData, { withCredentials: true }),
    update: (id, taskData) => api.put(`/tasks/${id}`, taskData, { withCredentials: true }),
    delete: (id) => api.delete(`/tasks/${id}`, { withCredentials: true }),

    filter: (filter) => api.get('/tasks/filter', {
        params: {
            status: filter,
        },
        withCredentials: true,
    })
}

const userService = {
    register: (userData) => api.post('/register', userData, { withCredentials: true }),
    login: (userData) => api.post('/login', userData, { withCredentials: true }),
    logout: () => api.get('/logout', { withCredentials: true }),
}

export {
    taskService,
    userService
}