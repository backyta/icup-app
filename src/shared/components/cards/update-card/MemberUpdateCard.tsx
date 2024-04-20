/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import { GiArchiveRegister } from 'react-icons/gi';

import { MemberFormUpdate } from '@/shared/components';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

export const MemberUpdateCard = (): JSX.Element => {
  //* States
  const [open, setOpen] = useState<boolean>(false);

  const topRef = useRef<HTMLDivElement>(null);

  //* Library hooks
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { pathname } = useLocation();

  //* Functions
  const handleContainerClose = (): void => {
    setOpen(false);
  };

  const handleContainerScroll = (): void => {
    console.log(topRef);
    if (topRef.current) {
      topRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='mt-2 lg:-ml-3 xl:-ml-4 2xl:-ml-6 mr-4 py-2 px-1 h-[2rem] bg-orange-400 text-white hover:bg-orange-500 hover:text-orange-950  dark:text-orange-950 dark:hover:bg-orange-500 dark:hover:text-white'
          >
            <GiArchiveRegister className='w-8 h-[1.65rem]' />
          </Button>
        </DialogTrigger>

        <DialogContent
          ref={topRef}
          className='md:max-w-[740px] lg:max-w-[1050px] xl:max-w-[1160px] w-full max-h-full justify-center pt-[0.9rem] pb-[1.3rem] overflow-y-auto overflow-x-hidden'
        >
          {(pathname === '/disciples/update-disciple' ||
            pathname === '/pastors/update-pastor' ||
            pathname === '/copastors/update-copastor' ||
            pathname === '/leaders/update-leader') && (
            <MemberFormUpdate onClose={handleContainerClose} onScroll={handleContainerScroll} />
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='mt-2 mr-4 py-2 px-1 h-[2rem] bg-orange-400 text-white hover:bg-orange-500 hover:text-orange-950  dark:text-orange-950 dark:hover:bg-orange-500 dark:hover:text-white'
        >
          <GiArchiveRegister className='w-8 h-[1.65rem]' />
        </Button>
      </DialogTrigger>

      <DialogContent
        ref={topRef}
        className='max-w-auto sm:max-w-[590px] w-full max-h-full justify-center pt-6 pb-4 px-8 overflow-y-auto overflow-x-hidden'
      >
        {(pathname === '/disciples/update-disciple' ||
          pathname === '/pastors/update-pastor' ||
          pathname === '/copastors/update-copastor' ||
          pathname === '/leaders/update-leader') && (
          <MemberFormUpdate onClose={handleContainerClose} onScroll={handleContainerScroll} />
        )}
      </DialogContent>
    </Dialog>
  );
};
