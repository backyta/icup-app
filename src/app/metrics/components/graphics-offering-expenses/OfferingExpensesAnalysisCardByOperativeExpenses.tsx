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
    SubTipo: 'Alq. Local',
    ExpenseOne: {
      date: '05/01/24',
      amount: 65.2,
    },
    ExpenseTwo: {
      date: '09/01/24',
      amount: 48.7,
    },
    ExpenseThree: {
      date: '20/01/24',
      amount: 42.3,
    },
    ExpenseFour: {
      date: '25/01/24',
      amount: 58.6,
    },
  },
  {
    SubTipo: 'Serv. Púb.',
    ExpenseOne: {
      date: '04/01/24',
      amount: 37.4,
    },
    ExpenseTwo: {
      date: '13/01/24',
      amount: 63.5,
    },
    ExpenseThree: {
      date: '20/01/24',
      amount: 42.3,
    },
    ExpenseFour: {
      date: '25/01/24',
      amount: 58.6,
    },
  },
  {
    SubTipo: 'Viaje y Trans.',
    ExpenseOne: {
      date: '07/01/24',
      amount: 51.9,
    },
    ExpenseTwo: {
      date: '15/01/24',
      amount: 44.3,
    },
    ExpenseThree: {
      date: '21/01/24',
      amount: 36.7,
    },
    ExpenseFour: {
      date: '28/01/24',
      amount: 60.4,
    },
  },
  {
    SubTipo: 'Seg. y Vig.',
    ExpenseOne: {
      date: '03/01/24',
      amount: 56.6,
    },
    ExpenseTwo: {
      date: '11/01/24',
      amount: 49.2,
    },
    ExpenseThree: {
      date: '18/01/24',
      amount: 67.8,
    },
    ExpenseFour: {
      date: '27/01/24',
      amount: 53.1,
    },
  },
  {
    SubTipo: 'Otros gastos adm.',
    ExpenseOne: {
      date: '06/01/24',
      amount: 47.3,
    },
    ExpenseTwo: {
      date: '14/01/24',
      amount: 55.6,
    },
    ExpenseThree: {
      date: '19/01/24',
      amount: 39.8,
    },
    ExpenseFour: {
      date: '26/01/24',
      amount: 62.7,
    },
  },
];

const dataFebruary = [
  {
    SubTipo: 'Alq. Local',
    ExpenseOne: {
      date: '04/02/24',
      amount: 55.2,
    },
    ExpenseTwo: {
      date: '10/02/24',
      amount: 63.1,
    },
    ExpenseThree: {
      date: '17/02/24',
      amount: 48.9,
    },
    ExpenseFour: {
      date: '25/02/24',
      amount: 57.4,
    },
  },
  {
    SubTipo: 'Serv. Púb.',
    ExpenseOne: {
      date: '03/02/24',
      amount: 42.7,
    },
    ExpenseTwo: {
      date: '09/02/24',
      amount: 59.8,
    },
    ExpenseThree: {
      date: '16/02/24',
      amount: 53.6,
    },
    ExpenseFour: {
      date: '24/02/24',
      amount: 47.2,
    },
  },
  {
    SubTipo: 'Viaje y Trans.',
    ExpenseOne: {
      date: '05/02/24',
      amount: 61.5,
    },
    ExpenseTwo: {
      date: '11/02/24',
      amount: 44.3,
    },
    ExpenseThree: {
      date: '19/02/24',
      amount: 56.9,
    },
    ExpenseFour: {
      date: '26/02/24',
      amount: 49.8,
    },
  },
  {
    SubTipo: 'Seg. y Vig.',
    ExpenseOne: {
      date: '06/02/24',
      amount: 53.8,
    },
    ExpenseTwo: {
      date: '13/02/24',
      amount: 46.7,
    },
    ExpenseThree: {
      date: '20/02/24',
      amount: 59.2,
    },
    ExpenseFour: {
      date: '27/02/24',
      amount: 52.1,
    },
  },
  {
    SubTipo: 'Otros gastos adm.',
    ExpenseOne: {
      date: '07/02/24',
      amount: 49.6,
    },
    ExpenseTwo: {
      date: '14/02/24',
      amount: 55.4,
    },
    ExpenseThree: {
      date: '21/02/24',
      amount: 63.7,
    },
    ExpenseFour: {
      date: '28/02/24',
      amount: 47.9,
    },
  },
];
const dataMarch = [
  {
    SubTipo: 'Alq. Local',
    ExpenseOne: {
      date: '05/03/24',
      amount: 57.2,
    },
    ExpenseTwo: {
      date: '11/03/24',
      amount: 49.8,
    },
    ExpenseThree: {
      date: '18/03/24',
      amount: 62.5,
    },
    ExpenseFour: {
      date: '26/03/24',
      amount: 55.6,
    },
  },
  {
    SubTipo: 'Serv. Púb.',
    ExpenseOne: {
      date: '04/03/24',
      amount: 43.6,
    },
    ExpenseTwo: {
      date: '10/03/24',
      amount: 51.2,
    },
    ExpenseThree: {
      date: '17/03/24',
      amount: 47.9,
    },
    ExpenseFour: {
      date: '25/03/24',
      amount: 59.3,
    },
  },
  {
    SubTipo: 'Viaje y Trans.',
    ExpenseOne: {
      date: '06/03/24',
      amount: 58.4,
    },
    ExpenseTwo: {
      date: '12/03/24',
      amount: 45.7,
    },
    ExpenseThree: {
      date: '19/03/24',
      amount: 54.3,
    },
    ExpenseFour: {
      date: '27/03/24',
      amount: 47.8,
    },
  },
  {
    SubTipo: 'Seg. y Vig.',
    ExpenseOne: {
      date: '03/03/24',
      amount: 51.9,
    },
    ExpenseTwo: {
      date: '09/03/24',
      amount: 47.3,
    },
    ExpenseThree: {
      date: '16/03/24',
      amount: 56.2,
    },
    ExpenseFour: {
      date: '24/03/24',
      amount: 53.6,
    },
  },
  {
    SubTipo: 'Otros gastos adm.',
    ExpenseOne: {
      date: '07/03/24',
      amount: 49.2,
    },
    ExpenseTwo: {
      date: '13/03/24',
      amount: 55.8,
    },
    ExpenseThree: {
      date: '20/03/24',
      amount: 63.4,
    },
    ExpenseFour: {
      date: '28/03/24',
      amount: 48.7,
    },
  },
];

