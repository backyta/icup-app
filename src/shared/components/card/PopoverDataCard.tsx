/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { cn } from '@/shared/lib/utils';

import { getInitialFullNames } from '@/shared/helpers/get-full-names.helper';

import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

import {
  type Zone,
  type Anexe,
  type Pastor,
  type Copastor,
  type Disciple,
  type Preacher,
  type Supervisor,
  type FamilyGroup,
} from '@/shared/interfaces/relations-response.interface';

export type AllowedTypes =
  | Anexe[]
  | Pastor[]
  | Copastor[]
  | Supervisor[]
  | Zone[]
  | Preacher[]
  | FamilyGroup[]
  | Disciple[];

interface PopoverDataProps {
  data: AllowedTypes | undefined;
  title: string;
  moduleName: string;
  firstValue: string;
  secondValue: string;
}

export const PopoverDataCard = ({
  data,
  title,
  moduleName,
  firstValue,
  secondValue,
}: PopoverDataProps): JSX.Element => {
  const needsScroll =
    ['Discípulos', 'Grupos Fam.', 'Predicadores'].includes(title) && data && data.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='px-2 py-0 text-[13.5px] md:text-[13.5px]' variant='outline'>
          Ver más
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-auto', needsScroll ? 'h-[11rem] overflow-y-auto' : 'h-auto')}
      >
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium text-[15px] md:text-[15px] leading-none'>{title}</h4>
            <p className='text-[14px] md:text-[14px] text-muted-foreground'>
              {title} que pertenecen a este {moduleName}.
            </p>
          </div>
          <ul
            className={cn(
              'grid grid-cols-2 text-[14px] md:text-[14px] pl-6 gap-2 gap-x-8 list-disc',
              title === 'Anexos' && 'grid-cols-1'
            )}
          >
            {data?.map((element: any) => {
              const key = element?.id;
              const displayValue =
                title === 'Anexos' || title === 'Zonas' || title === 'Grupos Fam.'
                  ? `${element?.[firstValue]} - ${element?.[secondValue]}`
                  : getInitialFullNames({
                      firstNames: element?.[firstValue] ?? '',
                      lastNames: element?.[secondValue] ?? '',
                    });

              return (
                <li key={key} className=''>
                  {displayValue}
                </li>
              );
            })}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// TODO: CAMBIAR LOS key={index}
