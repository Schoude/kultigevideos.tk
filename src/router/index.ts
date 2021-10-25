// import { useAuthStore } from './../stores/auth';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ROUTE_NAMES } from './routing-info';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: ROUTE_NAMES.LOGIN,
    component: () => import('../pages/Login.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isLoggedIn) {
        next({ name: ROUTE_NAMES.HOME });
        return;
      }
      next();
    },
  },
  {
    path: '/',
    name: ROUTE_NAMES.APP_CONTENT,
    component: () => import('../pages/AppContent.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.isLoggedIn) {
        next({ name: ROUTE_NAMES.LOGIN });
        return;
      }
      next();
    },
    children: [
      {
        path: '',
        name: ROUTE_NAMES.HOME,
        component: () => import('../pages/content/Home.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: { name: ROUTE_NAMES.HOME },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn) {
    try {
      await authStore.refreshToken();
    } catch (error) {
      next();
      return;
    }
  }

  next();
});

export default router;
