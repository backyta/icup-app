import { CardContent } from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '../../ui/button';

export function MemberInfoItem(): JSX.Element {
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
          <p className='font-bold'>Kevin Michael Baca Angeles</p>
          <p>Lima - Independencia</p>
        </div>
      </CardContent>
      <div className='p-6 pt-0'>
        <Button>Ver miembro</Button>
      </div>
    </div>
  );
}

// TODO : Hacer if, hombre eo mujer, Recibir props y colocar la data de nombres lugar y cargo.
