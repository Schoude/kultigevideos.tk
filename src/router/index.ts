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
        // store video id for navigation after login
        if (to.name === ROUTE_NAMES.WATCH) {
          localStorage.setItem('videoId', to.params.hash as string);

          if (to.query.t) {
            localStorage.setItem('startTime', to.query.t as string);
          }
        } else {
          localStorage.removeItem('videoId');
          localStorage.removeItem('startTime');
        }

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
        path: '/profile/:id',
        name: ROUTE_NAMES.PROFILE_USER,
        component: () => import('../pages/content/ProfileUser.vue'),
        beforeEnter: (to, from, next) => {
          const authStore = useAuthStore();

          if (to.params.id === authStore.user?._id) {
            next({ name: ROUTE_NAMES.PROFILE });
            return;
          }

          next();
        },
      },
      {
        path: '/watch/:hash',
        name: ROUTE_NAMES.WATCH,
        component: () => import('../pages/content/Watch.vue'),
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
      {
        path: 'panel',
        name: ROUTE_NAMES.ADMIN_PANEL,
        component: () => import('../pages/admin/AdminPanel.vue'),
        beforeEnter: (to, from, next) => {
          const authStore = useAuthStore();
          if (authStore.user?.role === 'admin') {
            next();
          } else {
            next({ name: ROUTE_NAMES.FEED });
            return;
          }
        },
      },
      {
        path: 'panel/user/add',
        name: ROUTE_NAMES.USER_ADD,
        component: () => import('../pages/admin/UserAdd.vue'),
        beforeEnter: (to, from, next) => {
          const authStore = useAuthStore();
          if (authStore.user?.role === 'admin') {
            next();
          } else {
            next({ name: ROUTE_NAMES.FEED });
            return;
          }
        },
      },
      {
        path: 'panel/users',
        name: ROUTE_NAMES.USERS_OVERVIEW,
        component: () => import('../pages/admin/UsersOverview.vue'),
        beforeEnter: (to, from, next) => {
          const authStore = useAuthStore();
          if (authStore.user?.role === 'admin') {
            next();
          } else {
            next({ name: ROUTE_NAMES.FEED });
            return;
          }
        },
      },
      {
        path: 'panel/videos',
        name: ROUTE_NAMES.VIDEOS_OVERVIEW,
        component: () => import('../pages/admin/VideosOverview.vue'),
        beforeEnter: (to, from, next) => {
          const authStore = useAuthStore();
          if (authStore.user?.role === 'admin') {
            next();
          } else {
            next({ name: ROUTE_NAMES.FEED });
            return;
          }
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
  scrollBehavior() {
    return { top: 0 };
  },
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
