/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { addDays, compareAsc, parse } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { toZonedTime, format as formatZonedTime } from 'date-fns-tz';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { FcDeleteDatabase, FcDataBackup } from 'react-icons/fc';

import { cn } from '@/shared/lib/utils';
import { LoadingSpinner } from '@/shared/components';
import { dateFormatterToDDMMYY } from '@/shared/helpers';

import { CurrencyType } from '@/modules/offering/shared/enums';
import { LastSundaysOfferingsTooltipContent } from '@/modules/dashboard/components';

import { getAllChurches } from '@/modules/pastor/services';
import { DashboardSearchType } from '@/modules/dashboard/enums';
import { getOfferingsForBarChartByTerm } from '@/modules/dashboard/services';

import {
  ChartLegend,
  ChartTooltip,
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';
import { Button } from '@/shared/components/ui/button';
import { dashBoardSearchFormSchema } from '@/modules/dashboard/validations';
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

interface ResultDataOptions {
  date: string | Date;
  dayPEN: number;
  afternoonPEN: number;
  dayUSD: number;
  afternoonUSD: number;
  dayEUR: number;
  afternoonEUR: number;
}

interface SearchParamsOptions {
  selectTerm?: string;
}

export const LastSundayOfferingsCard = (): JSX.Element => {
  //* States
  const [resultData, setResultData] = useState<ResultDataOptions[]>();
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);
  const [isInputSearchChurchOpen, setIsInputSearchChurchOpen] = useState<boolean>(false);

  //* Form
  const form = useForm<z.infer<typeof dashBoardSearchFormSchema>>({
    resolver: zodResolver(dashBoardSearchFormSchema),
    mode: 'onChange',
    defaultValues: {
      selectTerm: searchParams ? searchParams.selectTerm : '',
    },
  });

  //* Watchers
  const selectTerm = form.getValues('selectTerm');

  //* Queries
  const lastSundaysOfferings = useQuery({
    queryKey: ['last-sundays-offerings', searchParams],
    queryFn: () => {
      const timeZone = 'America/Lima';
      const now = new Date();
      const zonedDate = toZonedTime(now, timeZone);

      return getOfferingsForBarChartByTerm({
        searchType: DashboardSearchType.LastSundaysOfferings,
        selectTerm: searchParams?.selectTerm ?? selectTerm,
        dateTerm: formatZonedTime(zonedDate, 'yyyy-MM-dd', { timeZone }),
        limit: '14',
        offset: '0',
        all: false,
        order: 'DESC',
      });
    },
    enabled: !!searchParams,
  });

  const churchesQuery = useQuery({
    queryKey: ['churches'],
    queryFn: getAllChurches,
  });

  //* Effects
  // Default value
  useEffect(() => {
    if (churchesQuery.data) {
      const church = churchesQuery?.data?.map((church) => church?.id)[0];
      setSearchParams({ selectTerm: church });
      form.setValue('selectTerm', church);
    }
  }, [churchesQuery?.data]);

  // Transform and set data
  useEffect(() => {
    if (lastSundaysOfferings?.data) {
      const resultData: ResultDataOptions[] = lastSundaysOfferings?.data.reduce<
        ResultDataOptions[]
      >((acc, offering) => {
        const formattedDate = dateFormatterToDDMMYY(addDays(offering.date, 1));

        const existing = acc.find((item) => item.date === formattedDate);

        if (existing) {
          if (offering.shift === 'day' && offering.currency === CurrencyType.PEN) {
            existing.dayPEN += +offering.amount;
          } else if (offering.shift === 'day' && offering.currency === CurrencyType.USD) {
            existing.dayUSD += +offering.amount;
          } else if (offering.shift === 'day' && offering.currency === CurrencyType.EUR) {
            existing.dayEUR += +offering.amount;
          } else if (offering.shift === 'afternoon' && offering.currency === CurrencyType.PEN) {
            existing.afternoonPEN += +offering.amount;
          } else if (offering.shift === 'afternoon' && offering.currency === CurrencyType.USD) {
            existing.afternoonUSD += +offering.amount;
          } else if (offering.shift === 'afternoon' && offering.currency === CurrencyType.EUR) {
            existing.afternoonEUR += +offering.amount;
          }
        } else {
          acc.push({
            date: formattedDate,
            dayPEN:
              offering.shift === 'day' && offering.currency === CurrencyType.PEN
                ? +offering.amount
                : 0,
            afternoonPEN:
              offering.shift === 'afternoon' && offering.currency === CurrencyType.PEN
                ? +offering.amount
                : 0,
            dayUSD:
              offering.shift === 'day' && offering.currency === CurrencyType.USD
                ? +offering.amount
                : 0,
            afternoonUSD:
              offering.shift === 'afternoon' && offering.currency === CurrencyType.USD
                ? +offering.amount
                : 0,
            dayEUR:
              offering.shift === 'day' && offering.currency === CurrencyType.EUR
                ? +offering.amount
                : 0,
            afternoonEUR:
              offering.shift === 'afternoon' && offering.currency === CurrencyType.EUR
                ? +offering.amount
                : 0,
          });
        }

        return acc;
      }, []);

      const resultDataSorted = resultData.sort((a, b) => {
        const dateA = parse(a.date as string, 'dd/MM/yy', new Date());
        const dateB = parse(b.date as string, 'dd/MM/yy', new Date());
        return compareAsc(dateA, dateB);
      });

      setResultData(resultDataSorted);
    }
  }, [lastSundaysOfferings?.data, searchParams]);

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof dashBoardSearchFormSchema>): void => {
    setSearchParams(formData);
  };

  return (
    <Card className='flex flex-col row-start-1 row-end-2 col-start-1 col-end-3 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-3 lg:row-start-1 lg:row-end-2 xl:col-start-1 xl:col-end-4 xl:row-start-1 xl:row-end-2 h-[23rem] lg:h-[22rem] xl:h-[25rem] 2xl:h-[26rem] m-0 border-slate-500'>
      <div className='flex flex-col md:grid md:grid-cols-4 md:justify-center md:items-center'>
        <CardHeader className='flex flex-col items-center justify-center p-2 col-span-3'>
          <CardTitle className='font-bold md:pl-[12rem] lg:pl-[16rem] xl:pl-[6.8rem] 2xl:pl-[8.5rem] 3-xl:pl-[16rem] text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50rem] 2xl:text-[1.75rem] inline-block'>
            Ofrendas - Dominicales
          </CardTitle>
          <CardDescription className='text-[13.5px] md:text-[14.5px] md:pl-[12rem] lg:pl-[16rem] xl:pl-[6.8rem] 2xl:pl-[8.5rem] 3-xl:pl-[16rem] text-center'>
            {`Ultimas ofrendas dominicales (${new Date().getFullYear()})`}
          </CardDescription>
        </CardHeader>

        {/* Form */}

        <div className='col-span-1 flex justify-center -pl-[2rem] pb-2 xl:pr-5'>
          <Form {...form}>
            <form className='flex'>
              <FormField
                control={form.control}
                name='selectTerm'
                render={({ field }) => {
                  return (
                    <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                      <Popover
                        open={isInputSearchChurchOpen}
                        onOpenChange={setIsInputSearchChurchOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'justify-between w-full text-center px-2 text-[12.5px] md:text-[14px]',
                                !field.value &&
                                  'text-slate-500 dark:text-slate-200 font-normal px-2'
                              )}
                            >
                              {field.value
                                ? churchesQuery?.data?.find((church) => church.id === field.value)
                                    ?.churchName
                                : searchParams?.selectTerm
                                  ? churchesQuery?.data?.find(
                                      (church) => church.id === searchParams.selectTerm
                                    )?.churchName
                                  : 'Iglesia'}
                              <CaretSortIcon className='h-4 w-4 shrink-0' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align='center' className='w-auto px-4 py-2'>
                          <Command>
                            <CommandInput
                              placeholder='Busque una iglesia'
                              className='h-9 text-[14px]'
                            />
                            <CommandEmpty>Iglesia no encontrada.</CommandEmpty>
                            <CommandGroup className='max-h-[100px] h-auto'>
                              {churchesQuery?.data?.map((church) => (
                                <CommandItem
                                  className='text-[14px]'
                                  value={church.churchName}
                                  key={church.id}
                                  onSelect={() => {
                                    form.setValue('selectTerm', church.id);
                                    church && form.handleSubmit(handleSubmit)();
                                    setIsInputSearchChurchOpen(false);
                                  }}
                                >
                                  {church.churchName}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      church.id === field.value ? 'opacity-100' : 'opacity-0'
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
      </div>

      {/* Chart */}

      {!resultData?.length && !searchParams ? (
        <CardContent className='h-full py-0'>
          <LoadingSpinner />
        </CardContent>
      ) : (
        <CardContent className='h-full py-0'>
          {!!resultData?.length && searchParams ? (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[250px] md:h-[290px] lg:h-[275px] xl:h-[325px] 2xl:h-[335px]'
              )}
            >
              <BarChart
                accessibilityLayer
                data={resultData}
                margin={{ top: 5, right: 5, left: -28, bottom: 10 }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='date'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  tickFormatter={(value) => value.slice(0, 8)}
                  className='text-[12px] sm:text-[14px]'
                />

                <YAxis className='text-[12px] sm:text-[14px]' />
                <ChartTooltip cursor={false} content={LastSundaysOfferingsTooltipContent as any} />

                <ChartLegend
                  content={<ChartLegendContent className='ml-10 text-[12px] sm:text-[14px]' />}
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
          ) : lastSundaysOfferings?.isFetching ? (
            <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full'>
              <FcDataBackup className='text-[6rem] pb-2' />
              <p>Consultando datos....</p>
            </div>
          ) : (
            <div className='text-red-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full'>
              <FcDeleteDatabase className='text-[6rem] pb-2' />
              <p>No hay datos disponibles para mostrar.</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
