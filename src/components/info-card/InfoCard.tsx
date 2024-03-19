/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import {
  TabsCardMember,
  TabsCardUser,
  TabsCardOffering,
  TabsCardFamilyHome,
} from '.';

export const InfoCard = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const currentPath = window.location.pathname;

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
          {(currentPath === '/disciples/search-disciples' ||
            currentPath === '/disciples/search-by-term-disciples' ||
            currentPath === '/disciples/update-disciple' ||
            currentPath === '/disciples/delete-disciple' ||
            currentPath === '/pastors/search-pastors' ||
            currentPath === '/pastors/search-by-term-pastors' ||
            currentPath === '/pastors/update-pastor' ||
            currentPath === '/pastors/delete-pastor' ||
            currentPath === '/copastors/search-copastors' ||
            currentPath === '/copastors/search-by-term-copastors' ||
            currentPath === '/copastors/update-copastor' ||
            currentPath === '/copastors/delete-copastor' ||
            currentPath === '/leaders/search-leaders' ||
            currentPath === '/leaders/search-by-term-leaders' ||
            currentPath === '/leaders/update-leader' ||
            currentPath === '/leaders/delete-leader') && <TabsCardMember />}

          {(currentPath === '/family-houses/search-family-houses' ||
            currentPath === '/family-houses/search-by-term-family-houses' ||
            currentPath === '/family-houses/update-family-house') && (
            <TabsCardFamilyHome />
          )}

          {(currentPath === '/offerings/search-offerings' ||
            currentPath === '/offerings/search-by-term-offerings' ||
            currentPath === '/offerings/update-offering') && (
            <TabsCardOffering />
          )}

          {(currentPath === '/users/search-users' ||
            currentPath === '/users/search-by-term-users' ||
            currentPath === '/users/update-user') && <TabsCardUser />}
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
        <div className='flex justify-center py-8 px-6'>
          {(currentPath === '/disciples/search-disciples' ||
            currentPath === '/disciples/search-by-term-disciples' ||
            currentPath === '/disciples/update-disciple' ||
            currentPath === '/pastors/search-pastors' ||
            currentPath === '/pastors/search-by-term-pastors' ||
            currentPath === '/copastors/search-by-term-copastors' ||
            currentPath === '/leaders/search-leaders' ||
            currentPath === '/leaders/search-by-term-leaders') && (
            <TabsCardMember />
          )}

          {(currentPath === '/family-houses/search-family-houses' ||
            currentPath === '/family-houses/search-by-term-family-houses' ||
            currentPath === '/family-houses/update-family-house') && (
            <TabsCardFamilyHome />
          )}

          {(currentPath === '/offerings/search-offerings' ||
            currentPath === '/offerings/search-by-term-offerings' ||
            currentPath === '/offerings/update-offering') && (
            <TabsCardOffering />
          )}

          {(currentPath === '/users/search-users' ||
            currentPath === '/users/search-by-term-users' ||
            currentPath === '/users/update-user') && <TabsCardUser />}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
