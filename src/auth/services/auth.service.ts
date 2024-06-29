/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { AxiosError } from 'axios';

import { icupApi } from '@/api/icupApi';
import { type UserRoles } from '@/app/user/enums';

export interface LoginResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  roles: UserRoles[];
  status: string;
  token: string;
}


export class AuthService {
  static login = async(email: string, password: string): Promise<LoginResponse> => {
    try {
      const { data } = await icupApi.post<LoginResponse>('/auth/login',{ email, password })
 
      return data;
      
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data)
      }
      throw new Error('Unable to login')
    }
  }

  static checkStatus = async():Promise<LoginResponse> => {
    try {
      const { data } = await icupApi.get('/auth/check-status');

      return data;
    } catch (error) {
      throw new Error('Unauthorized')
    }
  }
}