import { TiendaApi } from '@/api/Tienda_online';

import type { Authresponse, User } from '../interfaces/Auth.Response';

import { isAxiosError } from 'axios';

interface RegistroError {
  ok: false;
  mensaje: string;
}

interface RegistroExistoso {
  ok: true;
  user: User;
  token: string;
}

export const registroAction = async (
  username: string,
  password: string,
): Promise<RegistroError | RegistroExistoso> => {
  try {
    const rol = 'user';
    const { data } = await TiendaApi.post<Authresponse>('/register', { username, password, rol });

    return {
      ok: true,
      user: data.user,
      token: data.access_token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return {
        ok: false,
        mensaje: 'El nombre de usuario ya está en uso.',
      };
    }
    throw new Error('No se pudo realizar la peticion ');
  }
};
