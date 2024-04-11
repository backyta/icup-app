/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';

import { FamilyHouseFormUpdate } from '@/app/family-house/components';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';
import { GiArchiveRegister } from 'react-icons/gi';

export const FamilyHouseUpdateCard = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleContainerClose = (): void => {
    setOpen(false);
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

        <div className=' scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-700'>
          <DialogContent className='md:max-w-[740px] lg:max-w-[1050px] xl:max-w-[1160px] w-full max-h-full justify-center pt-[0.9rem] pb-[1.3rem] overflow-x-hidden overflow-y-auto'>
            <FamilyHouseFormUpdate onSubmit={handleContainerClose} />
          </DialogContent>
        </div>
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

      <DialogContent className='max-w-auto sm:max-w-[590px] w-full max-h-full justify-center pt-6 pb-4 px-8 overflow-y-auto overflow-x-hidden'>
        <FamilyHouseFormUpdate onSubmit={handleContainerClose} />
      </DialogContent>
    </Dialog>
  );
};
