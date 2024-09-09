/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { addDays } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { FcDataBackup, FcDeleteDatabase } from 'react-icons/fc';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { cn } from '@/shared/lib/utils';

import { LoadingSpinner } from '@/shared/components';
import { type FamilyGroup } from '@/shared/interfaces';
import { dateFormatterToDDMMYY } from '@/shared/helpers';
import { CurrencyType } from '@/modules/offering/shared/enums';

import { getAllChurches } from '@/modules/pastor/services';
import { DashboardSearchType } from '@/modules/dashboard/enums';

import { type Offering } from '@/modules/dashboard/interfaces';
import { RenderTooltipContent } from '@/modules/dashboard/components';
import { dashBoardSearchFormSchema } from '@/modules/dashboard/validations';
import { getOfferingsForBarChartByTerm } from '@/modules/dashboard/services';

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
    // color: '#1F77B4',
    color: '#279fb3',
  },
} satisfies ChartConfig;

interface ResultDataOptions {
  date: string | Date;
  accumulatedOfferingPEN: number;
  accumulatedOfferingUSD: number;
  accumulatedOfferingEUR: number;
  familyGroup?: FamilyGroup | undefined;
  familyGroupCode?: string | undefined;
  allOfferings: Offering[];
}

interface SearchParamsOptions {
  selectTerm?: string;
}

export const TopFamilyGroupsOfferingsCard = (): JSX.Element => {
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
  const topFamilyGroupOfferings = useQuery({
    queryKey: ['top-family-group-offerings', searchParams],
    queryFn: () => {
      return getOfferingsForBarChartByTerm({
        searchType: DashboardSearchType.TopFamilyGroupOfferings,
        selectTerm: searchParams?.selectTerm ?? selectTerm,
        dateTerm: new Date().getFullYear().toString(),
        offset: '0',
        all: true,
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
  // Default church
  useEffect(() => {
    if (churchesQuery.data) {
      const church = churchesQuery?.data?.map((church) => church?.id)[0];
      setSearchParams({ selectTerm: church });
    }
  }, [churchesQuery?.data]);

  useEffect(() => {
    if (topFamilyGroupOfferings?.data) {
      const resultData: ResultDataOptions[] = topFamilyGroupOfferings?.data.reduce<
        ResultDataOptions[]
      >((acc, offering) => {
        const formattedDate = dateFormatterToDDMMYY(addDays(offering.date, 1));

        const existing = acc.find((item) => item.familyGroup?.id === offering.familyGroup?.id);

        if (existing) {
          if (offering.currency === CurrencyType.PEN) {
            existing.accumulatedOfferingPEN += +offering.amount;
          } else if (offering.currency === CurrencyType.USD) {
            existing.accumulatedOfferingUSD += +offering.amount;
          } else if (offering.currency === CurrencyType.EUR) {
            existing.accumulatedOfferingEUR += +offering.amount;
          }

          existing.allOfferings.push({
            offering: +offering.amount,
            currency: offering.currency,
            date: formattedDate,
          });
        } else {
          acc.push({
            date: formattedDate,
            accumulatedOfferingPEN: offering.currency === CurrencyType.PEN ? +offering.amount : 0,
            accumulatedOfferingUSD: offering.currency === CurrencyType.USD ? +offering.amount : 0,
            accumulatedOfferingEUR: offering.currency === CurrencyType.EUR ? +offering.amount : 0,
            familyGroup: offering?.familyGroup ? offering?.familyGroup : undefined,
            familyGroupCode: offering.familyGroup?.familyGroupCode ?? '',
            allOfferings: [
              { offering: +offering.amount, currency: offering.currency, date: formattedDate },
            ],
          });
        }

        return acc;
      }, []);

      const top10ResultData = resultData
        .sort(
          (a, b) =>
            b.accumulatedOfferingPEN +
            b.accumulatedOfferingUSD +
            b.accumulatedOfferingEUR -
            (a.accumulatedOfferingPEN + a.accumulatedOfferingUSD + a.accumulatedOfferingEUR)
        )
        .slice(0, 10);

      setResultData(top10ResultData);
    }
  }, [topFamilyGroupOfferings?.data, searchParams]);

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof dashBoardSearchFormSchema>): void => {
    setSearchParams(formData);
  };

  return (
    <Card className='flex flex-col row-start-2 row-end-3 col-start-1 col-end-3 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 lg:row-start-2 lg:row-end-3 xl:col-start-4 xl:col-end-7 xl:row-start-1 xl:row-end-2 h-[23rem] lg:h-[22rem] xl:h-[25rem] 2xl:h-[26rem] mt-0 border-slate-500'>
      <div className='flex flex-col md:grid md:grid-cols-4 md:justify-center md:items-center'>
        <CardHeader className='flex flex-col items-center justify-center p-2 col-span-3'>
          <CardTitle className='font-bold md:pl-[12rem] lg:pl-[16rem] xl:pl-[6.8rem] 2xl:pl-[8.5rem] 3-xl:pl-[16rem] text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50rem] 2xl:text-[1.75rem] inline-block'>
            Ofrendas - Grupo Familiar
          </CardTitle>
          <CardDescription className='text-[13.5px] md:text-[14.5px] md:pl-[12rem] lg:pl-[16rem] xl:pl-[6.8rem] 2xl:pl-[8.5rem] 3-xl:pl-[16rem] text-center'>
            Grupos familiares destacados (anual)
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
                  dataKey='familyGroupCode'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  tickFormatter={(value) => value.slice(0, 12)}
                  className='text-[12px] sm:text-[14px]'
                />

                <YAxis className='text-[12px] sm:text-[14px]' />
                <ChartTooltip cursor={false} content={RenderTooltipContent as any} />

                <ChartLegend
                  content={<ChartLegendContent className='ml-10 text-[12px] sm:text-[14px]' />}
                />

                <Bar
                  dataKey='accumulatedOfferingPEN'
                  stackId='a'
                  fill='var(--color-accumulatedOfferingPEN)'
                  radius={4}
                />
                <Bar
                  dataKey='accumulatedOfferingUSD'
                  stackId='a'
                  fill='var(--color-accumulatedOfferingUSD)'
                  radius={4}
                />
                <Bar
                  dataKey='accumulatedOfferingEUR'
                  stackId='a'
                  fill='var(--color-accumulatedOfferingEUR)'
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          ) : topFamilyGroupOfferings?.isFetching ? (
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
