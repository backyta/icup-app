/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@react-hook/media-query';

import { cn } from '@/shared/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import {
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
} from 'recharts';

import { chartFormValidationSchema } from '@/app/metrics/validations';

import { months, years } from '@/shared/data';

import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';
import { zones } from '@/app/family-house/data';

const dataZoneAJanuary = [
  {
    'code-house': 'A-1',
    Semana1: 55.5,
    Semana2: 28.3,
    Semana3: 15.3,
    Semana4: 46.3,
    preacher: 'Felix Torres',
  },
  {
    'code-house': 'A-2',
    Semana1: 71.8,
    Semana2: 42.6,
    Semana3: 19.5,
    Semana4: 63.2,
    preacher: 'Johnathan Porras',
  },
  {
    'code-house': 'A-3',
    Semana1: 36.7,
    Semana2: 88.4,
    Semana3: 55.2,
    Semana4: 27.9,
    preacher: 'Marcelo Díaz',
  },
  {
    'code-house': 'A-4',
    Semana1: 49.3,
    Semana2: 17.8,
    Semana3: 81.6,
    Semana4: 39.7,
    preacher: 'Iris Fiestas',
  },
  {
    'code-house': 'A-5',
    Semana1: 93.2,
    Semana2: 62.1,
    Semana3: 74.8,
    Semana4: 48.9,
    preacher: 'Sofia Castillo',
  },
  {
    'code-house': 'A-6',
    Semana1: 15.9,
    Semana2: 73.4,
    Semana3: 28.6,
    Semana4: 82.3,
    preacher: 'Margarita Cruz',
  },
];

const dataZoneBJanuary = [
  {
    'code-house': 'B-1',
    Semana1: 58.1,
    Semana2: 35.2,
    Semana3: 67.9,
    Semana4: 16.4,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'B-2',
    Semana1: 24.6,
    Semana2: 46.8,
    Semana3: 39.2,
    Semana4: 55.7,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'B-3',
    Semana1: 87.3,
    Semana2: 59.7,
    Semana3: 45.1,
    Semana4: 71.6,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'B-4',
    Semana1: 41.5,
    Semana2: 81.9,
    Semana3: 53.7,
    Semana4: 38.2,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'B-5',
    Semana1: 76.2,
    Semana2: 28.5,
    Semana3: 62.4,
    Semana4: 49.8,
    preacher: 'Margarita Cruz',
  },
];

const dataZoneCJanuary = [
  {
    'code-house': 'C-1',
    Semana1: 52.8,
    Semana2: 37.1,
    Semana3: 14.6,
    Semana4: 64.3,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'C-2',
    Semana1: 67.4,
    Semana2: 49.2,
    Semana3: 76.8,
    Semana4: 23.5,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'C-3',
    Semana1: 34.9,
    Semana2: 56.3,
    Semana3: 82.1,
    Semana4: 42.7,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'C-4',
    Semana1: 89.5,
    Semana2: 64.7,
    Semana3: 37.9,
    Semana4: 58.2,
    preacher: 'Margarita Cruz',
  },
];

const dataZoneDJanuary = [
  {
    'code-house': 'D-1',
    Semana1: 45.2,
    Semana2: 73.6,
    Semana3: 51.4,
    Semana4: 19.8,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'D-2',
    Semana1: 55.5,
    Semana2: 28.3,
    Semana3: 15.3,
    Semana4: 46.3,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'D-3',
    Semana1: 38.2,
    Semana2: 56.4,
    Semana3: 44.7,
    Semana4: 73.1,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'D-4',
    Semana1: 76.5,
    Semana2: 42.9,
    Semana3: 89.3,
    Semana4: 31.7,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'D-5',
    Semana1: 57.3,
    Semana2: 38.6,
    Semana3: 75.2,
    Semana4: 21.4,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'D-6',
    Semana1: 82.1,
    Semana2: 29.8,
    Semana3: 46.5,
    Semana4: 63.7,
    preacher: 'Margarita Cruz',
  },
];

