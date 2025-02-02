import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { AuthService } from '@/modules/auth/services/auth.service';
import { type AuthStatus } from '@/modules/auth/types/auth-status.type';
import { type User } from '@/modules/user/interfaces/user-form-data.interface';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  setAccessToken: (data: { accessToken: string }) => void;
}

export const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'pending',
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);

      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });

      throw error;
    }
  },

  logoutUser: () => {
    set({ status: 'unauthorized', token: undefined, user: undefined });
  },

  setAccessToken: (data) => {
    set({
      token: data.accessToken,
      status: 'authorized',
    });
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: 'auth-storage' }))
);
