import type { RouteRecordRaw } from 'vue-router';
import isAdminGuard from '../guards/is-Admin.guard';
import isAuthenticatedGuard from '@/auth/guards/is-authenticated.guard';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  redirect: { name: 'admin-dashboard' },
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'admin-dashboard',
      component: () => import('@/modules/admin/views/DashboardView.vue'),
    },
    {
      path: 'productos',
      name: 'admin-productos',
      component: () => import('@/modules/admin/views//ProductosView.vue'),
    },
  ],
};
