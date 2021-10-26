import { apiClient } from './../api/index';
import { User } from '../types/models/user.d';
import { defineStore } from 'pinia';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  refreshTimeout: number | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLoggedIn: false,
    user: null,
    refreshTimeout: null,
  }),
  actions: {
    async login(email: string, password: string) {
      const res = await apiClient.post<{
        me: User;
        jwt: string;
        expires: number;
      }>({
        url: '/api/v1/login',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 401) {
        throw new Error('Unauthorized');
      }

      apiClient.headers = { Authentication: `Bearer ${res.data.jwt}` };

      setTimeout(async () => {
        this.refreshToken();
      }, res.data.expires * 1000 - 1000);

      this.isLoggedIn = true;
      this.user = res.data.me;
    },
    async logout() {
      this.isLoggedIn = false;
      await apiClient.post({
        url: '/api/v1/logout',
        mode: 'cors',
        credentials: 'include',
      });

      apiClient.headers = {};
      clearTimeout(this.refreshTimeout as number);
    },
    async refreshToken() {
      if (this.refreshTimeout != null) {
        clearTimeout(this.refreshTimeout);
      }

      const res = await apiClient.get<{
        jwt: string;
        expires: number;
        me: User;
      }>({
        url: '/api/v1/refresh',
        mode: 'cors',
        credentials: 'include',
      });

      apiClient.headers = { Authentication: `Bearer ${res.data.jwt}` };

      if (res.status !== 401) {
        this.isLoggedIn = true;
        this.user = res.data.me;

        this.refreshTimeout = window.setTimeout(async () => {
          this.refreshToken();
        }, res.data.expires * 1000 - 500);
      }
    },
  },
  getters: {
    getUserName(): string {
      return this.user?.username as string;
    },
    getAvatarUrl(): string {
      return this.user?.meta.avatarUrl as string;
    },
  },
});
