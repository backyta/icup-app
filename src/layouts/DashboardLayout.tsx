/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/stores';

import { SideMenu } from '@/shared/components/side-menu';
import { ToggleLayout } from '@/shared/components/toggle-theme';
import { LoadingSpinner } from '@/shared/components/spinner/LoadingSpinner';

export const DashboardLayout = (): JSX.Element => {
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (authStatus === 'pending') {
    return <LoadingSpinner />;
  }

  if (authStatus === 'unauthorized') {
    return <Navigate to='/auth/login' />;
  }

  return (
    <div className='light:bg-slate-500 w-full h-auto antialiased light:text-slate-900 selection:bg-blue-900 selection:text-white'>
      <div className='flex flex-col md:flex-row md:relative md:w-full md:min-h-full'>
        <SideMenu />

        <div className='w-full px-4 py-0 '>
          <ToggleLayout />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
