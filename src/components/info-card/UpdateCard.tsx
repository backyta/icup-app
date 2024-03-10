/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import {
  TabsCardUser,
  TabsCardOffering,
  TabsCardFamilyHome,
  FormMember,
} from '.';

export const UpdateCard = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const currentPath = window.location.pathname;

  // TODO : hacer validacion de tipos y sub tipos.
  // TODO : lanzar aviso de validacion al promover con avisos (que pasara, se esta dejando casa tal o tal zona sin lider...)
  // TODO : marcar las casillas de rangos nuevos, deoendeindo si es miembro a preacher si es preacher a supervisor

  // TODO : replicar todos los update en los demas modulos
  // TODO : revisar y continuar a delete

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className='text-[12px] lg:text-[13px]'>
            Actualizar
          </Button>
        </DialogTrigger>

        <DialogContent className='md:max-w-[740px] lg:max-w-[900px] xl:max-w-[1030px] w-full max-h-full justify-center py-4 overflow-y-auto'>
          {(currentPath === '/disciples/update-disciple' ||
            currentPath === '/pastors/update-pastor' ||
            currentPath === '/copastors/update-copastor' ||
            currentPath === '/leaders/update-leader') && <FormMember />}

          {currentPath === '/family-houses/update-family-house' && (
            <TabsCardFamilyHome />
          )}

          {currentPath === '/offerings/update-offerings' && (
            <TabsCardOffering />
          )}

          {currentPath === '/users/update-users' && <TabsCardUser />}
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
        {(currentPath === '/disciples/update-disciple' ||
          currentPath === '/pastors/update-pastor' ||
          currentPath === '/copastors/update-copastor' ||
          currentPath === '/leaders/update-leader') && <FormMember />}

        {currentPath === '/family-houses/update-family-house' && (
          <TabsCardFamilyHome />
        )}

        {currentPath === '/offerings/update-offerings' && <TabsCardOffering />}

        {currentPath === '/users/update-users' && <TabsCardUser />}
      </DialogContent>
    </Dialog>
  );
};
