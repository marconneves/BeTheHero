import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.bethehero.marcon.run/sandbox'
});

export default api;