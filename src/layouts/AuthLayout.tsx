/* eslint-disable @typescript-eslint/no-floating-promises */

import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/stores/auth/auth.store';

import { LoadingSpinner } from '@/shared/components/spinner/LoadingSpinner';
import { ToggleLayoutLogin } from '@/shared/components/toggle-theme/ToggleLayoutLogin';

export const AuthLayout = (): JSX.Element => {
  //* States
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  //* Auth
  if (authStatus === 'pending') {
    checkAuthStatus();
    return <LoadingSpinner />;
  }

  if (authStatus === 'authorized') {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='animate-fadeIn'>
      <ToggleLayoutLogin />
      <div className='bg-neutral-100 dark:bg-slate-950 flex h-screen overflow-hidden'>
        <div className='w-1/2 hidden lg:flex lg:flex-col items-center relative'>
          <span
            className='absolute text-login-text font-medium lg:text-[5.8rem] lg:bottom-12 xl:text-[7.5rem] 2xl:text-[8rem] xl:bottom-12 2xl:bottom-12 font-dancing-script'
            style={{ textShadow: '3px 3px 4px rgba(255, 255, 255, 0.8)' }}
          >
            Ven y sígueme
          </span>

          <img src='/jesus-image.webp' alt='Imagen Jesus' className='w-full h-full' />
        </div>
        <div className='pl-4 pr-1 w-full lg:w-1/2 flex flex-col mt-7 items-center'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
