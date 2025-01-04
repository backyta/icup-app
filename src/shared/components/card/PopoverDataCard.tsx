/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { cn } from '@/shared/lib/utils';

import { getInitialFullNames } from '@/shared/helpers/get-full-names.helper';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';

import { Button } from '@/shared/components/ui/button';

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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='px-2 py-0 text-[13.5px] md:text-[13.5px]' variant='outline'>
          Ver más
        </Button>
      </DialogTrigger>

      <DialogContent className='flex flex-col w-[20rem] md:w-[24rem] h-auto overflow-y-auto rounded-lg p-5'>
        <div className='space-y-2'>
          <h4 className='text-teal-500 font-bold text-[16px] md:text-[16px] leading-none'>
            {title}
          </h4>
          <p className='text-[14px] md:text-[14px] text-muted-foreground'>
            {title} que pertenecen a este {moduleName}.
          </p>
        </div>

        <ul
          className={cn(
            'grid grid-cols-2 text-[14px] md:text-[14px] px-3 md:px-4 gap-2 gap-x-8 list-disc',
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

            return <li key={key}>{displayValue}</li>;
          })}
        </ul>
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
};
