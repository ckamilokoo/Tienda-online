import axios from 'axios';

const TiendaApi = axios.create({
  baseURL: import.meta.env.VITE_TIENDA_ONLINE_URL,
});

// Interceptores
console.log(import.meta.env);

export { TiendaApi };
