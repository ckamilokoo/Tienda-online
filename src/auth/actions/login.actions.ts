import { TiendaApi } from '@/api/Tienda_online';
import type { Authresponse, User } from '../interfaces/Auth.Response';

import { isAxiosError } from 'axios';

interface LoginError {
  ok: false;
  mensaje: string;
}

interface LoginExistoso {
  ok: true;
  user: User;
  token: string;
}

export const loginAction = async (
  username: string,
  password: string,
): Promise<LoginError | LoginExistoso> => {
  try {
    const { data } = await TiendaApi.post<Authresponse>('/token', { username, password });

    return {
      ok: true,
      user: data.user,
      token: data.access_token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        mensaje: 'Usuario o contraseña incorrectos',
      };
    }
    throw new Error('No se pudo realizar la peticion ');
  }
};
