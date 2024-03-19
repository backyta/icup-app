/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { FormMember, FormFamilyHouse, FormOffering, FormUser } from '.';

// TODO : mover este delete CARD y form member a otra carpeta de componente - delete-card

// NOTE : hacer el modal de consulta si esta seguro de eliminar ye explicar que se pasara a inactivo
// NOTE : cuando se haga click se enviara solicitud de delete con el id sacado del contexto o de la
// NOTE : linea a la que se apunta.

// TODO : solo hacer el modal y al hacer click simular envió.

export const DeleteCard = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleContainerClose = (): void => {
    setOpen(false);
  };

  const currentPath = window.location.pathname;

  if (isDesktop) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className='w-full text-[14px] disabled:bg-slate-500 disabled:text-white bg-red-400 text-red-700 hover:text-white hover:bg-red-500'>
            Eliminar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className='h-auto'>
            <AlertDialogTitle className='text-yellow-500 font-bold text-xl text-center'>
              ¿Estas seguro de eliminar a este discípulo?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span className='text-blue-500 font-medium mb-2 inline-block text-[15px]'>
                Sucederá lo siguiente:
              </span>
              <br />
              <span className='inline-block mb-2'>
                ❌ El registro de este discípulo se colocara en estado{' '}
                <span className='font-bold'>INACTIVO.</span>
              </span>
              <span className='inline-block mb-2'>
                ❌ El registro de este discípulo de eliminara de los lugares
                donde guardaba relación con Casa Familiar, Pastor, Co-Pastor,
                Predicador o Supervisor.
              </span>
              <span className='inline-block mb-2'>
                ℹ Para poder activarlo nuevamente deberá hacerlo desde la
                pestaña de Actualizar Discípulo.
              </span>
              <br />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='bg-red-500 text-red-950 hover:bg-red-400 dark:hover:text-red-950'>
              No, cancelar
            </AlertDialogCancel>
            <AlertDialogAction className='bg-green-500 text-green-950 hover:bg-green-400 '>
              {/* Colocar función que envié la solicitud al backend onClick */}
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
        {(currentPath === '/disciples/delete-disciple' ||
          currentPath === '/pastors/delete-pastor' ||
          currentPath === '/copastors/delete-copastor' ||
          currentPath === '/leaders/delete-leader') && (
          <FormMember onSubmit={handleContainerClose} />
        )}

        {currentPath === '/family-houses/delete-family-house' && (
          <FormFamilyHouse onSubmit={handleContainerClose} />
        )}

        {currentPath === '/offerings/delete-offering' && (
          <FormOffering onSubmit={handleContainerClose} />
        )}

        {currentPath === '/users/delete-user' && (
          <FormUser onSubmit={handleContainerClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};
