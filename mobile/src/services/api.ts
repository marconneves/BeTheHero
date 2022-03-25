import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.bethehero.projects.themark.dev/',
});

export default api;
