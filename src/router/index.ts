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
        next({ name: ROUTE_NAMES.FEED });
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
        name: ROUTE_NAMES.FEED,
        component: () => import('../pages/content/Feed.vue'),
      },
      {
        path: '/profile',
        name: ROUTE_NAMES.PROFILE,
        component: () => import('../pages/content/Profile.vue'),
      },
      {
        path: '/profile/:hash',
        name: ROUTE_NAMES.PROFILE_USER,
        component: () => import('../pages/content/Profile.vue'),
      },
      {
        path: '/watch/:hash',
        name: ROUTE_NAMES.WATCH,
        component: () => import('../pages/content/Profile.vue'),
      },
      {
        path: 'upload',
        name: ROUTE_NAMES.UPLOAD,
        component: () => import('../pages/content/Upload.vue'),
        beforeEnter: (to, from, next) => {
          const authStore = useAuthStore();
          if (authStore.user?.role === 'user') {
            next({ name: ROUTE_NAMES.FEED });
            return;
          }
          next();
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: { name: ROUTE_NAMES.FEED },
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
