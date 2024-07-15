/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { FcExport, FcBusinessman, FcBusinesswoman } from 'react-icons/fc';

import { SideMenuItem } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/shared/components/ui/sheet';

import { useAuthStore } from '@/stores';
import { menuItems } from '@/shared/data';

export function DropdownMenuLeft(): JSX.Element {
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const userNames = useAuthStore((state) => state.user?.firstName ?? 'No User');
  const userLastNames = useAuthStore((state) => state.user?.lastName ?? 'No User');
  const gender = useAuthStore((state) => state.user?.gender ?? undefined);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          id='button'
          type='button'
          className='bg-slate-900 border border-white text-white hover:bg-slate-800 hover:text-white px-1 py-0 md:absolute mr-3 md:mr-0 md:left-[5.4rem] md:top-[11rem] md:rounded-full'
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
          <div id='logo' className='py-1 text-center'>
            <a href='/dashboard' className='inline-flex gap-x-6 items-center justify-center'>
              <h1 className='text-[1.85rem] font-bold font-dancing-script italic text-white'>
                ICUP - APP
              </h1>
              <span>
                <img
                  className='rounded-full w-[3rem] h-[3rem] md:w-[4.5rem] md:h-[4.5rem] text-white'
                  src='/src/assets/logo.png'
                  alt='logo-iglesia'
                />
              </span>
            </a>
            <p className='mt-2 text-md sm:w-[20rem] sm:mx-auto border-b border-slate-700 pb-2 text-white'>
              Panel administrativo, registros y consultas.
            </p>
          </div>

          <div id='profile' className='pb-2 md:pb-4 px-6 text-center md:pt-2'>
            <p className='text-lg text-white'>Bienvenido,</p>
            <div className='flex justify-center gap-2 items-center h-auto'>
              <span>
                {gender === 'male' ? (
                  <FcBusinessman className='rounded-full text-[3.3rem]' />
                ) : (
                  <FcBusinesswoman className='rounded-full text-[3.3rem]' />
                )}
              </span>

              <span className='text-md md:text-base font-medium text-white'>{`${userNames} ${userLastNames}`}</span>
            </div>
          </div>
        </SheetHeader>

        <nav
          id='menu'
          className='w-full px-10 flex flex-col items-center py-2 gap-y-[1rem] md:gap-y-[1.5rem]'
        >
          <div className='flex flex-col gap-y-2'>
            {menuItems.map((item) => (
              <SideMenuItem key={item.href} {...item} />
            ))}
          </div>

          {/* Logout */}
          <a onClick={logoutUser} className='flex w-full cursor-pointer text-center justify-center'>
            <FcExport className='text-2xl' />
            <span className='text-[20px] text-red-500 font-bold leading-5'>Salir</span>
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
