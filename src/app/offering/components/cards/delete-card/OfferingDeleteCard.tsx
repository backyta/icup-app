/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { MdDeleteForever } from 'react-icons/md';

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
} from '@/shared/components/ui/alert-dialog';
import { Button } from '@/shared/components/ui/button';

// NOTE : podría usar zustand para tomar el estado del id del estado global y eliminar y tmb
// NOTE : tomaría el onDelete

export const OfferingDeleteCard = (): JSX.Element => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='mt-2 mr-4 py-2 px-1 h-[2rem] bg-red-400 text-white hover:bg-red-500 hover:text-red-950  dark:text-red-950 dark:hover:bg-red-500 dark:hover:text-white'>
          <MdDeleteForever className='w-8 h-[1.65rem]' />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className='h-auto'>
          <AlertDialogTitle className='text-yellow-500 font-bold text-xl text-center'>
            ¿Estas seguro de eliminar esta Ofrenda?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className='text-blue-500 font-medium mb-2 inline-block text-[15px]'>Sucederá lo siguiente:</span>
            <br />
            <span className='inline-block mb-2'>
              ❌ El registro de esta Ofrenda se colocara en estado <span className='font-bold'>INACTIVO.</span>
            </span>
            <span className='inline-block mb-2'>
              ❌ El registro de esta Ofrenda se eliminara de los lugares donde guardaba relación con Casa Familiar,
              Pastor, Co-Pastor, Predicador o Supervisor.
            </span>
            <span className='inline-block mb-2'>
              ℹ Para poder activarla nuevamente deberá hacerlo desde la pestaña de Actualizar Ofrenda.
            </span>
            <br />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-red-500 text-red-950 hover:bg-red-500 hover:text-white'>
            No, cancelar
          </AlertDialogCancel>
          <AlertDialogAction className='bg-green-500 text-green-950 hover:bg-green-500 hover:text-white'>
            {/* Colocar función que envié la solicitud al backend onClick */}
            Sí, eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
