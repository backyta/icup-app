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
    Cantidad: 45.9,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '12/01/24',
    Cantidad: 50.8,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '20/01/24',
    Cantidad: 55,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '27/01/24',
    Cantidad: 42.3,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '27/01/24',
    Cantidad: 40,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '27/01/24',
    Cantidad: 50,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '27/01/24',
    Cantidad: 80,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '27/01/24',
    Cantidad: 42.3,
    Miembro: 'Pedro Torres',
  },
];

const dataFebruary = [
  {
    'date-offering': '04/02/24',
    Cantidad: 72.3,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '14/02/24',
    Cantidad: 58.7,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '22/02/24',
    Cantidad: 81.5,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '29/02/24',
    Cantidad: 69.2,
    Miembro: 'Pedro Torres',
  },
];

const dataMarch = [
  {
    'date-offering': '05/03/24',
    Cantidad: 67.8,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '15/03/24',
    Cantidad: 74.6,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '23/03/24',
    Cantidad: 59.4,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '30/03/24',
    Cantidad: 63.1,
    Miembro: 'Pedro Torres',
  },
];

const dataApril = [
  {
    'date-offering': '07/04/24',
    Cantidad: 82.4,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '16/04/24',
    Cantidad: 68.5,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '24/04/24',
    Cantidad: 75.9,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '30/04/24',
    Cantidad: 79.3,
    Miembro: 'Pedro Torres',
  },
];

const dataMay = [
  {
    'date-offering': '03/05/24',
    Cantidad: 62.7,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '12/05/24',
    Cantidad: 73.2,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '20/05/24',
    Cantidad: 68.9,
    Miembro: 'Pedro Torres',
  },
  {
    'date-offering': '29/05/24',
    Cantidad: 77.4,
    Miembro: 'Pedro Torres',
  },
];

//* Functions
const renderTooltipContent = (o: any): JSX.Element => {
  const { payload, label } = o;

  return (
    <div className='bg-white p-2 text-black font-normal'>
      <p className=''>{`${label}`}</p>
      <p className=''>{`Miembro: ${payload[1]?.payload?.Miembro}`}</p>
      <ul>
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

export const OfferingIncomeAnalysisCardBySpecialOffering = (): JSX.Element => {
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

  const totalAmount = dataResult.reduce((total, item) => total + item.Cantidad, 0);

  const newData = dataResult.map((item) => ({
    ...item,
    Porcentaje: ((item.Cantidad / totalAmount) * 100).toFixed(1),
  }));

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-2 col-end-3 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 xl:px-3 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Ofrendas Especiales
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
          <Bar dataKey='Cantidad' fill='#07aaf0' />
          <Line type='linear' dataKey='Porcentaje' stroke='#F63D3D' />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
