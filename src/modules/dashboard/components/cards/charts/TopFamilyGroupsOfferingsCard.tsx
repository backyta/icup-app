/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

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

import { getAllChurches } from '@/modules/pastor/services';
import { DashboardSearchType } from '@/modules/dashboard/enums';

import { getOfferingsForBarChartByTerm } from '@/modules/dashboard/services';
import { dashBoardSearchFormSchema } from '@/modules/dashboard/validations';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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
  accumulatedOffering: {
    label: 'Ofrenda',
    color: '#029012',
  },
} satisfies ChartConfig;

interface ListOfferings {
  offering: number;
  date: string | Date;
}

interface ResultDataOptions {
  date: string | Date;
  accumulatedOffering: number;
  familyGroup?: FamilyGroup | undefined;
  familyGroupCode?: string | undefined;
  lastOffering: number;
  allOfferings: ListOfferings[];
}

interface SearchParamsOptions {
  selectTerm?: string;
}

//* Tooltip
const renderTooltipContent = (props: any): JSX.Element => {
  const { payload, label } = props;

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
            <span className='font-semibold'>{`Ultima Ofrenda:`}</span>
            <span className='pl-1 font-normal dark:text-white text-black'>{`${entry?.payload?.lastOffering} soles - ${entry?.payload?.date}`}</span>
          </li>
        ))}
      </ul>
      <li className='pl-1 font-medium text-[12px] sm:text-[13.5px]'>
        <span className='-ml-2'>{`Pred: ${payload[0]?.payload?.familyGroup?.theirPreacher?.firstName} ${payload[0]?.payload?.familyGroup?.theirPreacher?.lastName}`}</span>
      </li>
      <li className='pl-1 font-medium text-[12px] sm:text-[13.5px]'>
        <span className='-ml-2'>{`Miembros: ${payload[0]?.payload?.familyGroup?.disciples.length}`}</span>
      </li>

      {/* <p className='font-medium text-[12.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
        Ofrendas y fechas:
        <ul>
          {payload[0]?.payload?.allOfferings?.map((offering: any, index: number) => (
            <li key={index}>{`${offering.date}: ${offering.offering} soles`}</li>
          ))}
        </ul>
      </p> */}

      <p className='font-medium text-[12.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>{`Total acumulado: ${payload[0]?.payload?.accumulatedOffering} soles`}</p>
    </div>
  );
};

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
          existing.accumulatedOffering += +offering.amount;
          existing.allOfferings.push({ offering: +offering.amount, date: formattedDate });
        } else {
          acc.push({
            date: formattedDate,
            accumulatedOffering: offering.amount ? +offering.amount : 0,
            familyGroup: offering?.familyGroup ? offering?.familyGroup : undefined,
            familyGroupCode: offering.familyGroup?.familyGroupCode
              ? offering.familyGroup?.familyGroupCode
              : '',
            lastOffering: +offering.amount,
            allOfferings: [{ offering: +offering.amount, date: formattedDate }],
          });
        }

        return acc;
      }, []);

      const top10ResultData = resultData
        .sort((a, b) => b.accumulatedOffering - a.accumulatedOffering)
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
                <ChartTooltip cursor={false} content={renderTooltipContent} />

                <ChartLegend
                  content={<ChartLegendContent className='ml-10 text-[12px] sm:text-[14px]' />}
                />

                <Bar
                  dataKey='accumulatedOffering'
                  fill='var(--color-accumulatedOffering)'
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
