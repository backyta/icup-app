/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Button } from '@/shared/components/ui/button';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';
import { cn } from '@/shared/lib/utils';
import { type ChurchResponse } from '@/modules/church/interfaces';

interface Props {
  churchId: string | undefined;
  setChurchId: React.Dispatch<React.SetStateAction<string | undefined>>;
  data: ChurchResponse[] | undefined;
}

export const SelectChurch = ({ churchId, setChurchId, data }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col items-center gap-1 justify-center'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-auto px-3 py-0 text-[12px] md:text-[14px]'
          >
            {churchId
              ? data?.find((church) => church.id === churchId)?.abbreviatedChurchName
              : 'ICUP - Central'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent align='center' className='w-auto px-4 py-2'>
          <Command>
            <CommandInput
              placeholder='Busque una iglesia'
              className='h-9 text-[12px] md:text-[14px]'
            />
            <CommandEmpty>Iglesia no encontrada.</CommandEmpty>
            <CommandGroup className='max-h-[100px] h-auto'>
              {data?.map((church) => (
                <CommandItem
                  className='text-[12px] md:text-[14px]'
                  value={church.abbreviatedChurchName}
                  key={church.id}
                  onSelect={() => {
                    setChurchId(church?.id);
                    setOpen(false);
                  }}
                >
                  {church.abbreviatedChurchName}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      church.id === churchId ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
