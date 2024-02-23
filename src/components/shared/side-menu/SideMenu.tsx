// import { NavLink } from 'react-router-dom';
import './SideMenu.css';

import { menuItems } from '../data/menu-items-data';
import { FcExport } from 'react-icons/fc';

import { ToggleSideBar } from '@/components/toggle-theme/ToggleSideBar';
import { DropdownMenuTop } from '@/components/dropdown-menu/DropdownMenuTop';
import { DropdownMenuLeft } from '@/components/dropdown-menu/DropdownMenuLeft';
import { SideMenuItemIcons } from './SideMenuItemIcons';
// import { useAuthStore } from '../../../stores';

export const SideMenu = (): JSX.Element => {
  // const logoutUser = useAuthStore( state => state.logoutUser );
  // const userName = useAuthStore( state => state.user?.fullName || 'No user' );

  return (
    <div className='bg-slate-900 md:min-h-screen z-10 text-slate-300 w-full md:w-auto'>
      <ToggleSideBar />
      <h1 className='text-[1.3rem] md:text-[1.5rem] font-bold text-white text-center pt-8 hidden md:block'>
        ICUP-App
      </h1>
      <div className='flex justify-between items-center md:flex-col md:pt-2 md:pb-4 md:px-2 md:gap-6'>
        {/* Title */}
        <div id='logo' className='my-4 md:m-0 px-2'>
          <a
            href='/dashboard'
            className='inline-flex gap-x-4 items-center px-3 md:px-0'
          >
            <h1 className='text-[1.45rem] font-bold text-white md:hidden'>
              ICUP-App
            </h1>
            <span>
              <img
                className='rounded-full w-12 h-12 md:w-14 md:h-14'
                src='../public/logo.jpg'
                alt=''
              />
            </span>
          </a>
          <p className=' mt-2 text-md hidden'>
            Panel administrativo de la Iglesia.
          </p>
        </div>

        {/* Button */}
        <div className='md:hidden '>
          <DropdownMenuTop />
        </div>
        <div className='hidden md:block'>
          <DropdownMenuLeft />
        </div>
      </div>

      {/*  Profile */}
      <div
        id='profile'
        className='pb-4 px-6 md:px-6 md:py-4 md:block md: text-center hidden'
      >
        <p className='text-md font-bold pb-4'>Bienvenido,</p>
        <a href='#' className='inline-flex space-x-2 items-center'>
          <span>
            <img
              className='rounded-full w-10 h-10'
              src='../public/men.png'
              alt=''
            />
          </span>

          <span className='text-sm font-bold hidden'>
            Kevin Michael Baca Angeles
          </span>
        </a>
      </div>

      {/* Menu Items */}
      <nav
        id='menu'
        className='w-full px-8 py-6 md:flex md:flex-col gap-y-[3.5rem] hidden'
      >
        <div className='flex flex-col gap-y-1 justify-center items-left'>
          {menuItems.map((item) => (
            <SideMenuItemIcons key={item.href} {...item} />
          ))}
        </div>
        {/* Logout */}
        <a /* onClick={ logoutUser } */>
          <FcExport className='text-2xl md:text-3xl m-auto' />
        </a>
      </nav>
    </div>
  );
};
