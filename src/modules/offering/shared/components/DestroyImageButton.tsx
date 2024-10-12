/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

import { cn } from '@/shared/lib/utils';

import { Button } from '@/shared/components/ui/button';

import { type OfferingFileType } from '@/modules/offering/shared/enums';
import { useImageDeletionMutation } from '@/modules/offering/shared/hooks';
import { extractPath, extractPublicId } from '@/modules/offering/shared/helpers';

import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

interface ButtonDestroyProps {
  fileType: OfferingFileType;
  secureUrl: string;
  isDeleteFileButtonDisabled: boolean;
  removeCloudFile: (name: any) => void;
}

export const DestroyImageButton = ({
  fileType,
  secureUrl,
  removeCloudFile,
  isDeleteFileButtonDisabled,
}: ButtonDestroyProps): JSX.Element => {
  //* States
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  //* Custom hooks
  const imageDeletionMutation = useImageDeletionMutation({
    setIsCardOpen,
    setIsButtonDisabled,
  });

  return (
    <Dialog open={isCardOpen} onOpenChange={setIsCardOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isDeleteFileButtonDisabled}
          onClick={() => {
            setIsButtonDisabled(false);
          }}
          className='border-none p-0 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 dark:hover:bg-slate-950 hover:bg-white'
        >
          <TiDeleteOutline className='w-8 h-8 p-0  rounded-full fill-red-500 dark:hover:bg-white hover:bg-slate-200' />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[23rem] sm:w-[25rem] md:w-full'>
        <div className='h-auto'>
          <h2 className='text-yellow-500 font-bold text-xl text-center md:text-[25px] pb-3 flex flex-col'>
            <span>¿Estas seguro de eliminar a esta imagen?</span>
          </h2>
          <p>
            <span className='text-green-500 font-bold mb-1 inline-block text-[15px] md:text-[17px]'>
              Recomendaciones
            </span>
            <br />
            <span className='inline-block mb-2 text-[14px] md:text-[15px]'>
              ✅ Para mayor seguridad, descarga la imagen y guárdala como respaldo.
            </span>
            <span className='inline-block text-[14px] md:text-[15px]'>
              ✅ Consulta con el administrador del sistema antes de ejecutar esta acción.
            </span>

            <span className='text-red-500 font-bold mt-1 mb-1 inline-block text-[15px] md:text-[17px]'>
              Consideraciones
            </span>
            <br />
            <span className='inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ Esta imagen se borrara del alojamiento en la nube y del registro de la ofrenda.
            </span>
            <span className='inline-block mb-2 text-[14px] md:text-[15px]'>
              ❌ No se podrá recuperar esta imagen después de ejecutar esta acción.
            </span>

            <br />
            <span className='text-blue-500 font-bold inline-block mt-1 mb-1 text-[10.5px] md:text-[12.5px]'>
              ☑ Nota: Al finalizar esta acción puedes seguir editando el formulario.
            </span>
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
            onClick={async () => {
              setIsButtonDisabled(true);
              await imageDeletionMutation.mutateAsync({
                publicId: extractPublicId(secureUrl),
                path: extractPath(secureUrl),
                fileType,
                secureUrl,
              });
              removeCloudFile(secureUrl);
            }}
            className={cn(
              'w-full md:w-auto bg-green-500 text-green-950 hover:bg-green-500 hover:text-white text-[14px]',
              imageDeletionMutation?.isPending &&
                'bg-emerald-500 disabled:opacity-100 disabled:md:text-[14.5px] text-white'
            )}
          >
            {imageDeletionMutation?.isPending ? 'Procesando...' : 'Sí, eliminar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
