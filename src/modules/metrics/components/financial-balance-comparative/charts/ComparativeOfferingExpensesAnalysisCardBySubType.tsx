/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Bar, XAxis, YAxis, CartesianGrid, BarChart } from 'recharts';
import { FcDataBackup, FcDataConfiguration, FcDeleteDatabase } from 'react-icons/fc';

import { months } from '@/shared/data';
import { cn } from '@/shared/lib/utils';
import { RecordOrder } from '@/shared/enums';
import { generateYearOptions } from '@/shared/helpers';

import {
  OfferingExpenseSearchType,
  OfferingExpenseSearchTypeNames,
} from '@/modules/offering/expense/enums';

import { MetricSearchType } from '@/modules/metrics/enums';
import { metricsFormSchema } from '@/modules/metrics/validations';
import { getComparativeOfferingExpensesBySubType } from '@/modules/metrics/services';
import { ComparativeOfferingExpensesBySubTypeTooltipContent } from '@/modules/metrics/components/financial-balance-comparative/tooltips/components';

import {
  Command,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from '@/shared/components/ui/command';
import {
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  type ChartConfig,
  ChartLegendContent,
} from '@/shared/components/ui/chart';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';

const chartConfig = {
  accumulatedOfferingPEN: {
    label: 'Ofrenda PEN',
    color: '#4682B4  ',
  },
  accumulatedOfferingUSD: {
    label: 'Ofrenda USD',
    color: '#228B22',
  },
  accumulatedOfferingEUR: {
    label: 'Ofrenda EUR',
    color: '#FF69B4 ',
  },
} satisfies ChartConfig;

interface SearchParamsOptions {
  type?: string;
  startMonth?: string;
  endMonth?: string;
  year?: string;
}

interface ResultDataOptions {
  subType: string;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
  totalAmount: number;
  totalPercentage: string;
}

interface Props {
  churchId: string | undefined;
}

const transformedArray = [
  ...Object.entries(OfferingExpenseSearchTypeNames).map(([key, value]) => ({ key, value })),
];

export const ComparativeOfferingExpensesAnalysisCardBySubType = ({
  churchId,
}: Props): JSX.Element => {
  //* States
  const [isInputSearchTypeOpen, setIsInputSearchTypeOpen] = useState<boolean>(false);
  const [isInputSearchStartMonthOpen, setIsInputSearchStartMonthOpen] = useState<boolean>(false);
  const [isInputSearchEndMonthOpen, setIsInputSearchEndMonthOpen] = useState<boolean>(false);
  const [isInputSearchYearOpen, setIsInputSearchYearOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Form
  const form = useForm<z.infer<typeof metricsFormSchema>>({
    resolver: zodResolver(metricsFormSchema),
    mode: 'onChange',
    defaultValues: {
      type: OfferingExpenseSearchType.OperationalExpenses,
      startMonth: 'january',
      endMonth: format(new Date(), 'MMMM').toLowerCase(),
      year: new Date().getFullYear().toString(),
    },
  });

  //* Helpers
  const years = generateYearOptions();

  //* Watchers
  const year = form.watch('year');
  const type = form.watch('type');
  const startMonth = form.watch('startMonth');
  const endMonth = form.watch('endMonth');

  //* Queries
  const comparativeOfferingExpensesBySubType = useQuery({
    queryKey: ['comparative-offering-expenses-by-sub-type', { ...searchParams, church: churchId }],
    queryFn: async () => {
      return await getComparativeOfferingExpensesBySubType({
        searchType: MetricSearchType.ComparativeOfferingExpensesBySubType,
        type: searchParams?.type ?? type,
        startMonth: searchParams?.startMonth ?? startMonth,
        endMonth: searchParams?.endMonth ?? endMonth,
        year: searchParams?.year ?? year,
        church: churchId ?? '',
        order: RecordOrder.Ascending,
      });
    },
    retry: 1,
    enabled:
      !!searchParams?.type &&
      !!searchParams?.startMonth &&
      !!searchParams?.endMonth &&
      !!searchParams?.year,
  });

  //* Effects
  // Default value
  useEffect(() => {
    setSearchParams({ year, type, startMonth, endMonth });
  }, [comparativeOfferingExpensesBySubType?.data, year]);

  // Set data
  useEffect(() => {
    if (comparativeOfferingExpensesBySubType?.data) {
      const transformedData = comparativeOfferingExpensesBySubType?.data.map((offering) => {
        const totalGeneral = comparativeOfferingExpensesBySubType.data
          .map((item) => item.totalAmount)
          .reduce((acc, item) => acc + item, 0);

        return {
          subType: offering.subType,
          accumulatedOfferingPEN: offering.accumulatedOfferingPEN,
          accumulatedOfferingUSD: offering.accumulatedOfferingUSD,
          accumulatedOfferingEUR: offering.accumulatedOfferingEUR,
          church: {
            isAnexe: offering.church.isAnexe,
            abbreviatedChurchName: offering.church.abbreviatedChurchName,
          },
          totalAmount: offering.totalAmount,
          totalPercentage: ((offering.totalAmount / totalGeneral) * 100).toFixed(1),
        };
      });

      setMappedData(transformedData);
    }

    if (!comparativeOfferingExpensesBySubType?.data) {
      setMappedData([]);
    }
  }, [comparativeOfferingExpensesBySubType?.data]);

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof metricsFormSchema>): void => {
    setSearchParams(formData);
  };

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-3 h-[28rem] sm:h-[31rem] md:h-[29rem] lg:h-[33rem] xl:h-[30rem] 2xl:h-[30rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardHeader className='z-10 flex flex-col xl:flex-row items-center justify-between px-4 py-2.5'>
        <CardTitle className='flex justify-center items-center gap-2 font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
          Salidas de Ofrenda (sub-tipo)
        </CardTitle>
        <Form {...form}>
          <form className='flex items-center flex-col md:flex-row'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover
                      open={isInputSearchTypeOpen}
                      onOpenChange={(e) => {
                        setIsInputSearchTypeOpen(e);
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
                              'justify-between w-full text-[12px] md:text-[14px] text-center px-2',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-4'
                            )}
                          >
                            {field.value
                              ? transformedArray.find((type) => type.key === field.value)?.value
                              : 'Elige un tipo'}
                            <CaretSortIcon className='h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un tipo...'
                            className='h-9 text-[12px] md:text-[14px]'
                          />
                          <CommandEmpty>Tipo no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[100px] h-auto'>
                            {transformedArray.map((type) => (
                              <CommandItem
                                className='text-[12px] md:text-[14px]'
                                value={type.value}
                                key={type.key}
                                onSelect={() => {
                                  form.setValue('type', type.key);
                                  setIsInputSearchTypeOpen(false);
                                }}
                              >
                                {type.value}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    type.key === field.value ? 'opacity-100' : 'opacity-0'
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

            <div className='flex'>
              <FormField
                control={form.control}
                name='startMonth'
                render={({ field }) => {
                  return (
                    <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                      <Popover
                        open={isInputSearchStartMonthOpen}
                        onOpenChange={setIsInputSearchStartMonthOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'justify-between w-full text-[12px] md:text-[14px] text-center px-2',
                                !field.value &&
                                  'text-slate-500 dark:text-slate-200 font-normal px-4'
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
                              className='h-9 text-[12px] md:text-[14px]'
                            />
                            <CommandEmpty>Mes no encontrado.</CommandEmpty>
                            <CommandGroup className='max-h-[100px] h-auto'>
                              {months.map((month) => (
                                <CommandItem
                                  className='text-[12px] md:text-[14px]'
                                  value={month.label}
                                  key={month.value}
                                  onSelect={() => {
                                    form.setValue('startMonth', month.value);
                                    type &&
                                      startMonth &&
                                      endMonth &&
                                      year &&
                                      form.handleSubmit(handleSubmit)();
                                    setIsInputSearchStartMonthOpen(false);
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
                name='endMonth'
                render={({ field }) => {
                  return (
                    <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                      <Popover
                        open={isInputSearchEndMonthOpen}
                        onOpenChange={setIsInputSearchEndMonthOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'justify-between w-full text-[12px] md:text-[14px] text-center px-2',
                                !field.value &&
                                  'text-slate-500 dark:text-slate-200 font-normal px-4'
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
                              className='h-9 text-[12px] md:text-[14px]'
                            />
                            <CommandEmpty>Mes no encontrado.</CommandEmpty>
                            <CommandGroup className='max-h-[100px] h-auto'>
                              {months.map((month) => (
                                <CommandItem
                                  className='text-[12px] md:text-[14px]'
                                  value={month.label}
                                  key={month.value}
                                  onSelect={() => {
                                    form.setValue('endMonth', month.value);
                                    type &&
                                      startMonth &&
                                      endMonth &&
                                      year &&
                                      form.handleSubmit(handleSubmit)();
                                    setIsInputSearchEndMonthOpen(false);
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
                      <Popover open={isInputSearchYearOpen} onOpenChange={setIsInputSearchYearOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'justify-between w-full text-[12px] md:text-[14px] text-center px-2',
                                !field.value &&
                                  'text-slate-500 dark:text-slate-200 font-normal px-2'
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
                              className='h-9 text-[12px] md:text-[14px]'
                            />
                            <CommandEmpty>Año no encontrado.</CommandEmpty>
                            <CommandGroup className='max-h-[100px] h-auto'>
                              {years.map((year) => (
                                <CommandItem
                                  className='text-[12px] md:text-[14px]'
                                  value={year.label}
                                  key={year.value}
                                  onSelect={() => {
                                    form.setValue('year', year.value);
                                    type &&
                                      startMonth &&
                                      endMonth &&
                                      year &&
                                      form.handleSubmit(handleSubmit)();
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
            </div>
          </form>
        </Form>
      </CardHeader>

      {!comparativeOfferingExpensesBySubType?.data?.length && !searchParams ? (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          {comparativeOfferingExpensesBySubType?.isFetching &&
            !comparativeOfferingExpensesBySubType?.data?.length &&
            year && (
              <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
                <FcDataBackup className='text-[6rem] pb-2' />
                <p>Consultando datos....</p>
              </div>
            )}
          {!!mappedData?.length && searchParams && (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[305px] sm:h-[345px] md:h-[350px] lg:h-[415px] xl:h-[410px] 2xl:h-[410px]'
              )}
            >
              <BarChart
                accessibilityLayer
                data={mappedData}
                margin={{ top: 5, right: 5, left: -10, bottom: 10 }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='subType'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  className='text-[12px] sm:text-[14px]'
                  tickFormatter={(value) => {
                    const [firstWord, secondWord] = value.split(' ');
                    return secondWord ? `${firstWord} ${secondWord.charAt(0)}.` : firstWord;
                  }}
                />

                <YAxis className='text-[12px] sm:text-[14px]' />
                <ChartTooltip
                  cursor={false}
                  content={ComparativeOfferingExpensesBySubTypeTooltipContent as any}
                />

                <ChartLegend
                  content={<ChartLegendContent className='ml-10 text-[12px] md:text-[14px]' />}
                />

                <Bar
                  dataKey='accumulatedOfferingPEN'
                  stackId='subType'
                  fill='var(--color-accumulatedOfferingPEN)'
                  radius={[2, 2, 2, 2]}
                />
                <Bar
                  dataKey='accumulatedOfferingEUR'
                  stackId='subType'
                  fill='var(--color-accumulatedOfferingEUR)'
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey='accumulatedOfferingUSD'
                  stackId='subType'
                  fill='var(--color-accumulatedOfferingUSD)'
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          )}
          {!year && !mappedData?.length && (
            <div className='text-emerald-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
              <FcDataConfiguration className='text-[6rem] pb-2' />
              <p>Esperando parámetros de consulta...</p>
            </div>
          )}
          {!comparativeOfferingExpensesBySubType?.isFetching &&
            !comparativeOfferingExpensesBySubType?.data?.length &&
            year && (
              <div className='text-red-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
                <FcDeleteDatabase className='text-[6rem] pb-2' />
                <p>No hay datos disponibles para mostrar.</p>
              </div>
            )}
        </CardContent>
      )}
    </Card>
  );
};