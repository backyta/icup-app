import { useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { TabsCardFamilyHome } from '@/components';

// TODO : Hacer if, hombre eo mujer, Recibir props y colocar la data de nombres lugar y cargo e imagen
export function HouseInfoItem(): JSX.Element {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <div className='flex justify-between'>
        <CardContent className='flex gap-1'>
          <Avatar className='p-1'>
            <AvatarImage
              className='rounded-full w-10'
              src='https://github.com/shadcn.png'
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <p className='text-sm sm:text-base font-bold'>
              Guardianes de la Palabra
            </p>
            <div className='p-1'>
              <div className='flex gap-5'>
                <p className='text-[12px] sm:text-[14px] font-normal'>
                  <span className='font-bold'>Código:</span> C-2
                </p>
                <p className='text-[12px] sm:text-[14px] font-normal'>
                  <span className='font-bold'>Miembros: </span> 10
                </p>
              </div>
              <p className='text-[12px] sm:text-[14px] font-normal'>
                <span className='font-bold'>Líder:</span> Pamela Chillon
              </p>
            </div>
          </div>
        </CardContent>
        <div className='px-2 pt-0 pb-2 sm:p-6 sm:pt-0'>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className='text-[0.7rem] sm:text-sm w-[6.5rem] sm:w-[8rem] lg:w-[7.8rem] xl:w-[8rem] 2xl:w-[10rem] 2xl:text-md'>
                Ver Casa Familiar
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-[580px] w-full justify-center py-10'>
              <TabsCardFamilyHome />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-between'>
      <CardContent className='flex gap-1'>
        <Avatar className='p-1'>
          <AvatarImage
            className='rounded-full w-10'
            src='https://github.com/shadcn.png'
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <p className='text-sm sm:text-base font-bold'>
            Guardianes de la Palabra
          </p>
          <div className='p-1'>
            <div className='flex gap-5'>
              <p className='text-[12px] sm:text-[14px] font-normal'>
                <span className='font-bold'>Código:</span> C-2
              </p>
              <p className='text-[12px] sm:text-[14px] font-normal'>
                <span className='font-bold'>Miembros: </span> 10
              </p>
            </div>
            <p className='text-[12px] sm:text-[14px] font-normal'>
              <span className='font-bold'>Líder:</span> Pamela Chillon
            </p>
          </div>
        </div>
      </CardContent>
      <div className='px-2 pt-0 pb-2 sm:p-6 sm:pt-0'>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className='text-[0.7rem] sm:text-sm w-[6.5rem] sm:w-[8rem] lg:w-[7.8rem] xl:w-[8rem] 2xl:w-[10rem] 2xl:text-md'>
              Ver Casa Familiar
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className='flex justify-center py-8 px-6'>
              <TabsCardFamilyHome />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
