import axios from 'axios';

// Determine base URL, but NEVER hardcode localhost if running in production
let baseURL = import.meta.env.VITE_API_URL;
if (!baseURL && !import.meta.env.PROD) {
  baseURL = 'http://localhost:5000/api';
}

// Ensure the URL always ends with /api to match the Express routes
if (baseURL && !baseURL.endsWith('/api')) {
  // If it ends with a slash, remove it first
  if (baseURL.endsWith('/')) {
    baseURL = baseURL.slice(0, -1);
  }
  baseURL = `${baseURL}/api`;
}

// Force HTTPS in production
if (import.meta.env.PROD && baseURL?.startsWith('http://')) {
  baseURL = baseURL.replace('http://', 'https://');
}

// Create an Axios instance pointing to the Express backend
export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 120 seconds timeout for Render cold starts and AI processing
});

// Interceptor to attach JWT token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('voyana_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for unified error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let customMessage = 'An unexpected error occurred.';
    
    if (error.code === 'ECONNABORTED') {
      customMessage = 'Network timeout. The AI server is taking too long to respond.';
    } else if (!error.response) {
      customMessage = 'Unable to connect to the backend server. Please check your network.';
    } else if (error.response.status === 401) {
      customMessage = 'Authentication failed. Please log in again.';
      // Optional: Handle auto logout
    } else if (error.response.status >= 500) {
      customMessage = 'Server error. The backend is currently unavailable.';
    } else if (error.response.data && error.response.data.message) {
      customMessage = error.response.data.message;
    }

    // Attach our custom message to the error object so the UI can easily display it
    error.uiMessage = `${customMessage} (Attempted to connect to: ${error.config?.baseURL || 'unknown URL'}) - ${error.message}`;
    console.error('[API Error Details]', {
      url: error.config?.baseURL,
      message: error.message,
      response: error.response,
    });
    return Promise.reject(error);
  }
);
