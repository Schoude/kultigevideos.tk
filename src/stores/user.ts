import type { NewUserData } from './../types/models/user.d';
import { defineStore } from 'pinia';
import { apiClient } from '../api';

export const useUserStore = defineStore('user', {
  actions: {
    async createUser(newUser: NewUserData) {
      try {
        const res = await apiClient.post<{ message: string }>({
          url: '/api/v1/user',
          body: JSON.stringify(newUser),
          mode: 'cors',
        });

        return res;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
  },
});
