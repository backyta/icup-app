/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { addDays, format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@react-hook/media-query';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Bar, XAxis, YAxis, CartesianGrid, BarChart } from 'recharts';
import { FcDataBackup, FcDeleteDatabase, FcDataConfiguration } from 'react-icons/fc';

import { cn } from '@/shared/lib/utils';

import { RecordOrder } from '@/shared/enums';
import { dateFormatterToDDMMYY, generateYearOptions } from '@/shared/helpers';

import { months } from '@/modules/metrics/data';
import { MetricSearchType } from '@/modules/metrics/enums';
import { metricsFormSchema } from '@/modules/metrics/validations';
import { getOfferingIncomeBySundayService } from '@/modules/metrics/services';
import { OfferingIncomeBySundayServiceTooltipContent } from '@/modules/metrics/components/offering-income/tooltips/components';

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
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';

const chartConfig = {
  dayPEN: {
    label: 'Día PEN',
    color: '#F09330',
  },
  afternoonPEN: {
    label: 'Tarde PEN',
    color: '#0284C7',
  },
  dayUSD: {
    label: 'Día USD',
    color: '#4CAF50',
  },
  afternoonUSD: {
    label: 'Tarde USD',
    color: '#E23670',
  },
  dayEUR: {
    label: 'Día EUR',
    color: '#8E44AD',
  },
  afternoonEUR: {
    label: 'Tarde EUR',
    color: '#edc505',
  },
} satisfies ChartConfig;

interface SearchParamsOptions {
  month?: string;
  year?: string;
}

interface Props {
  churchId: string | undefined;
}

export const OfferingIncomeAnalysisCardBySundayService = ({ churchId }: Props): JSX.Element => {
  //* States
  const [isInputSearchMonthOpen, setIsInputSearchMonthOpen] = useState<boolean>(false);
  const [isInputSearchYearOpen, setIsInputSearchYearOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);

  //* Form
  const form = useForm<z.infer<typeof metricsFormSchema>>({
    resolver: zodResolver(metricsFormSchema),
    mode: 'onChange',
    defaultValues: {
      month: format(new Date(), 'MMMM').toLowerCase(),
      year: new Date().getFullYear().toString(),
    },
  });

  //* Media Queries
  const intermediateLG = useMediaQuery('(min-width: 1280px)');
  const intermediateXL = useMediaQuery('(min-width: 1375px)');
  const intermediate2XL = useMediaQuery('(min-width: 1500px)');

  //* Watchers
  const year = form.watch('year');
  const month = form.watch('month');

  const offeringIncomeBySundayService = useQuery({
    queryKey: ['offering-income-by-sunday-service', { ...searchParams, church: churchId }],
    queryFn: () => {
      return getOfferingIncomeBySundayService({
        searchType: MetricSearchType.OfferingIncomeBySundayService,
        month: searchParams?.month ?? month,
        year: searchParams?.year ?? year,
        isSingleMonth: true,
        order: RecordOrder.Ascending,
        church: churchId ?? '',
      });
    },
    retry: 1,
    enabled: !!searchParams?.year && !!searchParams?.month && !!churchId,
  });

  //* Helpers
  const years = generateYearOptions();

  //* Effects
  // Default value
  useEffect(() => {
    setSearchParams({ year, month });
  }, [offeringIncomeBySundayService?.data, year]);

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof metricsFormSchema>): void => {
    setSearchParams(formData);
  };

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[24rem] md:h-[25rem] lg:h-[26rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardHeader className='z-10 flex flex-col sm:flex-row items-center justify-between px-4 py-2.5'>
        <CardTitle className='flex justify-center items-center gap-2 font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
          {intermediate2XL ? (
            <span>Ofrendas Dominicales</span>
          ) : intermediateXL ? (
            <span>Ofrendas Dominicales</span>
          ) : intermediateLG ? (
            <span>Ofre. Dominicales</span>
          ) : (
            <span>Ofrendas Dominicales</span>
          )}
          {offeringIncomeBySundayService?.data &&
            Object.entries(offeringIncomeBySundayService?.data)?.length > 0 && (
              <Badge
                variant='active'
                className='mt-1 text-[10px] md:text-[11px] py-0.3 md:py-0.35 tracking-wide'
              >
                Activos
              </Badge>
            )}
        </CardTitle>
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
                              'justify-between text-[12px] md:text-[14px] w-full text-center px-2',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-4'
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
                                  form.setValue('month', month.value);
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
      </CardHeader>

      {!offeringIncomeBySundayService?.data?.length && !searchParams ? (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          {offeringIncomeBySundayService?.isFetching &&
            !offeringIncomeBySundayService?.data?.length &&
            year && (
              <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
                <FcDataBackup className='text-[6rem] pb-2' />
                <p>Consultando datos....</p>
              </div>
            )}

          {!!offeringIncomeBySundayService?.data?.length && searchParams && (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[285px] sm:h-[315px] md:h-[330px] lg:h-[345px] xl:h-[345px] 2xl:h-[345px]'
              )}
            >
              <BarChart
                accessibilityLayer
                data={offeringIncomeBySundayService?.data}
                margin={{ top: 5, right: 5, left: -28, bottom: 10 }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='date'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  tickFormatter={(value) => dateFormatterToDDMMYY(addDays(value, 1))}
                  className='text-[12px] sm:text-[14px]'
                />

                <YAxis className='text-[12px] sm:text-[14px]' />
                <ChartTooltip
                  cursor={false}
                  content={OfferingIncomeBySundayServiceTooltipContent as any}
                />

                <ChartLegend
                  content={<ChartLegendContent className='ml-10 text-[12px] md:text-[14px]' />}
                />

                <Bar
                  dataKey='dayPEN'
                  name={chartConfig.dayPEN.label}
                  stackId='day'
                  fill='var(--color-dayPEN)'
                  radius={[2, 2, 2, 2]}
                />
                <Bar
                  dataKey='dayEUR'
                  name={chartConfig.dayEUR.label}
                  stackId='day'
                  fill='var(--color-dayEUR)'
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey='dayUSD'
                  name={chartConfig.dayUSD.label}
                  stackId='day'
                  fill='var(--color-dayUSD)'
                  radius={[2, 2, 0, 0]}
                />

                <Bar
                  dataKey='afternoonPEN'
                  name={chartConfig.afternoonPEN.label}
                  stackId='afternoon'
                  fill='var(--color-afternoonPEN)'
                  radius={[2, 2, 2, 2]}
                />
                <Bar
                  dataKey='afternoonEUR'
                  name={chartConfig.afternoonEUR.label}
                  stackId='afternoon'
                  fill='var(--color-afternoonEUR)'
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey='afternoonUSD'
                  name={chartConfig.afternoonUSD.label}
                  stackId='afternoon'
                  fill='var(--color-afternoonUSD)'
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          )}
          {!year && !offeringIncomeBySundayService?.data?.length && (
            <div className='text-emerald-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
              <FcDataConfiguration className='text-[6rem] pb-2' />
              <p>Esperando parámetros de consulta...</p>
            </div>
          )}
          {!offeringIncomeBySundayService?.isFetching &&
            !offeringIncomeBySundayService?.data?.length &&
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
