import { useAuthStore } from '@/auth/stores/auth.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  await authStore.checkAuthStatus();

  if (!authStore.isAdmin) {
    next({ name: 'home' }); // Redirige solo si no es admin
  } else {
    next(); // Permite la navegación si es admin
  }
};

export default isAdminGuard;
