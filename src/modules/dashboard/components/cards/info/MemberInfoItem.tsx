import { useState } from 'react';

import { useMediaQuery } from '@react-hook/media-query';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { DiscipleTabsCard } from '@/modules/disciple/components';
import { type DiscipleResponse } from '@/modules/disciple/interfaces';

import { Button } from '@/shared/components/ui/button';
import { CardContent } from '@/shared/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer';

interface Props {
  data: DiscipleResponse;
}

export function MemberInfoItem({ data }: Props): JSX.Element {
  //* States
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <div className='flex justify-between'>
        <CardContent className='flex gap-1 '>
          <Avatar className='p-1'>
            <AvatarImage
              className='rounded-full w-10'
              src={data.gender === 'male' ? '/src/assets/boy.webp' : '/src/assets/girl.webp'}
            />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
          <div className='flex flex-col justify-center'>
            <p className='text-sm sm:text-base font-bold'>{`${data.firstName} ${data.lastName}`}</p>
            <p className='text-[12px] sm:text-[14px] ml-2'>{`${data.district} - ${data.urbanSector}`}</p>
          </div>
        </CardContent>
        <div className='px-2 pt-0 pb-2 sm:p-6 sm:pt-0'>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className='text-[12px] sm:text-sm xl:text-md lg:w-[7rem] xl:w-[8rem] 2xl:w-[10rem]'>
                Ver Discípulo
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-[690px] w-full justify-center py-6 max-h-full overflow-y-auto'>
              <DiscipleTabsCard data={data} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-between'>
      <CardContent className='flex gap-1 pl-2'>
        <Avatar className='p-1'>
          <AvatarImage
            className='rounded-full w-10'
            src={data.gender === 'male' ? '/src/assets/boy.png' : '/src/assets/girl.png'}
          />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <div className='flex flex-col justify-center'>
            <p className='text-sm sm:text-base font-bold'>{`${data.firstName} ${data.lastName}`}</p>
            <p className='text-[12px] sm:text-[14px] ml-2'>{`${data.district} - ${data.urbanSector}`}</p>
          </div>
        </div>
      </CardContent>
      <div className='px-2 pt-0 pb-2 pr-4 sm:p-6 sm:pt-0'>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className='text-[12px] sm:text-sm xl:text-md lg:w-[7rem] xl:w-[8rem] 2xl:w-[10rem] '>
              Ver Discípulo
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className='flex justify-center py-8 px-6 max-h-auto overflow-y-auto'>
              <DiscipleTabsCard data={data} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
