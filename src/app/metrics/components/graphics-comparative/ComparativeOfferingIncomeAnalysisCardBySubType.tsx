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
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts';

import { chartFormValidationSchema } from '@/app/metrics/validations';

import { SubTypesOfferingIncome } from '@/app/offering/income/enums';

import { subTypes, years } from '@/shared/data';

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
    Total: 245.7,
  },
  {
    month: 'Febrero',
    Total: 389.2,
  },
  {
    month: 'Marzo',
    Total: 478.3,
  },
  {
    month: 'Abril',
    Total: 512.8,
  },
  {
    month: 'Mayo',
    Total: 365.9,
  },
  {
    month: 'Junio',
    Total: 425.4,
  },
  {
    month: 'Julio',
    Total: 316.1,
  },
  {
    month: 'Agosto',
    Total: 294.6,
  },
  {
    month: 'Setiembre',
    Total: 521.7,
  },
  {
    month: 'Octubre',
    Total: 473.8,
  },
  {
    month: 'Noviembre',
    Total: 398.5,
  },
  {
    month: 'Diciembre',
    Total: 658.3,
  },
];

const data2025 = [
  {
    month: 'Enero',
    Total: 332.4,
  },
  {
    month: 'Febrero',
    Total: 411.6,
  },
  {
    month: 'Marzo',
    Total: 497.5,
  },
  {
    month: 'Abril',
    Total: 529.3,
  },
  {
    month: 'Mayo',
    Total: 450.7,
  },
  {
    month: 'Junio',
    Total: 389.1,
  },
  {
    month: 'Julio',
    Total: 301.8,
  },
  {
    month: 'Agosto',
    Total: 610.2,
  },
  {
    month: 'Setiembre',
    Total: 489.4,
  },
  {
    month: 'Octubre',
    Total: 475.3,
  },
  {
    month: 'Noviembre',
    Total: 520.8,
  },
  {
    month: 'Diciembre',
    Total: 687.9,
  },
];

const data2026 = [
  {
    month: 'Enero',
    Total: 278.5,
  },
  {
    month: 'Febrero',
    Total: 334.9,
  },
  {
    month: 'Marzo',
    Total: 512.3,
  },
  {
    month: 'Abril',
    Total: 540.7,
  },
  {
    month: 'Mayo',
    Total: 469.1,
  },
  {
    month: 'Junio',
    Total: 358.2,
  },
  {
    month: 'Julio',
    Total: 299.7,
  },
  {
    month: 'Agosto',
    Total: 601.5,
  },
  {
    month: 'Setiembre',
    Total: 493.6,
  },
  {
    month: 'Octubre',
    Total: 427.8,
  },
  {
    month: 'Noviembre',
    Total: 545.9,
  },
  {
    month: 'Diciembre',
    Total: 689.4,
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
            {`${entry.name}: ${entry.value} soles - (${payload[0]?.payload?.Porcentaje}%)`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ComparativeOfferingIncomeAnalysisCardBySubType = (): JSX.Element => {
  //* States
  const [isInputSearchSubTypeOpen, setIsInputSearchSubTypeOpen] = useState<boolean>(false);
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
      subType: SubTypesOfferingIncome.FamilyHouse,
      year: '2024',
    },
  });

  //* Form handler
  const handleSubmit = (values: z.infer<typeof chartFormValidationSchema>): void => {
    console.log({ values });
  };

  //* Watchers
  const subType = form.watch('subType');
  const year = form.watch('year');

  //* Effects
  useEffect(() => {
    if (year === '2025' && subType === SubTypesOfferingIncome.FamilyHouse) {
      setDataResult(data2025);
    }
    if (year === '2026' && subType === SubTypesOfferingIncome.FamilyHouse) {
      setDataResult(data2026);
    }
    if (year === '2024' && subType === SubTypesOfferingIncome.FamilyHouse) {
      setDataResult(data2024);
    }
    if (!subType) {
      setDataResult(data2024);
    }
  }, [subType, year]);

  const totalAmount = dataResult.reduce((total, item) => total + item.Total, 0);

  const newData = dataResult.map((item) => ({
    ...item,
    Porcentaje: ((item.Total / totalAmount) * 100).toFixed(1),
  }));

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-3 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 xl:px-3 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Comparativa Ofrendas (sub-tipo)
        </h3>
        <Form {...form}>
          <form className='flex'>
            <FormField
              control={form.control}
              name='subType'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover
                      open={isInputSearchSubTypeOpen}
                      onOpenChange={(e) => {
                        setIsInputSearchSubTypeOpen(e);
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
                              ? subTypes.find((subType) => subType.value === field.value)?.label
                              : 'Elige un sub-tipo'}
                            <CaretSortIcon className='h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un sub-tipo...'
                            className='h-9 text-[14px]'
                          />
                          <CommandEmpty>Sub-tipo no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[100px] h-auto'>
                            {subTypes.map((subType) => (
                              <CommandItem
                                className='text-[14px]'
                                value={subType.label}
                                key={subType.value}
                                onSelect={() => {
                                  form.setValue('subType', subType.value);
                                  subType && year && form.handleSubmit(handleSubmit)();
                                  setIsInputSearchSubTypeOpen(false);
                                }}
                              >
                                {subType.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    subType.value === field.value ? 'opacity-100' : 'opacity-0'
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
                        !subType &&
                          form.resetField('subType', {
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
                                  subType && year && form.handleSubmit(handleSubmit)();
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
          data={newData}
          stackOffset='expand'
          margin={{ top: 5, right: 30, left: -5, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip content={renderTooltipContent} />
          <Area type='monotone' dataKey='Total' stroke='#14d367' fill='#14d367' />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
