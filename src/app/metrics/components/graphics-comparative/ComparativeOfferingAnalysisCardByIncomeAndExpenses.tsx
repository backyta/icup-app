/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/shared/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts';

import { chartFormValidationSchema } from '@/app/metrics/validations';

import { years } from '@/shared/data';

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

const data2024 = [
  {
    month: 'Enero',
    'Total-Ingresos': 2500,
    'Total-Gastos': 1400,
  },
  {
    month: 'Febrero',
    'Total-Ingresos': 3200,
    'Total-Gastos': 1698,
  },
  {
    month: 'Marzo',
    'Total-Ingresos': 2200,
    'Total-Gastos': 1800,
  },
  {
    month: 'Abril',
    'Total-Ingresos': 3580,
    'Total-Gastos': 2408,
  },
  {
    month: 'Mayo',
    'Total-Ingresos': 1790,
    'Total-Gastos': 2000,
  },
  {
    month: 'Junio',
    'Total-Ingresos': 3390,
    'Total-Gastos': 2800,
  },
  {
    month: 'Julio',
    'Total-Ingresos': 2490,
    'Total-Gastos': 2120,
  },
  {
    month: 'Agosto',
    'Total-Ingresos': 2490,
    'Total-Gastos': 2800,
  },
  {
    month: 'Setiembre',
    'Total-Ingresos': 5600,
    'Total-Gastos': 3520,
  },
  {
    month: 'Octubre',
    'Total-Ingresos': 3490,
    'Total-Gastos': 2300,
  },
  {
    month: 'Noviembre',
    'Total-Ingresos': 2790,
    'Total-Gastos': 1945,
  },
  {
    month: 'Diciembre',
    'Total-Ingresos': 3620,
    'Total-Gastos': 2450,
  },
];

const data2025 = [
  {
    month: 'Enero',
    'Total-Ingresos': 2650,
    'Total-Gastos': 1500,
  },
  {
    month: 'Febrero',
    'Total-Ingresos': 3350,
    'Total-Gastos': 1780,
  },
  {
    month: 'Marzo',
    'Total-Ingresos': 2300,
    'Total-Gastos': 1900,
  },
  {
    month: 'Abril',
    'Total-Ingresos': 3720,
    'Total-Gastos': 2500,
  },
  {
    month: 'Mayo',
    'Total-Ingresos': 1850,
    'Total-Gastos': 2100,
  },
  {
    month: 'Junio',
    'Total-Ingresos': 3550,
    'Total-Gastos': 2900,
  },
  {
    month: 'Julio',
    'Total-Ingresos': 2600,
    'Total-Gastos': 2200,
  },
  {
    month: 'Agosto',
    'Total-Ingresos': 2600,
    'Total-Gastos': 2900,
  },
  {
    month: 'Setiembre',
    'Total-Ingresos': 5800,
    'Total-Gastos': 3600,
  },
  {
    month: 'Octubre',
    'Total-Ingresos': 3600,
    'Total-Gastos': 2400,
  },
  {
    month: 'Noviembre',
    'Total-Ingresos': 2900,
    'Total-Gastos': 2000,
  },
  {
    month: 'Diciembre',
    'Total-Ingresos': 3750,
    'Total-Gastos': 2550,
  },
];

const data2026 = [
  {
    month: 'Enero',
    'Total-Ingresos': 2700,
    'Total-Gastos': 1600,
  },
  {
    month: 'Febrero',
    'Total-Ingresos': 3450,
    'Total-Gastos': 1850,
  },
  {
    month: 'Marzo',
    'Total-Ingresos': 2400,
    'Total-Gastos': 2000,
  },
  {
    month: 'Abril',
    'Total-Ingresos': 3850,
    'Total-Gastos': 2600,
  },
  {
    month: 'Mayo',
    'Total-Ingresos': 1900,
    'Total-Gastos': 2200,
  },
  {
    month: 'Junio',
    'Total-Ingresos': 3700,
    'Total-Gastos': 3000,
  },
  {
    month: 'Julio',
    'Total-Ingresos': 2700,
    'Total-Gastos': 2300,
  },
  {
    month: 'Agosto',
    'Total-Ingresos': 2700,
    'Total-Gastos': 3000,
  },
  {
    month: 'Setiembre',
    'Total-Ingresos': 6000,
    'Total-Gastos': 3700,
  },
  {
    month: 'Octubre',
    'Total-Ingresos': 3700,
    'Total-Gastos': 2500,
  },
  {
    month: 'Noviembre',
    'Total-Ingresos': 3000,
    'Total-Gastos': 2100,
  },
  {
    month: 'Diciembre',
    'Total-Ingresos': 3900,
    'Total-Gastos': 2650,
  },
];

//* Functions
const renderTooltipContent = (o: any): JSX.Element => {
  const { payload, label } = o;

  return (
    <div className='bg-white p-2 text-black font-normal'>
      <p className=''>{`${label}`}</p>

      <ul className='list'>
        {payload.map((entry: any, index: any) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} soles`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ComparativeOfferingAnalysisCardByIncomeAndExpenses = (): JSX.Element => {
  //* States
  const [isInputSearchYearOpen, setIsInputSearchYearOpen] = useState<boolean>(false);
  const [dataResult, setDataResult] = useState<any[]>([]);

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
  const year = form.watch('year');

  //* Effects
  useEffect(() => {
    if (year === '2025') {
      setDataResult(data2025);
    }
    if (year === '2026') {
      setDataResult(data2026);
    }
    if (year === '2024') {
      setDataResult(data2024);
    }
    if (!year) {
      setDataResult(data2024);
    }
  }, [year]);

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-3 h-auto lg:h-auto 2xl:h-auto m-0 border-slate-200 dark:border-slate-800'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 xl:px-3 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Ingresos Vs Egresos (año)
        </h3>
        <Form {...form}>
          <form className='flex'>
            <FormField
              control={form.control}
              name='year'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover open={isInputSearchYearOpen} onOpenChange={setIsInputSearchYearOpen}>
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
                                  year && form.handleSubmit(handleSubmit)();
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

      <ResponsiveContainer width='100%' height={200}>
        <AreaChart
          width={500}
          height={200}
          data={dataResult}
          syncId='anyId'
          margin={{ top: 5, right: 40, left: -5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip content={renderTooltipContent} />
          <Area type='monotone' dataKey='Total-Ingresos' stroke='#4ecb17' fill='#4ecb17' />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width='100%' height={200}>
        <AreaChart
          width={500}
          height={200}
          data={dataResult}
          syncId='anyId'
          margin={{ top: 5, right: 40, left: -5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip content={renderTooltipContent} />
          <Area type='monotone' dataKey='Total-Gastos' stroke='#ec564b' fill='#ec564b' />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
