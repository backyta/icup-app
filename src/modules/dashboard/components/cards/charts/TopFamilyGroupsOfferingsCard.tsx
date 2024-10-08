/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { FcDataBackup, FcDeleteDatabase } from 'react-icons/fc';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { cn } from '@/shared/lib/utils';

import { RecordOrder } from '@/shared/enums';

import { getSimpleChurches } from '@/modules/church/services';
import { DashboardSearchType } from '@/modules/dashboard/enums';

import { TopFamilyGroupsTooltipContent } from '@/modules/dashboard/components';
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
    color: '#279fb3',
  },
} satisfies ChartConfig;

interface SearchParamsOptions {
  selectTerm?: string;
}

export const TopFamilyGroupsOfferingsCard = (): JSX.Element => {
  //* States
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);
  const [isInputSearchChurchOpen, setIsInputSearchChurchOpen] = useState<boolean>(false);

  //* Form
  const form = useForm<z.infer<typeof dashBoardSearchFormSchema>>({
    resolver: zodResolver(dashBoardSearchFormSchema),
    mode: 'onChange',
    defaultValues: {
      selectTerm: '',
    },
  });

  //* Watchers
  const selectTerm = form.getValues('selectTerm');

  //* Queries
  const topFamilyGroupOfferings = useQuery({
    queryKey: ['top-family-groups-offerings', searchParams],
    queryFn: () => {
      return getOfferingsForBarChartByTerm({
        searchType: DashboardSearchType.TopFamilyGroupsOfferings,
        selectTerm: searchParams?.selectTerm ?? selectTerm,
        dateTerm: new Date().getFullYear().toString(),
        order: RecordOrder.Descending,
      });
    },
    enabled: !!searchParams,
  });

  const churchesQuery = useQuery({
    queryKey: ['churches-for-top-family-groups'],
    queryFn: () => getSimpleChurches({ isSimpleQuery: true }),
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

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof dashBoardSearchFormSchema>): void => {
    setSearchParams(formData);
  };

  return (
    <Card className='flex flex-col row-start-2 row-end-3 col-start-1 col-end-3 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 lg:row-start-2 lg:row-end-3 xl:col-start-4 xl:col-end-7 xl:row-start-1 xl:row-end-2 h-[22rem] md:h-[28rem] lg:h-[28rem] 2xl:h-[30rem] mt-0 border-slate-500'>
      <div className='flex flex-col md:grid md:grid-cols-4 md:justify-center md:items-center'>
        <CardHeader className='flex flex-col items-center justify-center px-4 py-2.5 col-span-3'>
          <CardTitle className='font-bold md:pl-[12rem] lg:pl-[16rem] xl:pl-[6.8rem] 2xl:pl-[8.5rem] 3-xl:pl-[16rem] text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50rem] 2xl:text-[1.75rem] inline-block'>
            Ofrendas - Grupo Familiar
          </CardTitle>
          <CardDescription className='text-[13.5px] md:text-[14.5px] md:pl-[12rem] lg:pl-[16rem] xl:pl-[6.8rem] 2xl:pl-[8.5rem] 3-xl:pl-[16rem] text-center'>
            {`Grupos familiares destacados (${new Date().getFullYear()})`}
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
                                'justify-between w-full text-center px-2 text-[12px] md:text-[14px]',
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
                                  : 'Iglesia Central'}
                              <CaretSortIcon className='h-4 w-4 shrink-0' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align='center' className='w-auto px-4 py-2'>
                          <Command>
                            <CommandInput
                              placeholder='Busque una iglesia'
                              className='h-9 text-[12px] md:text-[14px]'
                            />
                            <CommandEmpty>Iglesia no encontrada.</CommandEmpty>
                            <CommandGroup className='max-h-[100px] h-auto'>
                              {churchesQuery?.data?.map((church) => (
                                <CommandItem
                                  className='text-[12px] md:text-[14px]'
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

      {!topFamilyGroupOfferings?.data?.length && !searchParams ? (
        <CardContent className='h-full py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full py-0'>
          {topFamilyGroupOfferings?.isFetching && !topFamilyGroupOfferings?.data?.length && (
            <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
              <FcDataBackup className='text-[6rem] pb-2' />
              <p>Consultando datos....</p>
            </div>
          )}
          {!!topFamilyGroupOfferings?.data?.length && searchParams && (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[230px] sm:h-[290px] md:h-[360px] lg:h-[365px] xl:h-[365px] 2xl:h-[395px]'
              )}
            >
              <BarChart
                accessibilityLayer
                data={topFamilyGroupOfferings?.data}
                margin={{ top: 5, right: 5, left: -28, bottom: 10 }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='familyGroup.familyGroupCode'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  tickFormatter={(value) => value.slice(0, 12)}
                  className='text-[12px] sm:text-[14px]'
                />

                <YAxis className='text-[12px] sm:text-[14px]' />
                <ChartTooltip cursor={false} content={TopFamilyGroupsTooltipContent as any} />

                <ChartLegend
                  content={<ChartLegendContent className='ml-10 text-[12px] sm:text-[14px]' />}
                />

                <Bar
                  dataKey='accumulatedOfferingPEN'
                  stackId='familyGroup'
                  fill='var(--color-accumulatedOfferingPEN)'
                  radius={[2, 2, 2, 2]}
                />
                <Bar
                  dataKey='accumulatedOfferingEUR'
                  stackId='familyGroup'
                  fill='var(--color-accumulatedOfferingEUR)'
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey='accumulatedOfferingUSD'
                  stackId='familyGroup'
                  fill='var(--color-accumulatedOfferingUSD)'
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          )}
          {!topFamilyGroupOfferings?.isFetching && !topFamilyGroupOfferings?.data?.length && (
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
