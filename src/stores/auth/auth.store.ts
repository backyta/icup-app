import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { type AuthStatus } from '@/auth/interfaces';
import { AuthService } from '@/auth/services/auth.service';

import { type User } from '@/app/user/interfaces';


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
      throw new Error('Unauthorized');
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token , ...user } = await AuthService.checkStatus();
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