import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  redirect: { name: 'login' },
  component: () => import('@/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/auth/pages/LoginPage.vue'),
    },
    {
      path: 'registro',
      name: 'registro',
      component: () => import('@/auth/pages/RegisterPage.vue'),
    },
  ],
};
