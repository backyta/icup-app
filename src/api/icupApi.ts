/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';

import { useAuthStore } from '@/stores/auth/auth.store';

//* Create instance of axios
export const icupApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {},
});

//* Function to check if the token is about to expire
const isTokenExpiringSoon = (token: string) => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp! - currentTime < 20;
  } catch (error) {
    return false;
  }
};

//* Interceptors (read zustand storage)
// Any request that passes through the API executes the interceptor
icupApi.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().token;

  // console.log(document.cookie);

  if (token) {
    if (isTokenExpiringSoon(token)) {
      try {
        const { data } = await axios.get<{ accessToken: string }>(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {
            withCredentials: true,
          }
        );

        console.log(data);

        if (data.accessToken) {
          useAuthStore.getState().setAccessToken(data);
          config.headers.Authorization = `Bearer ${data.accessToken}`;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message, {
            position: 'top-center',
            className: 'justify-center',
          });

          setTimeout(() => {
            useAuthStore.getState().logoutUser();
          }, 3000);
        }
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
