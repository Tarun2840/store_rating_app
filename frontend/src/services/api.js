import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the base URL as needed
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example API calls
export const registerUser = async (userData) => {
  return await API.post('/auth/register', userData);
};

export const loginUser = async (credentials) => {
  return await API.post('/auth/login', credentials);
};

export const fetchUsers = async () => {
  return await API.get('/users');
};

export const fetchStores = async () => {
  return await API.get('/stores');
};

export const submitRating = async (ratingData) => {
  return await API.post('/ratings', ratingData);
};

export default API;