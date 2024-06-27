/* eslint-disable @typescript-eslint/no-floating-promises */
import { useAuthStore } from '@/stores';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadingSpinner } from '@/layouts/components/LoadingSpinner';
import { ToggleLayoutLogin } from '@/shared/components/toggle-theme';

export const AuthLayout = (): JSX.Element => {
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  if (authStatus === 'pending') {
    checkAuthStatus();
    return <LoadingSpinner />;
  }

  if (authStatus === 'authorized') {
    return <Navigate to='/dashboard' />;
  }

  return (
    <>
      <ToggleLayoutLogin />
      <div className='bg-neutral-100 dark:bg-slate-950 flex h-screen overflow-hidden'>
        <div className='w-1/2 hidden lg:flex lg:flex-col items-center relative'>
          <span
            className='absolute text-login-text font-medium lg:text-[5.8rem] lg:bottom-12 xl:text-[7.5rem] 2xl:text-[8rem] xl:bottom-12 2xl:bottom-12 font-dancing-script'
            style={{ textShadow: '3px 3px 4px rgba(255, 255, 255, 0.8)' }}
          >
            Ven y sígueme
          </span>

          <img
            src='/src/assets/jesus-image.jpg'
            alt='Placeholder Image'
            className='w-full h-full '
          />
        </div>
        <div className='lg:p-8 md:p-8 sm:20 p-8 w-full lg:w-1/2 flex flex-col justify-center items-center'>
          <Outlet />
        </div>
      </div>
    </>
  );
};
