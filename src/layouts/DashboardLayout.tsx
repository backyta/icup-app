/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Outlet } from 'react-router-dom';
// import { useAuthStore } from '../stores';
import { SideMenu } from '@/components/shared/side-menu/SideMenu';
import { ToggleLayout } from '@/components/toggle-theme/ToggleLayout';

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
        {/* <div className="col-span-2 xl:col-span-1"> */}
        <SideMenu />

        {/* <div className="col-span-5 w-full p-4"> */}
        <div className='w-full h-auto p-4'>
          <ToggleLayout />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// lg-lv1:h-[95rem] lg-lv2:h-[88rem]
// xl-lv1:h-[82rem]
