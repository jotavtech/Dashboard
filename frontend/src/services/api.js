import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API methods
export const authAPI = {
  register: (userData) => api.post('/register', userData),
  login: (credentials) => api.post('/login', credentials),
  logout: () => api.post('/logout'),
  me: () => api.get('/me'),
};

// Dashboard API methods
export const dashboardAPI = {
  getDashboard: () => api.get('/dashboard'),
  updateProfile: (data) => api.put('/profile', data),
  getHobbies: () => api.get('/hobbies'),
  createHobby: (hobbyData) => api.post('/hobbies', hobbyData),
  updateHobby: (id, hobbyData) => api.put(`/hobbies/${id}`, hobbyData),
  deleteHobby: (id) => api.delete(`/hobbies/${id}`),
  updateSetting: (key, value) => api.post('/settings', { key, value }),
};

export default api; 