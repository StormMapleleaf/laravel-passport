import axios from 'axios';
const API_URL = 'http://localhost:8080/api'; // Lumen 后端地址

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(
//   (config) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//           config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//   },
//   (error) => {
//       return Promise.reject(error);
//   }
// );

export default api;