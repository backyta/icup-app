/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { useEffect, useState } from 'react';

import { MdDeleteForever } from 'react-icons/md';

import { usePreacherDeletionMutation } from '@/modules/preacher/hooks';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

interface PreacherDeleteCardProps {
  idRow: string;
}

export const PreacherDeleteCard = ({ idRow }: PreacherDeleteCardProps): JSX.Element => {
  //* States
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  //* Effects
  useEffect(() => {
    const originalUrl = window.location.href;

    if (idRow && isCardOpen) {
      const url = new URL(window.location.href);
      url.pathname = `/preachers/delete/${idRow}/remove`;

      window.history.replaceState({}, '', url);

      return () => {
        window.history.replaceState({}, '', originalUrl);
      };
    }
  }, [idRow, isCardOpen]);

  //* Custom hooks
  const preacherDeletionMutation = usePreacherDeletionMutation({
    setIsCardOpen,
    setIsButtonDisabled,
  });

  return (
    <Dialog open={isCardOpen} onOpenChange={setIsCardOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setIsButtonDisabled(false);
          }}
          className='mt-2 py-2 px-1 h-[2rem] bg-red-400 text-white hover:bg-red-500 hover:text-red-950  dark:text-red-950 dark:hover:bg-red-500 dark:hover:text-white'
        >
          <MdDeleteForever className='w-8 h-[1.65rem]' />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[23rem] sm:w-[25rem] md:w-full'>
        <div className='h-auto'>
          <h2 className='text-yellow-500 font-bold text-xl text-center md:text-[25px] pb-2'>
            ¿Estas seguro de eliminar a este Predicador?
          </h2>
          <p>
            <span className='text-blue-500 font-bold mb-3 inline-block text-[16px] md:text-[18px]'>
              Luego de eliminar sucederá lo siguiente:
            </span>
            <br />
            <span className='inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro de este Predicador se colocara en estado{' '}
              <span className='font-bold'>INACTIVO.</span>
            </span>
            <span className='inline-block text-[14px] md:text-[15px]'>
              ❌ El registro de este Predicador se eliminara de los lugares donde guardaba relación
              con Discípulo y Grupo Familiar.
            </span>
            <span className='inline-block mb-2 text-[14px] md:text-[15px]'>
              ✅ Para poder activarlo nuevamente deberá hacerlo desde la pestaña de{' '}
              <span className='font-bold'>Actualizar Predicador.</span>
            </span>
            <br />
          </p>
        </div>

        <div className='flex justify-center md:justify-end gap-x-4'>
          <Button
            disabled={isButtonDisabled}
            className='w-full md:w-auto bg-red-500 text-red-950 hover:bg-red-500 hover:text-white text-[14px]'
            onClick={() => {
              setIsCardOpen(false);
            }}
          >
            No, cancelar
          </Button>
          <Button
            disabled={isButtonDisabled}
            onClick={() => {
              setIsButtonDisabled(true);
              preacherDeletionMutation.mutate(idRow);
            }}
            className='w-full md:w-auto bg-green-500 text-green-950 hover:bg-green-500 hover:text-white text-[14px]'
          >
            Sí, eliminar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
