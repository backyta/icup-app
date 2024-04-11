/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState } from 'react';

import { useMediaQuery } from '@react-hook/media-query';

import { OfferingFormUpdate } from '@/app/offering/components';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

export const OfferingUpdateCard = (): JSX.Element => {
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
            className='text-[12px] lg:text-[13px] w-full bg-orange-400 text-orange-800 hover:text-white hover:bg-orange-500'
          >
            Actualizar
          </Button>
        </DialogTrigger>

        <DialogContent className='md:max-w-[740px] lg:max-w-[960px] xl:max-w-[1060px] w-full max-h-full justify-center py-4 overflow-y-auto'>
          <OfferingFormUpdate onSubmit={handleContainerClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='text-[12px] lg:text-[13px]'>
          Actualizar
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-auto sm:max-w-[590px] w-full max-h-full justify-center pt-6 pb-4 px-8 overflow-y-auto'>
        <OfferingFormUpdate onSubmit={handleContainerClose} />
      </DialogContent>
    </Dialog>
  );
};
