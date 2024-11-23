<template>
  <RouterView />
  <VueQueryDevtools />
</template>

<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './auth/stores/auth.store';
import { AuthStatus } from './auth/interfaces/Auth.Response';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Cheking) {
      authStore.checkAuthStatus();
      console.log(state.authStatus);
      return;
    }
    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Autorizado) {
      router.replace({ name: 'home' });
      return;
    }
    console.log(state.authStatus);
  },
  {
    immediate: true,
  },
);
</script>

<style scoped></style>
