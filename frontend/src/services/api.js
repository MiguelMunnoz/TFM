import axios from 'axios';

const URL_API = 'http://localhost:3000';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    withCredentials: true,
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
        return api.get('/tasks', {
            withCredentials: true
        })
    },
    create: (taskData) => api.post('/tasks', taskData, { withCredentials: true }),
    update: (id, updatedData) => {
        return api.put(`/tasks`, {id, updatedData}, { withCredentials: true })
    },
    delete: (id) => api.delete(`/tasks/${id}`, { withCredentials: true }),

    filter: (filter, checked) => { 
        console.log('Enviando filter=', filter, ' y checked=', checked);
        return api.get('/tasks/filter', {
            params: {
                status: filter,
                fav: checked
            },
            withCredentials: true,
        })
    }
}

const userService = {
    register: (userData) => api.post('/register', userData, { withCredentials: true }),
    login: (userData) => api.post('/login', userData, { withCredentials: true }),
    logout: () => api.get('/logout', { withCredentials: true }),
}

const imageService = {
    upload: (imageData) => api.post('/images/upload', imageData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }, 
        withCredentials: true,
    }),

    getImageByName: async (imageName) => {
        try {
            const response = await api.get(`images/list/${imageName}`, {
                responseType: 'blob',
                withCredentials: true,
            });

            const imageUrl = URL.createObjectURL(response.data); // response.data es el blob
            return imageUrl;
        } catch (error) {
            console.error('[ERROR] Error getting image by name: ', error);
            throw error;
        }
    },

    deleteImage: async (imageName) => { await api.delete(`/images/delete/${imageName}`, {withCredentials: true})}
}

const eventService = {
    create: (eventData) => api.post('/events', eventData, { withCredentials: true }),
}

export {
    taskService,
    userService,
    imageService,
    eventService
}