import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Experiences API
export const listingsAPI = {
  getAll: (params = {}) => api.get('/api/experiences', { params }),
  getById: (id) => api.get(`/api/experiences/${id}`),
  create: (data) => api.post('/api/experiences', data),
  update: (id, data) => api.put(`/api/experiences/${id}`, data),
  delete: (id) => api.delete(`/api/experiences/${id}`),
};

// Bookings API
export const bookingsAPI = {
  getAll: (params = {}) => api.get('/api/bookings', { params }),
  getById: (id) => api.get(`/api/bookings/${id}`),
  create: (data) => api.post('/api/bookings', data),
  updateStatus: (id, status) => api.patch(`/api/bookings/${id}/status`, { status }),
  delete: (id) => api.delete(`/api/bookings/${id}`),
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  verify: () => api.get('/api/auth/verify'),
  logout: () => api.post('/api/auth/logout')
};

// Contacts API
export const contactsAPI = {
  getAll: () => api.get('/api/contacts'),
  create: (data) => api.post('/api/contacts', data),
  delete: (id) => api.delete(`/api/contacts/${id}`),
};

export default api;
