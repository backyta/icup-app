import { useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { TabsCardMember } from '@/components';

// TODO : Hacer if, hombre eo mujer, Recibir props y colocar la data de nombres lugar y cargo e imagen
export function MemberInfoItem(): JSX.Element {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <div className='flex justify-between'>
        <CardContent className='flex gap-1 '>
          <Avatar className='p-1'>
            <AvatarImage
              className='rounded-full w-10'
              src='https://github.com/shadcn.png'
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <p className='text-sm sm:text-base font-bold'>
              Kevin Michael Baca Angeles
            </p>
            <p className='text-[12px] sm:text-[14px] ml-2'>
              Lima - Independencia
            </p>
          </div>
        </CardContent>
        <div className='px-2 pt-0 pb-2 sm:p-6 sm:pt-0'>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className='text-[0.70rem] sm:text-sm xl:text-md lg:w-[7rem] xl:w-[8rem] 2xl:w-[10rem] '>
                Ver Miembro
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-[580px] w-full justify-center py-10'>
              <TabsCardMember />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-between'>
      <CardContent className='flex gap-1 '>
        <Avatar className='p-1'>
          <AvatarImage
            className='rounded-full w-10'
            src='https://github.com/shadcn.png'
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <p className='text-sm sm:text-base font-bold'>
            Kevin Michael Baca Angeles
          </p>
          <p className='text-[12px] sm:text-[14px] ml-2'>
            Lima - Independencia
          </p>
        </div>
      </CardContent>
      <div className='px-2 pt-0 pb-2 sm:p-6 sm:pt-0'>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className='text-[0.70rem] sm:text-sm xl:text-md lg:w-[7rem] xl:w-[8rem] 2xl:w-[10rem] '>
              Ver Miembro
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className='flex justify-center py-8 px-6'>
              <TabsCardMember />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
