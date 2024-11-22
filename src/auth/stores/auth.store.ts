import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AuthStatus, type User } from '../interfaces/Auth.Response';
import { loginAction } from '../actions/login.actions';
import { useLocalStorage } from '@vueuse/core';

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
  const logout = () => {
    authStatus.value = AuthStatus.NoAutorizado;
    user.value = undefined;
    token.value = '';
    return false;
  };
  return {
    user,
    token,
    authStatus,

    // Getters
    isCheking: computed(() => authStatus.value === AuthStatus.Cheking),
    isAutenticado: computed(() => authStatus.value === AuthStatus.Autorizado),

    username: computed(() => user.value?.username),

    // Actions
    login,
  };
});
