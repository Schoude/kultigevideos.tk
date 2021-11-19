import { useAuthStore } from './auth';
import type { NewUserData, ProfileUser } from './../types/models/user.d';
import { defineStore } from 'pinia';
import { apiClient } from '../api';

interface UserState {
  userProfileData: null | ProfileUser;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userProfileData: null,
  }),
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
    async fetchUserProfileData(userId: string) {
      try {
        const res = await apiClient.get<ProfileUser>({
          url: `/api/v1/user/${userId}`,
          mode: 'cors',
        });

        this.setUserProfileData(res.data);
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    setUserProfileData(profileData: ProfileUser | null) {
      this.userProfileData = profileData;
    },
  },
  getters: {
    getUserProfileData(): ProfileUser | null {
      return this.userProfileData;
    },
    userIsAuthUser(): boolean {
      const authStore = useAuthStore();
      return this.getUserProfileData?._id === authStore.getUserId;
    },
    userHasVideos(): boolean {
      return (this.getUserProfileData as ProfileUser).videos.length > 0;
    },
  },
});
