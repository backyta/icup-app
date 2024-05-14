import { FcExport } from 'react-icons/fc';

import { SideMenuItem } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/shared/components/ui/sheet';

import { menuItems } from '@/shared/data';

export function DropdownMenuTop(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          id='button'
          type='button'
          className='bg-slate-900 text-white hover:bg-slate-600 hover:text-white p-2 mr-3'
          aria-controls='mobile-menu'
          aria-expanded='false'
        >
          <svg
            className='block h-7 w-7'
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
        </Button>
      </SheetTrigger>
      <SheetContent side={'top'} className='h-full'>
        <SheetHeader>
          {/* Title and sub-title */}
          <div id='logo' className='pt-3 pb-2 text-center'>
            <a href='/dashboard' className='inline-flex gap-x-6 items-center justify-center'>
              <h1 className='text-[2rem] font-bold italic text-white'>ICUP-App</h1>
              <span>
                {/* <img className='rounded-full w-14 h-14' src='../public/logo.jpg' alt='' /> */}
              </span>
            </a>
            <p className='mt-2 text-md sm:w-[20rem] sm:mx-auto border-b border-slate-700 pb-2 text-white '>
              Panel administrativo de la Iglesia.
            </p>
          </div>
          {/* Profile */}
          <div id='profile' className='pb-2 px-6  text-center'>
            <p className='text-xl text-white'>Bienvenido,</p>
            <div className='inline-flex space-x-2 items-center'>
              <span>
                <img className='rounded-full w-10 h-10' src='../public/men.png' alt='' />
              </span>

              <span className='text-md md:text-base font-bold text-white'>
                Pepito Jose Ramirez Gomez
              </span>
            </div>
          </div>
        </SheetHeader>
        <SheetClose asChild>
          <nav id='menu' className='w-full px-10 flex flex-col items-center py-4 gap-y-[1.5rem]'>
            <div className='flex flex-col gap-y-1'>
              {menuItems.map((item) => (
                <SideMenuItem key={item.href} {...item} />
              ))}
            </div>

            {/* Logout */}
            <a className='flex justify-center w-full sm:w-[20rem] m-auto'>
              <FcExport className='text-2xl' />
              <span className='text-lg text-red-500 font-bold leading-5'>Salir</span>
            </a>
          </nav>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
