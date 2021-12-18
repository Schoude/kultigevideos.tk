import { useAuthStore } from './auth';
import type {
  NewUserData,
  ProfileUser,
  User,
  UserRole,
} from './../types/models/user.d';
import { defineStore } from 'pinia';
import { apiClient } from '../api';

interface UserState {
  userProfileData: null | ProfileUser;
  usersOverview: User[];
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userProfileData: null,
    usersOverview: [],
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
      const res = await apiClient.get<ProfileUser>({
        url: `/api/v1/user/${userId}`,
        mode: 'cors',
      });

      if (res.status === 200) {
        this.setUserProfileData(res.data);
      } else {
        throw new Error('Internal Server Error');
      }
    },
    setUserProfileData(profileData: ProfileUser | null) {
      this.userProfileData = profileData;
    },
    async fetchUsersOverview() {
      try {
        const res = await apiClient.get<User[]>({
          url: '/api/v1/users/overview',
          mode: 'cors',
        });

        this.setUsersOverviewData(res.data);
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    setUsersOverviewData(users: User[]) {
      this.usersOverview = users;
    },
    async updateUserRole(userId: string, role: UserRole) {
      try {
        await apiClient.put({
          url: '/api/v1/user/role',
          mode: 'cors',
          body: JSON.stringify({ userId, role }),
        });
      } catch (error) {
        console.log((error as Error).message);
      }
    },
  },
  getters: {
    getUserProfileData: state => {
      return state.userProfileData;
    },
    userIsAuthUser(): boolean {
      const authStore = useAuthStore();
      return this.getUserProfileData?._id === authStore.getUserId;
    },
    userHasVideos(): boolean {
      return this.getUserProfileData
        ? this.getUserProfileData.videos.length > 0
        : false;
    },
    getUsersOverview: state => {
      return state.usersOverview;
    },
  },
});