//* Functions
const renderTooltipContent = (o: any): JSX.Element => {
  const { payload, label } = o;

  return (
    <div className='bg-white p-2 text-black font-normal'>
      <p className=''>{`${label}`}</p>
      <p className=''>{`Pred: ${payload[1]?.payload?.preacher}`}</p>
      <p className='text-slate-500'>{`Sem1: ${payload[1]?.payload?.Semana1} soles`}</p>
      <p className='text-slate-500'>{`Sem2: ${payload[1]?.payload?.Semana2} soles`}</p>
      <p className='text-slate-500'>{`Sem3: ${payload[1]?.payload?.Semana3} soles`}</p>
      <p className='text-slate-500'>{`Sem4: ${payload[1]?.payload?.Semana4} soles`}</p>
      <ul className='list'>
        {payload.map((entry: any, index: any) =>
          entry.dataKey === 'Porcentaje' ? (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}%`}
            </li>
          ) : (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export const OfferingIncomeAnalysisCardByFamilyHouse = (): JSX.Element => {
  //* States
  const [isInputSearchMonthOpen, setIsInputSearchMonthOpen] = useState<boolean>(false);
  const [isInputSearchYearOpen, setIsInputSearchYearOpen] = useState<boolean>(false);
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
      month: 'january',
      year: '2024',
      zone: 'zone-1',
    },
  });

  //* Form handler
  const handleSubmit = (values: z.infer<typeof chartFormValidationSchema>): void => {
    console.log({ values });
  };

  //* Watchers
  const zone = form.watch('zone');
  const month = form.watch('month');
  const year = form.watch('year');

  //* Effects (solo hacer la request y setear la data que viene)
  useEffect(() => {
    if (zone === 'zone-2' && month === 'january') {
      setDataResult(dataZoneBJanuary);
    }
    if (zone === 'zone-3' && month === 'january') {
      setDataResult(dataZoneCJanuary);
    }
    if (zone === 'zone-4' && month === 'january') {
      setDataResult(dataZoneDJanuary);
    }
    if (zone === 'zone-1' && month === 'january') {
      setDataResult(dataZoneAJanuary);
    }
    if (zone === 'zone-1' && month === 'january') {
      setDataResult(dataZoneAJanuary);
    }
    if (!month) {
      setDataResult(dataZoneAJanuary);
    }
  }, [month, zone, year]);

  const totalFirstWeek = dataResult.reduce((total, item) => total + item.Semana1, 0);
  const totalSecondWeek = dataResult.reduce((total, item) => total + item.Semana2, 0);
  const totalThirdWeek = dataResult.reduce((total, item) => total + item.Semana3, 0);
  const totalFourthWeek = dataResult.reduce((total, item) => total + item.Semana4, 0);

  const allWeeks = totalFirstWeek + totalSecondWeek + totalThirdWeek + totalFourthWeek;

  const newData = dataResult.map((item) => ({
    ...item,
    Total: (item.Semana1 + item.Semana2 + item.Semana3 + item.Semana4).toFixed(1),
    Porcentaje: (
      ((item.Semana1 + item.Semana2 + item.Semana3 + item.Semana4) / allWeeks) *
      100
    ).toFixed(1),
  }));

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-2 col-end-3 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 xl:px-3 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Ofrendas Casas Familiares
        </h3>
        <Form {...form}>
          <form className='flex'>
            <FormField
              control={form.control}
              name='zone'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover open={isInputSearchZoneOpen} onOpenChange={setIsInputSearchZoneOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            // disabled={all}
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-center px-2',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-2'
                            )}
                          >
                            {field.value
                              ? zones.find((zone) => zone.value === field.value)?.label
                              : 'Elige una zona'}
                            <CaretSortIcon className='h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque una zona...'
                            className='h-9 text-[14px]'
                          />
                          <CommandEmpty>Zona no encontrada.</CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {zones.map((zone) => (
                              <CommandItem
                                className='text-[14px]'
                                value={zone.label}
                                key={zone.value}
                                onSelect={() => {
                                  form.setValue('zone', zone.value);
                                  zone && month && year && form.handleSubmit(handleSubmit)();
                                  setIsInputSearchZoneOpen(false);
                                }}
                              >
                                {zone.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    zone.value === field.value ? 'opacity-100' : 'opacity-0'
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
              name='month'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover
                      open={isInputSearchMonthOpen}
                      onOpenChange={(e) => {
                        setIsInputSearchMonthOpen(e);
                        form.resetField('year', {
                          defaultValue: '',
                        });
                      }}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-center px-2',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-2'
                            )}
                          >
                            {field.value
                              ? months.find((month) => month.value === field.value)?.label
                              : 'Mes'}
                            <CaretSortIcon className='h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un mes...'
                            className='h-9 text-[14px]'
                          />
                          <CommandEmpty>Mes no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[100px] h-auto'>
                            {months.map((month) => (
                              <CommandItem
                                className='text-[14px]'
                                value={month.label}
                                key={month.value}
                                onSelect={() => {
                                  form.setValue('month', month.value);
                                  zone && month && year && form.handleSubmit(handleSubmit)();
                                  setIsInputSearchMonthOpen(false);
                                }}
                              >
                                {month.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    month.value === field.value ? 'opacity-100' : 'opacity-0'
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
              name='year'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover
                      open={isInputSearchYearOpen}
                      onOpenChange={(e) => {
                        setIsInputSearchYearOpen(e);
                        !month &&
                          form.resetField('month', {
                            defaultValue: '',
                          });
                      }}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-center px-2',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-2'
                            )}
                          >
                            {field.value
                              ? years.find((year) => year.value === field.value)?.label
                              : 'Año'}
                            <CaretSortIcon className='h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un año...'
                            className='h-9 text-[14px]'
                          />
                          <CommandEmpty>Año no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[100px] h-auto'>
                            {years.map((year) => (
                              <CommandItem
                                className='text-[14px]'
                                value={year.label}
                                key={year.value}
                                onSelect={() => {
                                  form.setValue('year', year.value);
                                  zone && month && year && form.handleSubmit(handleSubmit)();
                                  setIsInputSearchYearOpen(false);
                                }}
                              >
                                {year.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    year.value === field.value ? 'opacity-100' : 'opacity-0'
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
          </form>
        </Form>
      </div>

      <ResponsiveContainer
        width='100%'
        height={
          isDesktop && !isDesktopLG
            ? '88%'
            : isDesktopLG && !isDesktopXL
              ? '90%'
              : isDesktopXL
                ? '100%'
                : '100%'
        }
      >
        <ComposedChart
          width={500}
          height={300}
          data={newData}
          margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='code-house' />
          <YAxis />
          <Tooltip content={renderTooltipContent} />
          <Legend />
          <Bar dataKey='Total' fill='#b950f2' />
          <Line type='linear' dataKey='Porcentaje' stroke='#ff7300' />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
