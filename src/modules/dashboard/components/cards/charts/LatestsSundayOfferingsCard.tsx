/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { addDays } from 'date-fns';
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
  dia: {
    label: 'Dia',
    color: '#F09330',
  },
  tarde: {
    label: 'Tarde',
    color: '#0284C7',
  },
} satisfies ChartConfig;

interface ResultDataOptions {
  date: string | Date;
  dia: number;
  tarde: number;
}

interface SearchParamsOptions {
  selectTerm?: string;
}

//* Tooltip
const renderTooltipContent = (props: any): JSX.Element => {
  const { payload, label } = props;
  const total = payload.reduce((result: any, entry: any) => result + entry.value, 0).toFixed(2);

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <p className='font-medium text-[12px] sm:text-[14px]'>{`${label}`}</p>
      <ul className='list grid gap-1.5 '>
        {payload.map((entry: any, index: any) => (
          <li
            key={`item-${index}`}
            className='flex items-center font-medium text-[12.5px] sm:text-[14px]'
          >
            <span
              className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
              style={{
                backgroundColor: entry.color,
                border: `1px solid ${entry.color}`,
              }}
            ></span>
            <span className='font-semibold'>
              {`${entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}:`}
            </span>
            <span className='pl-1 font-normal dark:text-white text-black'>{`${entry.value} soles`}</span>
          </li>
        ))}
      </ul>
      <p className='font-medium text-[12.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>{`Total: ${total} soles`}</p>
    </div>
  );
};

export const LatestsSundayOfferingsCard = (): JSX.Element => {
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
  const latestSundayOfferings = useQuery({
    queryKey: ['latest-sunday-offerings', searchParams],
    queryFn: () => {
      const timeZone = 'America/Lima';
      const now = new Date();
      const zonedDate = toZonedTime(now, timeZone);

      return getOfferingsForBarChartByTerm({
        searchType: DashboardSearchType.LatestSundayOfferings,
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
  useEffect(() => {
    if (churchesQuery.data) {
      const church = churchesQuery?.data?.map((church) => church?.id)[0];
      setSearchParams({ selectTerm: church });
    }
  }, [churchesQuery?.data]);

  useEffect(() => {
    if (latestSundayOfferings?.data) {
      const resultData: ResultDataOptions[] = latestSundayOfferings?.data.reduce<
        ResultDataOptions[]
      >((acc, offering) => {
        const formattedDate = dateFormatterToDDMMYY(addDays(offering.date, 1));

        const existing = acc.find((item) => item.date === formattedDate);

        if (existing) {
          if (offering.shift === 'day') {
            existing.dia += +offering.amount;
          } else if (offering.shift === 'afternoon') {
            existing.tarde += +offering.amount;
          }
        } else {
          acc.push({
            date: formattedDate,
            dia: offering.shift === 'day' ? +offering.amount : 0,
            tarde: offering.shift === 'afternoon' ? +offering.amount : 0,
          });
        }

        return acc;
      }, []);

      setResultData(resultData);
    }
  }, [latestSundayOfferings?.data, searchParams]);

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
            Ultimas ofrendas dominicales
          </CardDescription>
        </CardHeader>

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
                              placeholder='Busque una iglesia...'
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
                <ChartTooltip cursor={false} content={renderTooltipContent} />

                <ChartLegend
                  content={<ChartLegendContent className='ml-10 text-[12px] sm:text-[14px]' />}
                />

                <Bar dataKey='dia' fill='var(--color-dia)' radius={4} />
                <Bar dataKey='tarde' fill='var(--color-tarde)' radius={4} />
              </BarChart>
            </ChartContainer>
          ) : latestSundayOfferings?.isFetching ? (
            <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full'>
              <FcDataBackup className='text-[6rem] pb-2' />
              <p>Consultando datos....</p>
            </div>
          ) : (
            <div className='text-red-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full'>
              <FcDeleteDatabase className='text-[6rem] pb-2' />
              <p>No hay datos disponibles por mostrar.</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
