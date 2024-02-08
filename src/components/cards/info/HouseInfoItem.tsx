import { CardContent } from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '../../ui/button';

export function HouseInfoItem(): JSX.Element {
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
        <Button className='text-[0.7rem] sm:text-sm w-[6.5rem] sm:w-[8rem] lg:w-[7.8rem] xl:w-[8rem] 2xl:w-[10rem] 2xl:text-md'>
          Ver Casa Familiar
        </Button>
      </div>
    </div>
  );
}

// TODO : Hacer if, hombre eo mujer, Recibir props y colocar la data de nombres lugar y cargo.
