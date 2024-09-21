/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { metricsFormSchema } from '@/modules/metrics/validations';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Bar, YAxis, XAxis, BarChart, CartesianGrid } from 'recharts';

import { cn } from '@/shared/lib/utils';

import { MetricSearchType } from '@/modules/metrics/enums';
import { getFluctuationMembersByYear } from '@/modules/metrics/services';

import { generateYearOptions } from '@/shared/helpers';

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
  ChartTooltipContent,
} from '@/shared/components/ui/chart';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';

const chartConfig = {
  newMembers: {
    label: 'Nuevos',
    color: '#22C55E',
  },
  inactiveMembers: {
    label: 'Bajas',
    color: '#EF4444',
  },
} satisfies ChartConfig;

interface SearchParamsOptions {
  year?: string;
}

interface ResultDataOptions {
  month: string;
  newMembers: number;
  inactiveMembers: number;
}

export const MemberFluctuationAnalysisCardByYear = (): JSX.Element => {
  //* States
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();
  const [isInputSearchYearOpen, setIsInputSearchYearOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);

  //* Form
  const form = useForm<z.infer<typeof metricsFormSchema>>({
    resolver: zodResolver(metricsFormSchema),
    mode: 'onChange',
    defaultValues: {
      year: '2024',
    },
  });

  //* Watchers
  const year = form.getValues('year');

  //* Queries
  const { data } = useQuery({
    queryKey: ['members-fluctuation-by-year', searchParams],
    queryFn: async () =>
      await getFluctuationMembersByYear({
        searchType: MetricSearchType.MembersFluctuationByYear,
        year: searchParams?.year ?? year,
      }),
  });

  //* Helpers
  const years = generateYearOptions();

  //* Effects
  useEffect(() => {
    const monthNames = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];

    if (data) {
      const transformedData = Object.entries(data).map(([_, value], index) => {
        return {
          month: monthNames[index],
          newMembers: value?.new,
          inactiveMembers: value?.inactive,
        };
      });
      setMappedData(transformedData);
    }
  }, [data]);

  //* Form handler
  function handleSubmit(formData: z.infer<typeof metricsFormSchema>): void {
    setSearchParams(formData);
  }

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] md:h-[28rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardHeader className='flex flex-row items-center justify-between px-4 py-2'>
        <CardTitle className='font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px] inline-block'>
          Fluctuación de Miembros
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

      <CardContent className='h-full pl-3 pr-6 py-0'>
        <ChartContainer
          config={chartConfig}
          className={cn(
            'w-full h-[288px] sm:h-[288px] md:h-[290px] lg:h-[335px] xl:h-[335px] 2xl:h-[350px]'
          )}
        >
          <BarChart
            accessibilityLayer
            data={mappedData}
            margin={{ top: 5, right: 5, left: -28, bottom: 10 }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 8)}
              className='text-[12px] md:text-[14px]'
            />

            <YAxis className='text-[12px] md:text-[14px]' />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent indicator='dot' className='text-[12px] md:text-[14px]' />
              }
            />

            <ChartLegend
              content={<ChartLegendContent className='ml-10 text-[12px] md:text-[14px]' />}
            />

            <Bar dataKey='newMembers' fill='var(--color-newMembers)' radius={4} />
            <Bar dataKey='inactiveMembers' fill='var(--color-inactiveMembers)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
