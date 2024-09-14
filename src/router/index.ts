import { createRouter, createWebHistory } from 'vue-router';
import layoutshop from '../modules/shop/layouts/ShopLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: layoutshop,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/modules/shop/views/HomeView.vue'),
        },
      ],
    },
  ],
});

export default router;
