/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Outlet } from 'react-router-dom';

import { ToggleLayout } from '@/shared/components/toggle-theme';
import { SideMenu } from '@/shared/components/side-menu';

// import { useAuthStore } from '../stores';

export const DashboardLayout = (): JSX.Element => {
  // const authStatus = useAuthStore( state => state.status );
  // const checkAuthStatus = useAuthStore( state => state.checkAuthStatus );

  // if (authStatus === 'pending') {

  //   checkAuthStatus();
  //   return <>Loading...</>
  // }

  // if ( authStatus === 'unauthorized') {
  //   return <Navigate to='/auth/login'/>
  // }

  // console.log({authStatus})

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
