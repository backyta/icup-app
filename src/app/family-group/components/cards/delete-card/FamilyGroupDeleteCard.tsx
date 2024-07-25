/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteFamilyGroup } from '@/app/family-group/services';
import { type ErrorResponse } from '@/shared/interfaces';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

interface FamilyGroupDeleteCardProps {
  idRow: string;
}

// TODO : agregar una caja de texto con el motivo de eliminación bloquear el boton hasta que no lo coloque
export const FamilyGroupDeleteCard = ({ idRow }: FamilyGroupDeleteCardProps): JSX.Element => {
  //* States
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Effects
  useEffect(() => {
    const originalUrl = window.location.href;

    if (idRow && isCardOpen) {
      const url = new URL(window.location.href);
      url.pathname = `/family-groups/delete-family-group/${idRow}/remove`;

      window.history.replaceState({}, '', url);

      return () => {
        window.history.replaceState({}, '', originalUrl);
      };
    }
  }, [idRow, isCardOpen]);

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: deleteFamilyGroup,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          setIsCardOpen(false);
          setIsButtonDisabled(false);
        }, 2000);
      }

      if (error.message === 'Unauthorized') {
        toast.error('Operación rechazada, el token expiro ingresa nuevamente.', {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          navigate('/');
        }, 3500);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family-groups-by-term'] });

      toast.success('Registro eliminado correctamente.', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        setIsCardOpen(false);
      }, 2000);
    },
  });

  return (
    <Dialog open={isCardOpen} onOpenChange={setIsCardOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setIsButtonDisabled(false);
          }}
          className='mt-2 lg:-ml-5 xl:-ml-7 2xl:-ml-9 mr-4 py-2 px-1 h-[2rem] bg-red-400 text-white hover:bg-red-500 hover:text-red-950  dark:text-red-950 dark:hover:bg-red-500 dark:hover:text-white'
        >
          <MdDeleteForever className='w-8 h-[1.65rem]' />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[23rem] sm:w-[25rem] md:w-full'>
        <div className='h-auto'>
          <h2 className='text-yellow-500 font-bold text-xl text-center md:text-[25px] pb-2'>
            ¿Estas seguro de eliminar a este Grupo Familiar?
          </h2>
          <p>
            <span className='w-full text-left text-blue-500 font-bold mb-3 inline-block text-[16px] md:text-[18px]'>
              Luego de eliminar sucederá lo siguiente:
            </span>
            <br />
            <span className='w-full text-left inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro de esta Grupo Familiar se colocara en estado{' '}
              <span className='font-bold'>INACTIVO.</span>
            </span>
            <span className='w-full text-left inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ El registro de este Grupo Familiar se eliminara de los lugares donde guardaba
              relación con Discípulo, Predicador, Supervisor, Co-Pastor, Pastor e Iglesia.
            </span>
            <span className='w-full text-left inline-block mb-2 text-[14px] md:text-[15px]'>
              ✅ Para poder activarla nuevamente deberá hacerlo desde la pestaña de{' '}
              <span className='font-bold'>Actualizar Grupo Familiar.</span>
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
              mutation.mutate(idRow);
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
