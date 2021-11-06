import type { NewUserData } from './../types/models/user.d';
import { defineStore } from 'pinia';
import { apiClient } from '../api';

export const useUserStore = defineStore('user', {
  actions: {
    async createUser(newUser: NewUserData) {
      try {
        await apiClient.post({
          url: '/api/v1/user',
          body: JSON.stringify(newUser),
          mode: 'cors',
        });
      } catch (error) {
        console.log((error as Error).message);
      }
    },
  },
});
