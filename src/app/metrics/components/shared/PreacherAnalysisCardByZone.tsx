/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { Card } from '@/shared/components/ui/card';
import { useMediaQuery } from '@react-hook/media-query';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

import { cn } from '@/shared/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { chartFormValidationSchema } from '@/app/metrics/validations';
import { copastors } from '@/shared/data';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';

const dataSup1 = [
  {
    'zone-name': 'Zn-A',
    Varones: 3,
    Mujeres: 5,
    supervisor: 'Rolando Jimenez',
  },
  {
    'zone-name': 'Zn-B',
    Varones: 2,
    Mujeres: 6,
    supervisor: 'Maria Prado',
  },
  {
    'zone-name': 'Zn-C',
    Varones: 7,
    Mujeres: 4,
    supervisor: 'Marleny Torres',
  },
  {
    'zone-name': 'Zn-D',
    Varones: 3,
    Mujeres: 5,
    supervisor: 'Pamela Rojas',
  },
  {
    'zone-name': 'Zn-E',
    Varones: 5,
    Mujeres: 5,
    supervisor: 'Joel Carranza',
  },
  {
    'zone-name': 'Zn-F',
    Varones: 8,
    Mujeres: 4,
    supervisor: 'Jeremy Terrones',
  },
];

const dataSup2 = [
  {
    'zone-name': 'Zn-Alfa',
    Varones: 4,
    Mujeres: 4,
    supervisor: 'Celeste Majail',
  },
  {
    'zone-name': 'Zn-Beta',
    Varones: 2,
    Mujeres: 9,
    supervisor: 'Jhon Porras',
  },
  {
    'zone-name': 'Zn-Gamma',
    Varones: 1,
    Mujeres: 8,
    supervisor: 'Jeremy Terrones',
  },
  {
    'zone-name': 'Zn-Delta',
    Varones: 5,
    Mujeres: 3,
    supervisor: 'Pablo Conde',
  },
  {
    'zone-name': 'Zn-Épsilon',
    Varones: 4,
    Mujeres: 8,
    supervisor: 'Marcos Puente',
  },
];

const dataSup3 = [
  {
    'zone-name': 'Zn-Norte',
    Varones: 6,
    Mujeres: 4,
    supervisor: 'Luisa Julian',
  },
  {
    'zone-name': 'Zn-Sur',
    Varones: 2,
    Mujeres: 6,
    supervisor: 'Nery Calles',
  },
  {
    'zone-name': 'Zn-Este',
    Varones: 3,
    Mujeres: 8,
    supervisor: 'Felix Fiestas',
  },
  {
    'zone-name': 'Zn-Oeste',
    Varones: 5,
    Mujeres: 5,
    supervisor: 'Brian Martinez',
  },
];

//* Functions
const toPercent = (decimal: any, fixed: number = 0): string => `${(decimal * 100).toFixed(0)}%`;

const getPercent = (value: any, total: any): string => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 0);
};

const renderTooltipContent = (o: any): JSX.Element => {
  const { payload, label } = o;

  const total = payload.reduce((result: any, entry: any) => result + entry.value, 0);

  return (
    <div className='bg-white p-2 text-black font-normal'>
      <p className='total'>{`${label} (Total: ${total})`}</p>
      <p className='zone'>{`Sup: ${payload[1]?.payload?.supervisor}`}</p>
      <ul className='list'>
        {payload.map((entry: any, index: any) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const PreacherAnalysisCardByZone = (): JSX.Element => {
  //* States
  const [isInputSearchZoneOpen, setIsInputSearchZoneOpen] = useState<boolean>(false);
  const [dataResult, setDataResult] = useState<any[]>([]);

  // * Media Queries Library hooks
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isDesktopLG = useMediaQuery('(min-width: 1024px)');
  const isDesktopXL = useMediaQuery('(min-width: 1280px)');

  //* Form
  const form = useForm<z.infer<typeof chartFormValidationSchema>>({
    resolver: zodResolver(chartFormValidationSchema),
    mode: 'onChange',
    defaultValues: {
      all: false,
      copastor: '',
    },
  });

  //* Form handler
  const handleSubmit = (values: z.infer<typeof chartFormValidationSchema>): void => {
    console.log({ values });
  };

  //* Watchers
  const copastor = form.watch('copastor');
  const all = form.watch('all');

  //* Effects
  useEffect(() => {
    if (copastor === 'id2') {
      setDataResult(dataSup2);
    }
    if (copastor === 'id3') {
      setDataResult(dataSup3);
    }

    if (copastor === 'id1') {
      setDataResult(dataSup1);
    }

    if (!copastor) {
      setDataResult(dataSup1);
    }

    if (all) {
      setDataResult([...dataSup1, ...dataSup2, ...dataSup3]);
    }
  }, [copastor, all]);

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-2 col-end-3 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 xl:px-3 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Predicadores (zona)
        </h3>
        <Form {...form}>
          <form className='flex'>
            <FormField
              control={form.control}
              name='copastor'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover open={isInputSearchZoneOpen} onOpenChange={setIsInputSearchZoneOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={all}
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-center px-2',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-4'
                            )}
                          >
                            {field.value
                              ? copastors.find((copastor) => copastor.value === field.value)?.label
                              : 'Elige un co-pastor'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un co-pastor...'
                            className='h-9 text-[14px]'
                          />
                          <CommandEmpty>Co-pastor no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {copastors.map((copastor) => (
                              <CommandItem
                                className='text-[14px]'
                                value={copastor.label}
                                key={copastor.value}
                                onSelect={() => {
                                  form.setValue('copastor', copastor.value);
                                  form.handleSubmit(handleSubmit)();
                                  setIsInputSearchZoneOpen(false);
                                }}
                              >
                                {copastor.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    copastor.value === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='all'
              render={({ field }) => (
                <FormItem className='flex flex-row items-end space-x-3 space-y-0 rounded-md border p-3 h-[2.5rem]'>
                  <FormControl>
                    <Checkbox
                      checked={field?.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        checked && form.resetField('copastor');
                        checked && form.handleSubmit(handleSubmit)();
                      }}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel className='text-[13px] md:text-[14px]'>Todos</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <ResponsiveContainer
        width='100%'
        height={
          isDesktop && !isDesktopLG
            ? '100%'
            : isDesktopLG && !isDesktopXL
              ? '90%'
              : isDesktopXL
                ? '100%'
                : '100%'
        }
      >
        <AreaChart
          width={500}
          height={400}
          data={dataResult}
          stackOffset='expand'
          margin={{ top: 5, right: 30, left: -5, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#c8c8c8' />
          <XAxis dataKey='zone-name' />
          <YAxis tickFormatter={toPercent} />
          <Tooltip content={renderTooltipContent} />
          <Area type='monotone' dataKey='Varones' stackId='1' stroke='#e37b35' fill='#e37b35' />
          <Area type='monotone' dataKey='Mujeres' stackId='1' stroke='#bb5bf1' fill='#bb5bf1' />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
