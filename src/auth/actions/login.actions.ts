import { TiendaApi } from '@/api/Tienda_online';

export const loginAction = async (email: string, password: string) => {
  try {
    const resp = await TiendaApi.post('/token');
  } catch (error) {}
};
