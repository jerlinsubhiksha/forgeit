import axios from 'axios';

// Create an Axios instance pointing to the Express backend
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('voyana_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
