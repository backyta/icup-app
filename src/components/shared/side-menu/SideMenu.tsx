// import { NavLink } from 'react-router-dom';
import './SideMenu.css';
import { SideMenuItem } from './SideMenuItem';
import { menuItems } from '../data/menu-items-data';
import { FcExport } from 'react-icons/fc';

import { ToggleSideBar } from '@/components/toggle-theme/ToggleSideBar';
// import { useAuthStore } from '../../../stores';

export const SideMenu = (): JSX.Element => {
  // const logoutUser = useAuthStore( state => state.logoutUser );
  // const userName = useAuthStore( state => state.user?.fullName || 'No user' );

  return (
    <div className='bg-slate-900 md:min-h-screen z-10 text-slate-300 w-full md:w-[18rem]'>
      <ToggleSideBar />
      <div className='flex justify-between items-center'>
        {/* Title */}
        <div id='logo' className='my-4 px-4'>
          <a href='#' className='inline-flex gap-x-4 items-center'>
            <h1 className='text-[1.45rem] lg:text-[1.45rem] xl:text-[1.75rem] font-bold text-white'>
              ICUP-App
            </h1>
            <span>
              <img
                className='rounded-full w-10 h-10'
                src='../public/men.png'
                alt=''
              />
            </span>
          </a>
          <p className=' mt-2 text-md hidden md:block'>
            Dashboard administrativo de la Iglesia.
          </p>
        </div>

        {/* Button */}
        {/* TODO : Agregar estado y on click para abrir y cerrar */}
        <button
          id='button'
          type='button'
          className='relative md:hidden inline-flex items-center justify-center rounded-md p-4 text-white hover:bg-slate-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
          aria-controls='mobile-menu'
          aria-expanded='false'
        >
          <span className='absolute -inset-0.5'></span>
          <span className='sr-only'>Open main menu</span>

          <svg
            className='block h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>

          <svg
            className='hidden h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>

      {/*  Profile */}
      <div id='profile' className='pb-4 px-6 md:px-6 md:py-8 md:block hidden'>
        <p className='text-lg'>Bienvenido,</p>
        <a href='#' className='inline-flex space-x-2 items-center'>
          <span>
            <img
              className='rounded-full w-14 h-10'
              src='../public/men.png'
              alt=''
            />
          </span>

          <span className='text-sm md:text-base font-bold'>
            Kevin Michael Baca Angeles
          </span>
        </a>
      </div>

      {/* Menu Items */}
      <nav
        id='menu'
        className='w-full px-8 py-4 md:flex md:flex-col gap-y-[1rem] md:gap-y-[3.5rem] hidden'
      >
        <div className='flex flex-col lg:gap-y-1 xl:gap-y-1 2xl:gap-y-1'>
          {menuItems.map((item) => (
            <SideMenuItem key={item.href} {...item} />
          ))}
        </div>
        {/* Logout */}
        <a /* onClick={ logoutUser } */>
          <FcExport className='text-2xl md:text-3xl' />
          <div>
            <span className='text-xl text-red-500 font-bold leading-5'>
              Salir
            </span>
            <span className='text-sm text-white-500 font-bold hidden md:block'>
              Cerrar sesión
            </span>
          </div>
        </a>
      </nav>
    </div>
  );
};
