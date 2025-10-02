import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Can add authentication token here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with error status code
      return Promise.reject({
        message: error.response.data.message || 'Server error occurred',
        status: error.response.status,
      });
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        message: 'No response from server. Please check your connection.',
        status: 0,
      });
    } else {
      // Error occurred while setting up request
      return Promise.reject({
        message: 'Request setup error',
        status: 0,
      });
    }
  }
);

// API methods
export const appointmentAPI = {
  // Create appointment
  book: (appointmentData) => {
    return api.post('/appointments/book', appointmentData);
  },
  
  // Search appointments
  search: (searchParams) => {
    return api.post('/appointments/search', searchParams);
  },
  
  // Cancel appointment
  cancel: (appointmentId) => {
    return api.put(`/appointments/${appointmentId}/cancel`);
  },
  
  // Get all appointments
  getAll: () => {
    return api.get('/appointments/');
  },
};

export default api;
