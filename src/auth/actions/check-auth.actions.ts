import { TiendaApi } from '@/api/Tienda_online';
import type { Authresponse, User } from '../interfaces/Auth.Response';
import { isAxiosError } from 'axios';

interface CheckError {
  ok: false;
}

interface CheckExistoso {
  ok: true;
  user: User;
  token: string;
}

export const checkAuthActions = async (): Promise<CheckError | CheckExistoso> => {
  try {
    const localToken = localStorage.getItem('token');
    if (localToken && localToken.length < 10) {
      return { ok: false };
    }
    const { data } = await TiendaApi.get<Authresponse>('/users/me/');

    return {
      ok: true,
      user: data.user,
      token: data.access_token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
      };
    }

    throw new Error('No se pudo verificar la sesión ');
  }
};
