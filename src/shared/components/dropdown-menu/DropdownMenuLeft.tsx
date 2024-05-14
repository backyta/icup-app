import { FcExport } from 'react-icons/fc';

import { SideMenuItem } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/shared/components/ui/sheet';

import { menuItems } from '@/shared/data';

export function DropdownMenuLeft(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          id='button'
          type='button'
          className='bg-slate-900 text-white hover:bg-slate-600 hover:text-white px-1 py-0 md:absolute mr-3 md:mr-0 md:left-[5.4rem] md:top-[11rem] md:rounded-full'
          aria-controls='mobile-menu'
          aria-expanded='false'
        >
          <svg
            className='block md:hidden h-7 w-7 '
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
            className='hidden md:block h-7 w-7'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 12h14M12 5l7 7-7 7'
            />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className='h-full w-[20rem] md:h-full md:w-full md:py-6'>
        <SheetHeader>
          {/* Title and sub-title */}
          <div id='logo' className='py-1 text-center'>
            <a href='/dashboard' className='inline-flex gap-x-6 items-center justify-center'>
              <h1 className='text-[1.85rem] font-bold font-dancing-script italic text-white '>
                ICUP-App
              </h1>
              <span>
                {/* <img className='rounded-full w-12 h-12' src='../public/logo.jpg' alt='' /> */}
              </span>
            </a>
            <p className='mt-2 text-md sm:w-[20rem] sm:mx-auto border-b border-slate-700 pb-2 text-white'>
              Panel administrativo de la Iglesia.
            </p>
          </div>
          {/* Profile */}
          <div id='profile' className='pb-2 md:pb-8 px-6 text-center md:pt-2'>
            <p className='text-lg text-white'>Bienvenido,</p>
            <div className='inline-flex space-x-0 items-center'>
              <span>
                <img
                  className='rounded-full w-12 md:w-11 h-10'
                  src='src/assets/men.png'
                  alt='profile-image'
                />
              </span>

              <span className='text-md md:text-base font-medium text-white'>
                Pepito Jose Ramirez Gomez
              </span>
            </div>
          </div>
        </SheetHeader>
        <nav
          id='menu'
          className='w-full px-10 flex flex-col items-center py-2  gap-y-[1rem] md:gap-y-[2.5rem]'
        >
          <div className='flex flex-col gap-y-2'>
            {menuItems.map((item) => (
              <SideMenuItem key={item.href} {...item} />
            ))}
          </div>
          {/* Logout */}
          <a href='./dashboard' className='flex w-full text-center justify-center'>
            <FcExport className='text-2xl' />
            <span className='text-[20px] text-red-500 font-bold leading-5'>Salir</span>
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
