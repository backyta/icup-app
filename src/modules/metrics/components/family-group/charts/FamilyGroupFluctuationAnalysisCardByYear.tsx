/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

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
import { generateYearOptions } from '@/shared/helpers';

import { MetricSearchType } from '@/modules/metrics/enums';
import { metricsFormSchema } from '@/modules/metrics/validations';
import { getFluctuationFamilyGroupsByYear } from '@/modules/metrics/services';
import { FamilyGroupsFluctuationByYearTooltipContent } from '@/modules/metrics/components/family-group/tooltips/components';

import {
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  type ChartConfig,
  ChartLegendContent,
} from '@/shared/components/ui/chart';
import {
  Command,
  CommandItem,
  CommandInput,
  CommandEmpty,
  CommandGroup,
} from '@/shared/components/ui/command';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';

const chartConfig = {
  newFamilyGroups: {
    label: 'Nuevos',
    color: '#22C55E',
  },
  inactiveFamilyGroups: {
    label: 'Bajas',
    color: '#EF4444',
  },
} satisfies ChartConfig;

interface SearchParamsOptions {
  year?: string;
}

interface Props {
  churchId: string | undefined;
}

export const FamilyGroupFluctuationAnalysisCardByYear = ({ churchId }: Props): JSX.Element => {
  //* States
  const [isInputSearchYearOpen, setIsInputSearchYearOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);

  //* Form
  const form = useForm<z.infer<typeof metricsFormSchema>>({
    resolver: zodResolver(metricsFormSchema),
    mode: 'onChange',
    defaultValues: {
      year: new Date().getFullYear().toString(),
    },
  });

  //* Watchers
  const year = form.getValues('year');

  //* Queries
  const familyGroupsFluctuationByYearQuery = useQuery({
    queryKey: ['family-groups-fluctuation-by-year', { ...searchParams, church: churchId }],
    queryFn: () =>
      getFluctuationFamilyGroupsByYear({
        searchType: MetricSearchType.FamilyGroupsFluctuationByYear,
        year: searchParams?.year ?? year,
        order: RecordOrder.Ascending,
        church: churchId ?? '',
      }),
    retry: 1,
  });

  //* Helpers
  const years = generateYearOptions();

  //* Effects
  // Default value
  useEffect(() => {
    setSearchParams({ year });
    form.setValue('year', year);
  }, [familyGroupsFluctuationByYearQuery?.data]);

  //* Form handler
  function handleSubmit(formData: z.infer<typeof metricsFormSchema>): void {
    setSearchParams(formData);
  }
  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] md:h-[25rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardHeader className='flex flex-row items-center justify-between px-4 py-2.5'>
        <CardTitle className='font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px] inline-block'>
          Fluctuación de Grupos Familiares
        </CardTitle>
        <Form {...form}>
          <form>
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
                              'justify-between w-full text-center px-2 text-[12px] md:text-[14px]',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-2'
                            )}
                          >
                            {field.value
                              ? years.find((year) => year.value === field.value)?.label
                              : 'Elige un año'}
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
                                  year && form.handleSubmit(handleSubmit)();
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

      {!familyGroupsFluctuationByYearQuery?.data?.length && !searchParams ? (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          {familyGroupsFluctuationByYearQuery?.isFetching &&
            !familyGroupsFluctuationByYearQuery?.data?.length && (
              <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
                <FcDataBackup className='text-[6rem] pb-2' />
                <p>Consultando datos....</p>
              </div>
            )}
          {!!familyGroupsFluctuationByYearQuery?.data?.length && searchParams && (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[285px] sm:h-[285px] md:h-[330px] lg:h-[330px] xl:h-[330px] 2xl:h-[345px]'
              )}
            >
              <BarChart
                accessibilityLayer
                data={familyGroupsFluctuationByYearQuery?.data}
                margin={{ top: 5, right: 5, left: -28, bottom: 10 }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  tickFormatter={(value) => value.slice(0, 3)}
                  className='text-[12px] md:text-[14px]'
                />

                <YAxis className='text-[12px] md:text-[14px]' />

                <ChartTooltip
                  cursor={false}
                  content={FamilyGroupsFluctuationByYearTooltipContent as any}
                />

                <ChartLegend
                  content={<ChartLegendContent className='ml-10 text-[12px] md:text-[14px]' />}
                />

                <Bar dataKey='newFamilyGroups' fill='var(--color-newFamilyGroups)' radius={4} />
                <Bar
                  dataKey='inactiveFamilyGroups'
                  fill='var(--color-inactiveFamilyGroups)'
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          )}
          {!familyGroupsFluctuationByYearQuery?.isFetching &&
            !familyGroupsFluctuationByYearQuery?.data?.length && (
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
