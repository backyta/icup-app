/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useMediaQuery } from '@react-hook/media-query';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import { useState } from 'react';
import { TabsCardMember } from './TabsCardMember';
import { TabsCardFamilyHome } from './TabsCardFamilyHome';
import { TabsCardOffering } from './TabsCardOffering';
import { TabsCardUser } from './TabsCardUser';

export const InfoCard = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const currentPath = window.location.pathname;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className='text-[12px] lg:text-[13px]'>
            Ver Información
          </Button>
        </DialogTrigger>

        <DialogContent className='max-w-[580px] w-full justify-center py-10'>
          {(currentPath === '/disciples/search-disciples' ||
            currentPath === '/disciples/search-by-term-disciples' ||
            currentPath === '/pastors/search-pastors' ||
            currentPath === '/copastors/search-copastors' ||
            currentPath === '/leaders/search-leaders') && <TabsCardMember />}

          {currentPath === '/family-houses/search-family-houses' && (
            <TabsCardFamilyHome />
          )}

          {currentPath === '/offerings/search-offerings' && (
            <TabsCardOffering />
          )}

          {currentPath === '/users/search-users' && <TabsCardUser />}
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
      <DrawerContent className=''>
        <div className='flex justify-center py-8 px-6'>
          {(currentPath === '/disciples/search-disciples' ||
            currentPath === '/disciples/search-by-term-disciples' ||
            currentPath === '/pastors/search-pastors' ||
            currentPath === '/copastors/search-copastors' ||
            currentPath === '/leaders/search-leaders') && <TabsCardMember />}

          {currentPath === '/family-houses/search-family-houses' && (
            <TabsCardFamilyHome />
          )}

          {currentPath === '/offerings/search-offerings' && (
            <TabsCardOffering />
          )}

          {currentPath === '/users/search-users' && <TabsCardUser />}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