const dataApril = [
  {
    SubTipo: 'Alq. Local',
    ExpenseOne: {
      date: '04/04/24',
      amount: 59.3,
    },
    ExpenseTwo: {
      date: '10/04/24',
      amount: 52.7,
    },
    ExpenseThree: {
      date: '17/04/24',
      amount: 45.8,
    },
    ExpenseFour: {
      date: '25/04/24',
      amount: 56.1,
    },
  },
  {
    SubTipo: 'Serv. Púb.',
    ExpenseOne: {
      date: '05/04/24',
      amount: 46.5,
    },
    ExpenseTwo: {
      date: '11/04/24',
      amount: 53.2,
    },
    ExpenseThree: {
      date: '18/04/24',
      amount: 57.6,
    },
    ExpenseFour: {
      date: '26/04/24',
      amount: 49.8,
    },
  },
  {
    SubTipo: 'Viaje y Trans.',
    ExpenseOne: {
      date: '06/04/24',
      amount: 54.8,
    },
    ExpenseTwo: {
      date: '12/04/24',
      amount: 47.9,
    },
    ExpenseThree: {
      date: '19/04/24',
      amount: 62.4,
    },
    ExpenseFour: {
      date: '27/04/24',
      amount: 53.6,
    },
  },
  {
    SubTipo: 'Seg. y Vig.',
    ExpenseOne: {
      date: '03/04/24',
      amount: 48.7,
    },
    ExpenseTwo: {
      date: '09/04/24',
      amount: 55.6,
    },
    ExpenseThree: {
      date: '16/04/24',
      amount: 51.2,
    },
    ExpenseFour: {
      date: '24/04/24',
      amount: 58.3,
    },
  },
  {
    SubTipo: 'Otros gastos adm.',
    ExpenseOne: {
      date: '07/04/24',
      amount: 56.2,
    },
    ExpenseTwo: {
      date: '13/04/24',
      amount: 49.4,
    },
    ExpenseThree: {
      date: '20/04/24',
      amount: 47.9,
    },
    ExpenseFour: {
      date: '28/04/24',
      amount: 61.7,
    },
  },
];

