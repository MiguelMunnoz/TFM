import axios from 'axios';

const API_KEY = '948e82f134868ef42733b91fa4750ca3';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

const weatherService = {
    getCityWeather: (city) => {
        const url = `${WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
        return axios.get(url); 
    }
};

export {
    weatherService
}