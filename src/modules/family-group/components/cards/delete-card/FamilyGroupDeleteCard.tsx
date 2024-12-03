/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useCallback, useEffect, useRef, useState } from 'react';

import { MdDeleteForever } from 'react-icons/md';

import { useFamilyGroupDeletionMutation } from '@/modules/family-group/hooks';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

interface FamilyGroupDeleteCardProps {
  idRow: string;
}

export const FamilyGroupDeleteCard = ({ idRow }: FamilyGroupDeleteCardProps): JSX.Element => {
  //* States
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const topRef = useRef<HTMLDivElement>(null);

  //* Effects
  useEffect(() => {
    const originalUrl = window.location.href;

    if (idRow && isCardOpen) {
      const url = new URL(window.location.href);
      url.pathname = `/family-groups/delete/${idRow}/remove`;

      window.history.replaceState({}, '', url);

      return () => {
        window.history.replaceState({}, '', originalUrl);
      };
    }
  }, [idRow, isCardOpen]);

  //* Functions
  const handleContainerScroll = useCallback((): void => {
    if (topRef.current !== null) {
      topRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  //* Custom hooks
  const familyGroupDeletionMutation = useFamilyGroupDeletionMutation({
    setIsCardOpen,
    setIsButtonDisabled,
    scrollToTop: handleContainerScroll,
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
      <DialogContent
        ref={topRef}
        className='w-[23rem] sm:w-[25rem] md:w-full max-h-full overflow-x-hidden overflow-y-auto'
      >
        <div className='h-auto'>
          <h2 className='text-yellow-500 font-bold text-xl text-center md:text-[25px] pb-3'>
            ¿Estas seguro de inactivar a este Grupo Familiar?
          </h2>
          <p>
            <span className='w-full text-left text-blue-500 font-bold mb-3 inline-block text-[16px] md:text-[18px]'>
              Luego de inactivar sucederá lo siguiente:
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
              ✅ Para poder activarla nuevamente deberá hacerlo desde el modulo{' '}
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
              familyGroupDeletionMutation.mutate(idRow);
            }}
            className='w-full md:w-auto bg-green-500 text-green-950 hover:bg-green-500 hover:text-white text-[14px]'
          >
            Sí, inactivar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
