/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { FcDataBackup, FcDataConfiguration, FcDeleteDatabase } from 'react-icons/fc';

import { cn } from '@/shared/lib/utils';
import { RecordOrder } from '@/shared/enums';
import { generateYearOptions } from '@/shared/helpers';

import { MetricSearchType } from '@/modules/metrics/enums';
import { metricsFormSchema } from '@/modules/metrics/validations';
import { getComparativeOfferingIncomeByType } from '@/modules/metrics/services';
import { ComparativeOfferingIncomeByTypeTooltipContent } from '@/modules/metrics/components/financial-balance-comparative/tooltips/components';

import {
  OfferingIncomeCreationType,
  OfferingIncomeCreationSubType,
  OfferingIncomeCreationTypeNames,
  OfferingIncomeCreationSubTypeNames,
} from '@/modules/offering/income/enums';

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
  type?: string;
  year?: string;
}

interface ResultDataOptions {
  month: string;
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

const combinedArray = [
  ...Object.entries(OfferingIncomeCreationSubTypeNames).map(([key, value]) => ({ key, value })),
  ...Object.entries(OfferingIncomeCreationTypeNames).map(([key, value]) => ({ key, value })),
];

export const ComparativeOfferingIncomeAnalysisCardByType = ({ churchId }: Props): JSX.Element => {
  //* States
  const [isInputSearchTypeOpen, setIsInputSearchTypeOpen] = useState<boolean>(false);
  const [isInputSearchYearOpen, setIsInputSearchYearOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Form
  const form = useForm<z.infer<typeof metricsFormSchema>>({
    resolver: zodResolver(metricsFormSchema),
    mode: 'onChange',
    defaultValues: {
      type: OfferingIncomeCreationSubType.SundayService,
      year: new Date().getFullYear().toString(),
    },
  });

  //* Helpers
  const years = generateYearOptions();

  //* Watchers
  const year = form.watch('year');
  const type = form.watch('type');

  //* Queries
  const comparativeOfferingIncomeByType = useQuery({
    queryKey: ['comparative-offering-income-by-type', { ...searchParams, church: churchId }],
    queryFn: async () => {
      return await getComparativeOfferingIncomeByType({
        searchType: MetricSearchType.ComparativeOfferingIncomeByType,
        type: searchParams?.type ?? type,
        year: searchParams?.year ?? year,
        church: churchId ?? '',
        order: RecordOrder.Descending,
      });
    },
    retry: 1,
    enabled: !!searchParams?.year && !!searchParams?.type,
  });

  //* Effects
  // Default value
  useEffect(() => {
    setSearchParams({ year, type });
  }, [comparativeOfferingIncomeByType?.data, year]);

  // Set data
  useEffect(() => {
    if (comparativeOfferingIncomeByType?.data) {
      const transformedData = comparativeOfferingIncomeByType?.data.map((offering) => {
        const totalGeneral = comparativeOfferingIncomeByType.data
          .map((item) => item.totalAmount)
          .reduce((acc, item) => acc + item, 0);

        return {
          month: offering.month,
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

    if (!comparativeOfferingIncomeByType?.data) {
      setMappedData([]);
    }
  }, [comparativeOfferingIncomeByType?.data]);

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof metricsFormSchema>): void => {
    setSearchParams(formData);
  };

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-3 h-[24rem] sm:h-[26rem] md:h-[26rem] lg:h-[30rem] 2xl:h-[30rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardHeader className='z-10 flex flex-col sm:flex-row items-center justify-between px-4 py-2.5'>
        <CardTitle className='flex justify-center items-center gap-2 font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
          Ingresos de Ofrenda (tipo)
        </CardTitle>
        <Form {...form}>
          <form className='flex'>
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
                              ? combinedArray.find((type) => type.key === field.value)?.value
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
                            {combinedArray.map(
                              (type) =>
                                type.key !== OfferingIncomeCreationType.Offering && (
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
                                )
                            )}
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
                                  type && year && form.handleSubmit(handleSubmit)();
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
      </CardHeader>

      {!comparativeOfferingIncomeByType?.data?.length && !searchParams ? (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          {comparativeOfferingIncomeByType?.isFetching &&
            !comparativeOfferingIncomeByType?.data?.length &&
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
                'w-full h-[283px] sm:h-[345px] md:h-[345px] lg:h-[410px] xl:h-[410px] 2xl:h-[410px]'
              )}
            >
              <BarChart
                accessibilityLayer
                data={mappedData}
                margin={{ top: 5, right: 5, left: -10, bottom: 10 }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  className='text-[12px] sm:text-[14px]'
                />

                <YAxis className='text-[12px] sm:text-[14px]' />
                <ChartTooltip
                  cursor={false}
                  content={ComparativeOfferingIncomeByTypeTooltipContent as any}
                />

                <ChartLegend
                  content={<ChartLegendContent className='ml-10 text-[12px] md:text-[14px]' />}
                />

                <Bar
                  dataKey='accumulatedOfferingPEN'
                  stackId='type'
                  fill='var(--color-accumulatedOfferingPEN)'
                  radius={[2, 2, 2, 2]}
                />
                <Bar
                  dataKey='accumulatedOfferingEUR'
                  stackId='type'
                  fill='var(--color-accumulatedOfferingEUR)'
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey='accumulatedOfferingUSD'
                  stackId='type'
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
          {!comparativeOfferingIncomeByType?.isFetching &&
            !comparativeOfferingIncomeByType?.data?.length &&
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
