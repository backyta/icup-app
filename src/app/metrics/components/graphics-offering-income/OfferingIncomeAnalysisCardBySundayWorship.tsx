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

const dataJanuary = [
  {
    'date-offering': '07/01/24',
    Dia: 65.9,
    Tarde: 85.2,
  },
  {
    'date-offering': '14/01/24',
    Dia: 76.5,
    Tarde: 42.8,
  },
  {
    'date-offering': '21/01/24',
    Dia: 93.2,
    Tarde: 61.0,
  },
  {
    'date-offering': '28/01/24',
    Dia: 62.1,
    Tarde: 89.7,
  },
];

const dataFebruary = [
  {
    'date-offering': '04/02/24',
    Dia: 51.3,
    Tarde: 60,
  },
  {
    'date-offering': '11/02/24',
    Dia: 79.6,
    Tarde: 46.8,
  },
  {
    'date-offering': '18/02/24',
    Dia: 58.4,
    Tarde: 88.1,
  },
  {
    'date-offering': '25/02/24',
    Dia: 67.2,
    Tarde: 81.9,
  },
];

const dataMarch = [
  {
    'date-offering': '03/03/24',
    Dia: 79.2,
    Tarde: 88.3,
  },
  {
    'date-offering': '10/03/24',
    Dia: 85.5,
    Tarde: 53.7,
  },
  {
    'date-offering': '17/03/24',
    Dia: 73.1,
    Tarde: 91.9,
  },
  {
    'date-offering': '24/03/24',
    Dia: 62.8,
    Tarde: 88.6,
  },
  {
    'date-offering': '31/03/24',
    Dia: 52.8,
    Tarde: 66.2,
  },
];

const dataApril = [
  {
    'date-offering': '07/04/24',
    Dia: 70.3,
    Tarde: 82.1,
  },
  {
    'date-offering': '14/04/24',
    Dia: 78.9,
    Tarde: 67.5,
  },
  {
    'date-offering': '21/04/24',
    Dia: 65.2,
    Tarde: 75.8,
  },
  {
    'date-offering': '28/04/24',
    Dia: 83.4,
    Tarde: 72.6,
  },
];

const dataMay = [
  {
    'date-offering': '05/05/24',
    Dia: 75.6,
    Tarde: 79.8,
  },
  {
    'date-offering': '12/05/24',
    Dia: 68.7,
    Tarde: 88.4,
  },
  {
    'date-offering': '19/05/24',
    Dia: 82.3,
    Tarde: 71.2,
  },
  {
    'date-offering': '26/05/24',
    Dia: 76.9,
    Tarde: 85.3,
  },
];

//* Functions
const renderTooltipContent = (o: any): JSX.Element => {
  const { payload, label } = o;

  return (
    <div className='bg-white p-2 text-black font-normal'>
      <p className=''>{`${label}`}</p>
      <ul className='list'>
        {payload.map((entry: any, index: any) =>
          entry.dataKey === 'Porcentaje' ? (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}%`}
            </li>
          ) : (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} soles`}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export const OfferingIncomeAnalysisCardBySundayWorship = (): JSX.Element => {
  //* States
  const [isInputSearchMonthOpen, setIsInputSearchMonthOpen] = useState<boolean>(false);
  const [isInputSearchYearOpen, setIsInputSearchYearOpen] = useState<boolean>(false);
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
    },
  });

  //* Form handler
  const handleSubmit = (values: z.infer<typeof chartFormValidationSchema>): void => {
    console.log({ values });
  };

  //* Watchers
  const month = form.watch('month');
  const year = form.watch('year');

  //* Effects
  useEffect(() => {
    if (year === '2024' && month === 'february') {
      setDataResult(dataFebruary);
    }
    if (year === '2024' && month === 'march') {
      setDataResult(dataMarch);
    }
    if (year === '2024' && month === 'april') {
      setDataResult(dataApril);
    }
    if (year === '2024' && month === 'may') {
      setDataResult(dataMay);
    }
    if (year === '2024' && month === 'january') {
      setDataResult(dataJanuary);
    }
    if (!month) {
      setDataResult(dataJanuary);
    }
  }, [month, year]);

  const totalDay = dataResult.reduce((total, item) => total + item.Dia, 0);
  const totalAfternoon = dataResult.reduce((total, item) => total + item.Tarde, 0);
  const newData = dataResult.map((item) => ({
    ...item,
    Porcentaje: (((item.Dia + item.Tarde) / (totalDay + totalAfternoon)) * 100).toFixed(1),
  }));

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 xl:px-3 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Ofrendas Dominicales
        </h3>
        <Form {...form}>
          <form className='flex'>
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
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-4'
                            )}
                          >
                            {field.value
                              ? months.find((month) => month.value === field.value)?.label
                              : 'Elige un mes'}
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
                                  month && year && form.handleSubmit(handleSubmit)();
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
                                  month && year && form.handleSubmit(handleSubmit)();
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
          <XAxis dataKey='date-offering' />
          <YAxis />
          <Tooltip content={renderTooltipContent} />
          <Legend />
          <Bar dataKey='Dia' fill='#2390d4' />
          <Bar dataKey='Tarde' fill='#1acd81' />
          <Line type='linear' dataKey='Porcentaje' stroke='#ff7300' />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
