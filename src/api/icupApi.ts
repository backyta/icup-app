/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import axios from 'axios';
import { useAuthStore } from '@/stores/auth/auth.store';

export const icupApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {}
})

//* Interceptors (read zustand storage)
// Any request that passes through the API executes the interceptor

// TODO : revisar el getState en zustand
icupApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config;
  }
)



