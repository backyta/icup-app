/* eslint-disable no-unneeded-ternary */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/shared/lib/utils';
import { FcDataBackup, FcDeleteDatabase } from 'react-icons/fc';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';

import { LoadingSpinner } from '@/shared/components';
import { getFullNames, getInitialFullNames } from '@/shared/helpers';

import { getAllCopastors } from '@/modules/supervisor/services';

import { MetricSearchType } from '@/modules/metrics/enums';
import { metricsFormSchema } from '@/modules/metrics/validations';
import { getMembersByZoneAndGender } from '@/modules/metrics/services';
import { MembersByZoneAndGenderTooltipContent } from '@/modules/metrics/components/charts-member/tooltips/components';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from '@/shared/components/ui/form';
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
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

const chartConfig = {
  men: {
    label: 'Varones',
    color: '#2662D9',
  },
  women: {
    label: 'Mujeres',
    color: '#E23670',
  },
} satisfies ChartConfig;

interface ResultDataOptions {
  zoneName: string;
  supervisor: string;
  men: number;
  women: number;
  totalPercentage: string;
}

interface SearchParamsOptions {
  copastor?: string;
  allZones?: boolean;
}

export const MemberAnalysisCardByZoneAndGender = (): JSX.Element => {
  //* States
  const [isInputSearchZoneOpen, setIsInputSearchZoneOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Form
  const form = useForm<z.infer<typeof metricsFormSchema>>({
    resolver: zodResolver(metricsFormSchema),
    mode: 'onChange',
    defaultValues: {
      copastor: searchParams ? searchParams.copastor : '',
      all: false,
    },
  });

  //* Watchers
  const copastor = form.watch('copastor');
  const all = form.watch('all');

  //* Queries
  const membersByZoneAndGenderQuery = useQuery({
    queryKey: ['members-by-zone-and-gender', searchParams],
    queryFn: async () => {
      return await getMembersByZoneAndGender({
        searchType: MetricSearchType.MembersByZoneAndGender,
        copastor: searchParams?.copastor ?? copastor,
        allZones: !!all,
      });
    },
    enabled: !!searchParams,
  });

  const copastorsQuery = useQuery({
    queryKey: ['copastors'],
    queryFn: getAllCopastors,
  });

  //* Effects
  // Default value
  useEffect(() => {
    if (copastorsQuery.data) {
      const copastor = copastorsQuery?.data?.map((copastor) => copastor?.id)[0];
      setSearchParams({ copastor });
      form.setValue('copastor', copastor);
      form.setValue('all', false);
    }
  }, [copastorsQuery?.data]);

  // Set data
  useEffect(() => {
    if (membersByZoneAndGenderQuery?.data) {
      const transformedData = Object.entries(membersByZoneAndGenderQuery?.data).map(
        ([zoneName, payload]) => {
          const totalMembers: number = Object.values(membersByZoneAndGenderQuery?.data).reduce(
            (total: number, item: { men: number; women: number }) => total + item.men + item.women,
            0
          );

          return {
            zoneName,
            men: payload?.men,
            women: payload?.women,
            supervisor: payload?.supervisor,
            totalPercentage: (((payload.men + payload?.women) / totalMembers) * 100).toFixed(1),
          };
        }
      );
      setMappedData(transformedData);
    }
  }, [membersByZoneAndGenderQuery?.data, copastor]);

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof metricsFormSchema>): void => {
    setSearchParams(formData);
  };

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] md:h-[28rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardHeader className='flex flex-col sm:flex-row items-center justify-between px-4 py-2'>
        <CardTitle className=' flex justify-center items-center gap-2 font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
          <span>Discípulos (zona)</span>
          <Badge
            variant='active'
            className='mt-1.5 text-[10px] md:text-[11px] py-0.3 md:py-0.35 tracking-wide'
          >
            Activos
          </Badge>
        </CardTitle>
        <Form {...form}>
          <form className='flex'>
            <FormField
              control={form.control}
              name='copastor'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover open={isInputSearchZoneOpen} onOpenChange={setIsInputSearchZoneOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={all}
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-center overflow-hidden px-2 text-[12px] md:text-[14px]',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-2'
                            )}
                          >
                            {field.value
                              ? `${getInitialFullNames({ firstNames: copastorsQuery?.data?.find((copastor) => copastor.id === searchParams?.copastor)?.firstName!, lastNames: '' })} ${copastorsQuery?.data?.find((copastor) => copastor.id === searchParams?.copastor)?.lastName}`
                              : searchParams?.copastor
                                ? `${getInitialFullNames({ firstNames: copastorsQuery?.data?.find((copastor) => copastor.id === searchParams?.copastor)?.firstName!, lastNames: '' })} ${copastorsQuery?.data?.find((copastor) => copastor.id === searchParams?.copastor)?.lastName}`
                                : 'Seleccione un co-pastor'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un co-pastor...'
                            className='h-9 text-[12px] md:text-[14px]'
                          />
                          <CommandEmpty>Co-pastor no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {copastorsQuery?.data?.map((copastor) => (
                              <CommandItem
                                className='text-[12px] md:text-[14px]'
                                value={getFullNames({
                                  firstNames: copastor.firstName,
                                  lastNames: copastor.lastName,
                                })}
                                key={copastor.id}
                                onSelect={() => {
                                  form.setValue('copastor', copastor.id);
                                  form.handleSubmit(handleSubmit)();
                                  setIsInputSearchZoneOpen(false);
                                }}
                              >
                                {`${getInitialFullNames({ firstNames: copastor.firstName, lastNames: '' })} ${copastor.lastName}`}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    copastor.id === field.value ? 'opacity-100' : 'opacity-0'
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
              name='all'
              render={({ field }) => (
                <FormItem className='flex flex-row items-end space-x-3 space-y-0 rounded-md border p-3 h-[2.5rem]'>
                  <FormControl>
                    <Checkbox
                      checked={field?.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        form.handleSubmit(handleSubmit)();
                      }}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel className='text-[12px] md:text-[14px]'>Todos</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardHeader>

      {!mappedData?.length && !searchParams ? (
        <CardContent className='h-full py-0'>
          <LoadingSpinner />
        </CardContent>
      ) : (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          {!!mappedData?.length && searchParams ? (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[255px] sm:h-[285px] md:h-[290px] lg:h-[335px] xl:h-[332px] 2xl:h-[350px]'
              )}
            >
              <AreaChart
                accessibilityLayer
                data={mappedData}
                margin={{ top: 5, right: 5, left: -28, bottom: 10 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='zoneName'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className='text-[12px] md:text-[14px]'
                  tickFormatter={(value) => value.slice(0, 7)}
                />
                <YAxis type='number' className='text-[12px] md:text-[14px]' />

                <ChartTooltip
                  cursor={false}
                  content={MembersByZoneAndGenderTooltipContent as any}
                />

                <Area
                  dataKey='men'
                  type='natural'
                  fill='var(--color-men)'
                  fillOpacity={0.4}
                  stroke='var(--color-men)'
                  stackId='men'
                />
                <Area
                  dataKey='women'
                  type='natural'
                  fill='var(--color-women)'
                  fillOpacity={0.4}
                  stroke='var(--color-women)'
                  stackId='women'
                />
                <ChartLegend
                  content={<ChartLegendContent className='ml-10 text-[12px] md:text-[14px]' />}
                />
              </AreaChart>
            </ChartContainer>
          ) : copastorsQuery?.isFetching ? (
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
