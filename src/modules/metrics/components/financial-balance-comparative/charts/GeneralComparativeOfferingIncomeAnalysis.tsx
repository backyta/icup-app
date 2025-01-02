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

import { MetricSearchType } from '@/modules/metrics/enums/metrics-search-type.enum';
import { metricsFormSchema } from '@/modules/metrics/validations/metrics-form-schema';
import { getGeneralComparativeOfferingIncome } from '@/modules/metrics/services/offering-comparative-metrics.service';
import { GeneralComparativeOfferingIncomeTooltipContent } from '@/modules/metrics/components/financial-balance-comparative/tooltips/components/GeneralComparativeOfferingIncomeTooltipContent';

import { cn } from '@/shared/lib/utils';
import { months } from '@/shared/data/months-data';
import { RecordOrder } from '@/shared/enums/record-order.enum';
import { generateYearOptions } from '@/shared/helpers/generate-year-options.helper';

import {
  Command,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from '@/shared/components/ui/command';
import {
  ChartTooltip,
  ChartLegend,
  ChartContainer,
  type ChartConfig,
  ChartLegendContent,
} from '@/shared/components/ui/chart';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';

const chartConfig = {
  accumulatedOfferingPEN: {
    label: 'Ofrenda PEN',
    color: '#029012',
  },
  accumulatedOfferingUSD: {
    label: 'Ofrenda USD',
    color: '#813cb4',
  },
  accumulatedOfferingEUR: {
    label: 'Ofrenda EUR',
    color: '#279fb3',
  },
} satisfies ChartConfig;

interface SearchParamsOptions {
  startMonth?: string;
  endMonth?: string;
  year?: string;
}

interface ResultDataOptions {
  type: string;
  subType: string | null;
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

export const GeneralComparativeOfferingIncomeAnalysisCard = ({ churchId }: Props): JSX.Element => {
  //* States
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
      startMonth: 'january',
      endMonth: format(new Date(), 'MMMM').toLowerCase(),
      year: new Date().getFullYear().toString(),
    },
  });

  //* Helpers
  const years = generateYearOptions();

  //* Watchers
  const year = form.watch('year');
  const startMonth = form.watch('startMonth');
  const endMonth = form.watch('endMonth');

  //* Queries
  const generalComparativeOfferingIncome = useQuery({
    queryKey: ['general-comparative-offering-income', { ...searchParams, church: churchId }],
    queryFn: async () => {
      return await getGeneralComparativeOfferingIncome({
        searchType: MetricSearchType.GeneralComparativeOfferingIncome,
        startMonth: searchParams?.startMonth ?? startMonth,
        endMonth: searchParams?.endMonth ?? endMonth,
        year: searchParams?.year ?? year,
        church: churchId ?? '',
        order: RecordOrder.Ascending,
      });
    },
    retry: 1,
    enabled: !!searchParams?.year && !!searchParams?.startMonth && !!searchParams?.endMonth,
  });

  //* Effects
  // Default value
  useEffect(() => {
    setSearchParams({ year, startMonth, endMonth });
  }, [generalComparativeOfferingIncome?.data, year]);

  // Set data
  useEffect(() => {
    if (generalComparativeOfferingIncome?.data) {
      const transformedData = generalComparativeOfferingIncome?.data.map((offering) => {
        const totalGeneral = generalComparativeOfferingIncome.data
          .map((item) => item.totalAmount)
          .reduce((acc, item) => acc + item, 0);

        return {
          type: offering.type,
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

    if (!generalComparativeOfferingIncome?.data) {
      setMappedData([]);
    }
  }, [generalComparativeOfferingIncome?.data]);

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof metricsFormSchema>): void => {
    setSearchParams(formData);
  };

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-3 h-[25.5rem] sm:h-[26.5rem] md:h-[27rem] lg:h-[31.5rem] 2xl:h-[31.5rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardHeader className='z-10 flex flex-col sm:flex-row items-center justify-between px-4 py-2.5'>
        <div className='flex flex-col items-center sm:items-start'>
          <CardTitle className='font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
            Ingresos de Ofrenda
          </CardTitle>
          <CardDescription className='mr-2 sm:ml-[2px] w-full sm:text-left text-center text-[14px] md:text-[16px] italic'>
            General (Acumulado por sub-tipo, rg. de meses y año).
          </CardDescription>
        </div>
        <Form {...form}>
          <form className='flex'>
            <FormField
              control={form.control}
              name='startMonth'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover
                      open={isInputSearchStartMonthOpen}
                      onOpenChange={(e) => {
                        setIsInputSearchStartMonthOpen(e);
                        form.resetField('year', {
                          defaultValue: '',
                        });
                      }}
                    >
                      <PopoverTrigger asChild>
                        <FormControl className='text-[14px] md:text-[14px]'>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-[14px] md:text-[14px] text-center px-2',
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
                            className='h-9 text-[14px] md:text-[14px]'
                          />
                          <CommandEmpty>Mes no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[100px] h-auto'>
                            {months.map((month) => (
                              <CommandItem
                                className='text-[14px] md:text-[14px]'
                                value={month.label}
                                key={month.value}
                                onSelect={() => {
                                  form.setValue('startMonth', month.value);
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
                    <FormMessage className='text-[13px]' />
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
                      onOpenChange={(e) => {
                        setIsInputSearchEndMonthOpen(e);
                        form.resetField('year', {
                          defaultValue: '',
                        });
                      }}
                    >
                      <PopoverTrigger asChild>
                        <FormControl className='text-[14px] md:text-[14px]'>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-[14px] md:text-[14px] text-center px-2',
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
                            className='h-9 text-[14px] md:text-[14px]'
                          />
                          <CommandEmpty>Mes no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[100px] h-auto'>
                            {months.map((month) => (
                              <CommandItem
                                className='text-[14px] md:text-[14px]'
                                value={month.label}
                                key={month.value}
                                onSelect={() => {
                                  form.setValue('endMonth', month.value);
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
                    <FormMessage className='text-[13px]' />
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
                        <FormControl className='text-[14px] md:text-[14px]'>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-[14px] md:text-[14px] text-center px-2',
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
                            className='h-9 text-[14px] md:text-[14px]'
                          />
                          <CommandEmpty>Año no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[100px] h-auto'>
                            {years.map((year) => (
                              <CommandItem
                                className='text-[14px] md:text-[14px]'
                                value={year.label}
                                key={year.value}
                                onSelect={() => {
                                  form.setValue('year', year.value);
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
                    <FormMessage className='text-[13px]' />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </CardHeader>

      {!generalComparativeOfferingIncome?.data?.length && !searchParams ? (
        <CardContent className='h-full pl-3 pr-4 py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full pl-3 pr-4 py-0'>
          {generalComparativeOfferingIncome?.isFetching &&
            !generalComparativeOfferingIncome?.data?.length &&
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
                'w-full h-[288px] sm:h-[345px] md:h-[345px] lg:h-[415px] xl:h-[415px] 2xl:h-[415px]'
              )}
            >
              <BarChart
                accessibilityLayer
                data={mappedData}
                margin={{ top: 5, right: 5, left: -15, bottom: 10 }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='subType'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  className='text-[12.5px] sm:text-[14px]'
                  tickFormatter={(value) => {
                    const [firstWord, secondWord] = value.split(' ');
                    return secondWord ? `${firstWord} ${secondWord.charAt(0)}.` : firstWord;
                  }}
                />

                <YAxis className='text-[12.5px] sm:text-[14px]' />
                <ChartTooltip
                  cursor={false}
                  content={GeneralComparativeOfferingIncomeTooltipContent as any}
                />

                <ChartLegend
                  content={<ChartLegendContent className='ml-8 text-[13px] md:text-[14px]' />}
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
          {!generalComparativeOfferingIncome?.isFetching &&
            !generalComparativeOfferingIncome?.data?.length &&
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
