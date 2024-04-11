/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState } from 'react';

import { useMediaQuery } from '@react-hook/media-query';

import { OfferingTabsCard } from '@/app/offering/components';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer';

export const OfferingInfoCard = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='text-[12px] lg:text-[13px] bg-blue-400 text-blue-950 hover:bg-blue-500 hover:text-white'
          >
            Ver Información
          </Button>
        </DialogTrigger>

        <DialogContent className='max-w-[580px] w-full justify-center py-10 max-h-full overflow-y-auto'>
          <OfferingTabsCard />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline' className='text-[12px] lg:text-[13px]'>
          Ver Información
        </Button>
      </DrawerTrigger>
      <DrawerContent className='max-h-full overflow-y-auto'>
        <OfferingTabsCard />
      </DrawerContent>
    </Drawer>
  );
};
