import { CardContent } from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '../../ui/button';

export function MemberInfoItem(): JSX.Element {
  return (
    <div className='flex justify-between'>
      <CardContent className='flex gap-1 '>
        <Avatar className='p-1'>
          <AvatarImage
            className='rounded-full w-10'
            src='https://github.com/shadcn.png'
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <p className='text-sm sm:text-base font-bold'>
            Kevin Michael Baca Angeles
          </p>
          <p className='text-[12px] sm:text-[14px] ml-2'>
            Lima - Independencia
          </p>
        </div>
      </CardContent>
      <div className='px-2 pt-0 pb-2 sm:p-6 sm:pt-0'>
        <Button className='text-[0.70rem] sm:text-sm xl:text-md lg:w-[7rem] xl:w-[8rem] 2xl:w-[10rem] '>
          Ver Miembro
        </Button>
      </div>
    </div>
  );
}

// TODO : Hacer if, hombre eo mujer, Recibir props y colocar la data de nombres lugar y cargo.
