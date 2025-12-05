import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
      return Promise.reject({ message: 'Network error. Please check your connection.' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return Promise.reject({ message: error.message || 'An unexpected error occurred' });
    }
  }
);

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
  getAll: (params = {}) => {
    // Using mock data for now
    return Promise.resolve({
      data: [
        {
          _id: '1',
          title: 'Desert Safari Adventure',
          shortDescription: 'Experience the magic of Sahara desert with our expert guides.',
          pricePerPerson: 150,
          maxPeople: 10,
          location: 'Merzouga, Morocco',
          duration: '3 days',
          type: 'Adventure',
          rating: 4.8,
          reviews: 124,
          images: ['https://picsum.photos/seed/sahara1/400/300.jpg'],
          isPopular: true
        },
        {
          _id: '2',
          title: 'Luxury Desert Camp',
          shortDescription: 'Stay in our luxury desert camp under the stars.',
          pricePerPerson: 250,
          maxPeople: 8,
          location: 'Erg Chebbi, Morocco',
          duration: '2 days',
          type: 'Luxury',
          rating: 4.9,
          reviews: 89,
          images: ['https://picsum.photos/seed/sahara2/400/300.jpg'],
          isPopular: true
        },
        {
          _id: '3',
          title: 'Berber Cultural Experience',
          shortDescription: 'Immerse yourself in authentic Berber culture and traditions.',
          pricePerPerson: 120,
          maxPeople: 15,
          location: 'Atlas Mountains, Morocco',
          duration: '1 day',
          type: 'Cultural',
          rating: 4.7,
          reviews: 56,
          images: ['https://picsum.photos/seed/sahara3/400/300.jpg'],
          isPopular: true
        }
      ]
    });
  },
  getById: (id) => {
    // Return mock data for specific experience
    return Promise.resolve({
      data: {
        _id: id,
        title: 'Desert Safari Adventure',
        shortDescription: 'Experience the magic of Sahara desert with our expert guides.',
        pricePerPerson: 150,
        maxPeople: 10,
        location: 'Merzouga, Morocco',
        duration: '3 days',
        type: 'Adventure',
        rating: 4.8,
        reviews: 124,
        images: ['https://picsum.photos/seed/sahara1/400/300.jpg']
      }
    });
  },
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
