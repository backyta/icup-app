/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { cn } from '@/shared/lib/utils';

import {
  type Zone,
  type Anexe,
  type Pastor,
  type Copastor,
  type Disciple,
  type Preacher,
  type Supervisor,
  type FamilyGroup,
} from '@/shared/interfaces';
import { getInitialFullNames } from '@/shared/helpers';

import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

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
        <Button className='px-2 py-0 text-[12.5px]' variant='outline'>
          Ver {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-auto', needsScroll ? 'h-[11rem] overflow-y-auto' : 'h-auto')}
      >
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium text-[13px] md:text-[15px] leading-none'>{title}</h4>
            <p className='text-[12px] md:text-[14px] text-muted-foreground'>
              {title} que pertenecen a este {moduleName}.
            </p>
          </div>
          <ul className='grid grid-cols-2 text-[12px] md:text-[14px] pl-6 gap-2 gap-x-8 list-disc'>
            {data?.map((element: any) => {
              const key = element?.id;
              const displayValue =
                title === 'Anexos' || title === 'Zonas' || title === 'Grupos Fam.'
                  ? element?.[firstValue]
                  : getInitialFullNames({
                      firstNames: element?.[firstValue],
                      lastNames: element?.[secondValue],
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
