import { Outlet } from 'react-router-dom';
// import { useAuthStore } from '../stores';
import { SideMenu } from '@/components/shared/side-menu/SideMenu';

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
    <div className='bg-slate-200 w-full h-full antialiased text-slate-900  selection:bg-blue-900 selection:text-white'>
      <div className='flex flex-row relative w-full'>
        {/* <div className="col-span-2 xl:col-span-1"> */}
        <SideMenu />

        {/* <div className="col-span-5 w-full p-4"> */}
        <div className='w-full p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
