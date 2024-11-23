import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AuthStatus, type User } from '../interfaces/Auth.Response';
import { loginAction } from '../actions/login.actions';
import { registroAction } from '../actions/register.actions';
import { useLocalStorage } from '@vueuse/core';
import { checkAuthActions } from '../actions/check-auth.actions';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Cheking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (username: string, password: string) => {
    try {
      const loginResp = await loginAction(username, password);
      if (!loginResp.ok) {
        logout();
        return false;
      }

      user.value = loginResp.user;

      token.value = loginResp.token;
      authStatus.value = AuthStatus.Autorizado;
      return true;
    } catch (error) {
      return logout();
    }
  };

  const registro = async (username: string, password: string) => {
    try {
      const RegistroResp = await registroAction(username, password);
      if (!RegistroResp.ok) {
        logout();
        return false;
      }

      user.value = RegistroResp.user;
      token.value = RegistroResp.token;
      authStatus.value = AuthStatus.Autorizado;
      return true;
    } catch (error) {
      return { ok: false, mensaje: 'Error al registrar al usuario' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    authStatus.value = AuthStatus.NoAutorizado;
    user.value = undefined;
    token.value = '';
    return false;
  };

  //const admin =

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthActions();

      if (!statusResp.ok) {
        logout();
        return false;
      }

      user.value = statusResp.user;

      token.value = statusResp.token;
      authStatus.value = AuthStatus.Autorizado;
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    // Getters
    isCheking: computed(() => authStatus.value === AuthStatus.Cheking),
    isAutenticado: computed(() => authStatus.value === AuthStatus.Autorizado),
    isAdmin: computed(() => user.value?.rol === 'admin'),

    username: computed(() => user.value?.username),

    // Actions
    login,
    logout,
    registro,
    checkAuthStatus,
  };
});
