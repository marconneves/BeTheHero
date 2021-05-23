import axios from 'axios';

const api = axios.create({
    baseURL: 'https://server-bethehero.marconwillian.dev:8080'
});

export default api;