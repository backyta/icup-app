import './SideMenu.css';

import { FcExport } from 'react-icons/fc';

import { ToggleSideBar } from '@/shared/components/toggle-theme';
import { DropdownMenuLeft } from '@/shared/components/dropdown-menu';
import { MenuBarTooltip, SideMenuItemIcons } from '@/shared/components/side-menu';

import { menuItems } from '@/shared/data';

// TODO 1 : Hacer tooltip en la barra lateral, con ShadCN tomar componente Tooltip e implementarlo.✔
// NOTE : https://ui.shadcn.com/docs/components/tooltip

export const SideMenu = (): JSX.Element => {
  return (
    <div className='bg-slate-900 md:min-h-screen z-10 text-slate-300 w-full md:w-[7.5rem]'>
      <ToggleSideBar />

      {/* Header */}
      <div className='flex justify-between items-center md:flex-col md:pt-2 md:pb-4 md:px-2 md:gap-6'>
        {/* Image, Title */}
        <div id='logo' className='my-4 md:m-0 px-0 md:pt-4'>
          <a
            href='/dashboard'
            className='inline-flex gap-x-4 items-center px-3 md:py-4 md:px-0 md:flex md:flex-col-reverse md:gap-3'
          >
            <h1 className='text-[1.7rem] md:text-[1.8rem] font-bold font-dancing-script italic text-white'>
              ICUP <span className='md:hidden'> - </span>
              <span className='md:block text-[1.7rem] md:text-[1.7rem] md:text-center leading-3'>
                App
              </span>
            </h1>
            <span>
              {/* <img className='rounded-full w-12 h-12 ' src='../public/logo.jpg' alt='' /> */}
            </span>
          </a>
          {/* <p className=' mt-2 text-md hidden'>Panel administrativo de la Iglesia.</p> */}
        </div>
        {/* Button */}
        <DropdownMenuLeft />
      </div>

      {/* Menu Icon Items */}
      <nav id='menu' className='w-full px-8 py-6 md:flex md:flex-col gap-y-[3rem] hidden'>
        <div className='flex flex-col gap-y-1 justify-center items-left'>
          {menuItems.map((item) => (
            <MenuBarTooltip key={item.href} item={item}>
              <SideMenuItemIcons key={item.href} {...item} />
            </MenuBarTooltip>
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
