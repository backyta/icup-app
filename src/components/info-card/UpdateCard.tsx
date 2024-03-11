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

  // TODO : hacer validación de tipos y sub tipos. ✅
  // TODO : lanzar aviso de validación al promover con avisos (que pasara, se esta dejando casa tal o tal zona sin líder...)
  // TODO : al lanzar click sobre promover se envía el formulario con la data y cambiando los roles.

  // TODO : replicar todos los update en los demás módulos
  // TODO : revisar y continuar a delete

  // NOTE : traer información del back al presionar actualizar y se cargan todos los inputs
  // NOTE : los roles aparecerán llenos y desabilitados los demas (segun la info del back)
  // NOTE : Al escribir algo o modificar cualquier input, deshabilitar el boton de promover y lanzar alerta "primero modifica y guarda cambios para poder promover"
  // NOTE : Al promover lazar aviso de confirmacion y colocar a que se esta promoviendo y que sucedera.

  // NOTE : al subir de nivel por detras mandar la data tal cual, pero cambiando el rol de copastor a pastor por ejemplo
  // NOTE : el backend lo validara y actualizara en el sitema
  // NOTE : colocar el select de activo o inactivo si esta activo desabilitarlo o poner el true si esta inactivo habilitarlo

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
