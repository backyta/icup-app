import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { AuthService } from '@/modules/auth/services';
import { type AuthStatus } from '@/modules/auth/interfaces';

import { type User } from '@/modules/user/interfaces';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User

  loginUser:(email:string, password: string) => Promise<void>
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
}

export const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'pending',
  token: undefined,
  user: undefined,

  loginUser: async(email:string, password: string) => {
    try {
      const {token, ...user} = await AuthService.login(email, password);
      set({ status:'authorized', token, user});

    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined});
      throw error;
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token , ...user } = await AuthService.checkAuthStatus();
      set({ status: 'authorized', token, user })
    } catch (error) {

      set({ status: 'unauthorized', token: undefined, user: undefined })
    }
  },

  logoutUser: () => {
    set({ status:'unauthorized', token: undefined, user: undefined })
  }
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      storeApi,
      {name: 'auth-storage'}
    )
  )
);