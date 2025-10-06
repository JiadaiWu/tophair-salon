import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://tophair-salon.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.baseURL + config.url);
    // Can add authentication token here
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
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
      console.error('Server responded with error:', error.response.status, error.response.data);
      return Promise.reject({
        message: error.response.data.message || 'Server error occurred',
        status: error.response.status,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
      return Promise.reject({
        message: '无法连接到服务器。请检查网络连接或稍后重试。',
        status: 0,
      });
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error
      console.error('Request timeout:', error.message);
      return Promise.reject({
        message: '请求超时。服务器响应时间过长，请稍后重试。',
        status: 0,
      });
    } else {
      // Error occurred while setting up request
      console.error('Request setup error:', error.message);
      return Promise.reject({
        message: '请求设置错误: ' + error.message,
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
