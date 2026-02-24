import axios from 'axios';

const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';

const rawBaseURL = isDevelopment 
  ? 'http://localhost:8000'
  : 'https://analytics-dashboard-backend-5kz6.onrender.com';

const api = axios.create({
  baseURL: rawBaseURL.endsWith('/') ? rawBaseURL.slice(0, -1) : rawBaseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
