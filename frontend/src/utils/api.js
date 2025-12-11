import axios from 'axios';

// 自动判断环境
const isDevelopment = process.env.NODE_ENV === 'development';

const API_BASE_URL = process.env.REACT_APP_API_URL || (
  isDevelopment 
    ? 'http://localhost:5000/api'
    : 'https://tophair-salon.onrender.com/api'  
);

console.log('🔗 当前环境:', process.env.NODE_ENV);
console.log('🔗 API Base URL:', API_BASE_URL);

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
    console.log('📤 Making API request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status);
    return response.data;
  },
  (error) => {
    console.error('❌ API Error:', error);
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
      return Promise.reject({
        message: error.response.data.message || '服务器错误',
        status: error.response.status,
      });
    } else if (error.request) {
      console.error('No response received:', error.request);
      return Promise.reject({
        message: '无法连接到服务器，请检查网络连接或稍后重试',
        status: 0,
      });
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error.message);
      return Promise.reject({
        message: '请求超时，服务器响应时间过长，请稍后重试',
        status: 0,
      });
    } else {
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
  book: (appointmentData) => {
    console.log('📝 Booking appointment:', appointmentData);
    return api.post('/appointments/book', appointmentData);
  },
  
  search: (searchParams) => {
    console.log('🔍 Searching appointments:', searchParams);
    return api.post('/appointments/search', searchParams);
  },
  
  cancel: (appointmentId) => {
    console.log('❌ Cancelling appointment:', appointmentId);
    return api.put(`/appointments/${appointmentId}/cancel`);
  },
  
  getAll: () => {
    console.log('📋 Fetching all appointments');
    return api.get('/appointments/');
  },
};

export default api;