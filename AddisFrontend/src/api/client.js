import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL||'https://addis-test-project-r1hf.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