const dataMay = [
  {
    SubTipo: 'Alq. Local',
    ExpenseOne: {
      date: '02/05/24',
      amount: 52.4,
    },
    ExpenseTwo: {
      date: '08/05/24',
      amount: 58.7,
    },
    ExpenseThree: {
      date: '15/05/24',
      amount: 47.9,
    },
    ExpenseFour: {
      date: '23/05/24',
      amount: 63.2,
    },
  },
  {
    SubTipo: 'Serv. Púb.',
    ExpenseOne: {
      date: '03/05/24',
      amount: 46.8,
    },
    ExpenseTwo: {
      date: '09/05/24',
      amount: 54.3,
    },
    ExpenseThree: {
      date: '16/05/24',
      amount: 51.7,
    },
    ExpenseFour: {
      date: '24/05/24',
      amount: 57.5,
    },
  },
  {
    SubTipo: 'Viaje y Trans.',
    ExpenseOne: {
      date: '04/05/24',
      amount: 56.1,
    },
    ExpenseTwo: {
      date: '10/05/24',
      amount: 47.8,
    },
    ExpenseThree: {
      date: '17/05/24',
      amount: 54.6,
    },
    ExpenseFour: {
      date: '25/05/24',
      amount: 49.3,
    },
  },
  {
    SubTipo: 'Seg. y Vig.',
    ExpenseOne: {
      date: '01/05/24',
      amount: 49.6,
    },
    ExpenseTwo: {
      date: '07/05/24',
      amount: 56.3,
    },
    ExpenseThree: {
      date: '14/05/24',
      amount: 53.2,
    },
    ExpenseFour: {
      date: '22/05/24',
      amount: 58.9,
    },
  },
  {
    SubTipo: 'Otros gastos adm.',
    ExpenseOne: {
      date: '05/05/24',
      amount: 54.9,
    },
    ExpenseTwo: {
      date: '11/05/24',
      amount: 49.1,
    },
    ExpenseThree: {
      date: '18/05/24',
      amount: 57.6,
    },
    ExpenseFour: {
      date: '26/05/24',
      amount: 52.4,
    },
  },
];

//* Functions
const renderTooltipContent = (o: any): JSX.Element => {
  const { payload, label } = o;

  return (
    <div className='bg-white p-2 text-black font-normal'>
      <p className=''>{`${label}`}</p>
      <p>
        <span className='text-slate-500'>{`${payload[1]?.payload?.ExpenseOne?.date}`} - </span>
        <span className='text-slate-500'>{`${payload[1]?.payload?.ExpenseOne?.amount} soles`}</span>
      </p>
      <p>
        <span className='text-slate-500'>{`${payload[1]?.payload?.ExpenseTwo?.date}`} - </span>
        <span className='text-slate-500'>{`${payload[1]?.payload?.ExpenseTwo?.amount} soles`}</span>
      </p>
      <p>
        <span className='text-slate-500'>{`${payload[1]?.payload?.ExpenseThree?.date}`} - </span>
        <span className='text-slate-500'>{`${payload[1]?.payload?.ExpenseThree?.amount} soles`}</span>
      </p>
      <p>
        <span className='text-slate-500'>{`${payload[1]?.payload?.ExpenseFour?.date}`} - </span>
        <span className='text-slate-500'>{`${payload[1]?.payload?.ExpenseFour?.amount} soles`}</span>
      </p>
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

export const OfferingExpensesAnalysisCardByOperativeExpenses = (): JSX.Element => {
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

  const totalFirst = dataResult.reduce((total, item) => total + item?.ExpenseOne?.amount, 0);
  const totalSecond = dataResult.reduce((total, item) => total + item?.ExpenseTwo?.amount, 0);
  const totalThird = dataResult.reduce((total, item) => total + item?.ExpenseThree?.amount, 0);
  const totalFourth = dataResult.reduce((total, item) => total + item?.ExpenseFour?.amount, 0);

  const totalAmount = totalFirst + totalSecond + totalThird + totalFourth;

  const newData = dataResult.map((item) => ({
    ...item,
    Total: (
      item?.ExpenseOne?.amount +
      item?.ExpenseTwo?.amount +
      item?.ExpenseThree?.amount +
      item?.ExpenseFour?.amount
    ).toFixed(1),
    Porcentaje: (
      ((item?.ExpenseOne?.amount +
        item?.ExpenseTwo?.amount +
        item?.ExpenseThree?.amount +
        item?.ExpenseFour?.amount) /
        totalAmount) *
      100
    ).toFixed(1),
  }));

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 xl:px-3 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Gastos Operativos
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
          <XAxis dataKey='SubTipo' />
          <YAxis />
          <Tooltip content={renderTooltipContent} />
          <Legend />
          <Bar dataKey='Total' fill='#8adb07' />
          <Line type='linear' dataKey='Porcentaje' stroke='#ff7300' />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
