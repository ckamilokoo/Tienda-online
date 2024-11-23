import axios from 'axios';

const TiendaApi = axios.create({
  baseURL: import.meta.env.VITE_TIENDA_ONLINE_URL,
});

// Interceptores

TiendaApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { TiendaApi };
