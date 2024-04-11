/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState } from 'react';

import { MdDeleteForever } from 'react-icons/md';
import { Toaster, toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

// NOTE : podría usar zustand para tomar el estado del id del estado global y eliminar y tmb
// NOTE : tomaría el onDelete

export const FamilyHouseDeleteCard = (): JSX.Element => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

  return (
    <Dialog open={isCardOpen} onOpenChange={setIsCardOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setIsButtonsDisabled(false);
          }}
          className='mt-2 lg:-ml-3 xl:-ml-4 2xl:-ml-6 mr-4 py-2 px-1 h-[2rem] bg-red-400 text-white hover:bg-red-500 hover:text-red-950  dark:text-red-950 dark:hover:bg-red-500 dark:hover:text-white'
        >
          <MdDeleteForever className='w-8 h-[1.65rem]' />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[23rem] sm:w-[25rem] md:w-full'>
        <div className='h-auto'>
          <h2 className='text-yellow-500 font-bold text-xl text-center md:text-[25px] pb-2'>
            ¿Estas seguro de eliminar a este Casa Familiar?
          </h2>
          <p>
            <span className='w-full text-left text-blue-500 font-medium mb-3 inline-block text-[16px] md:text-[18px]'>
              Sucederá lo siguiente:
            </span>
            <br />
            <span className='w-full text-left inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro de esta Casa Familiar se colocara en estado{' '}
              <span className='font-bold'>INACTIVO.</span>
            </span>
            <span className='w-full text-left inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro de esta Casa Familiar se eliminara de los lugares donde guardaba
              relación con Discípulo, Predicador, Supervisor, Co-Pastor o Pastor.
            </span>
            <span className='w-full text-left inline-block mb-2 text-[14px] md:text-[15px]'>
              ✅ Para poder activarla nuevamente deberá hacerlo desde la pestaña de{' '}
              <span className='font-bold'>Actualizar Casa Familiar.</span>
            </span>
            <br />
          </p>
        </div>
        <div className='flex justify-end gap-x-4'>
          <Toaster position='top-center' richColors />
          <Button
            disabled={isButtonsDisabled}
            className='bg-red-500 text-red-950 hover:bg-red-500 hover:text-white text-[14px]'
          >
            No, cancelar
          </Button>
          <Button
            disabled={isButtonsDisabled}
            onClick={() => {
              // TODO : agregar promesa cuando se consulte hacer timer y luego mostrar toast (fetch real)
              toast.success('Registro eliminado exitosamente', {
                position: 'top-center',
                className: 'justify-center',
              });
              setIsButtonsDisabled(true);

              setTimeout(() => {
                setIsCardOpen(false);
              }, 1300);
            }}
            className='bg-green-500 text-green-950 hover:bg-green-500 hover:text-white text-[14px]'
          >
            {/* Colocar función que envié la solicitud al backend onClick */}
            Sí, eliminar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
