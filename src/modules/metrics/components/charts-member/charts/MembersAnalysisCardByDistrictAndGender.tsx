/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/shared/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Bar, XAxis, YAxis, CartesianGrid, BarChart } from 'recharts';

import { District } from '@/shared/enums';

import { MetricSearchType } from '@/modules/metrics/enums';
import { metricsFormSchema } from '@/modules/metrics/validations';
import { getMembersByDistrictAndGender } from '@/modules/metrics/services';
import { MembersByDistrictAndGenderTooltipContent } from '@/modules/metrics/components/charts-member/tooltips/components';

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
  urbanSector: {
    label: 'Sector Urbano',
  },
  men: {
    label: 'Varones',
    color: '#62d723',
  },
  women: {
    label: 'Mujeres',
    color: '#d256c1',
  },
} satisfies ChartConfig;

interface ResultDataOptions {
  urbanSectorName: string;
  men: number;
  women: number;
  totalPercentage: string;
}

interface SearchParamsOptions {
  district?: string;
}

export const MembersAnalysisCardByDistrictAndGender = (): JSX.Element => {
  //* States
  const [isInputSearchDistrictOpen, setIsInputSearchDistrictOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Form
  const form = useForm<z.infer<typeof metricsFormSchema>>({
    resolver: zodResolver(metricsFormSchema),
    mode: 'onChange',
    defaultValues: {
      district: District.Independencia,
    },
  });

  //* Watchers
  const district = form.watch('district');
  const all = form.watch('all');

  //* Queries
  const { data } = useQuery({
    queryKey: ['members-by-district-and-gender', searchParams],
    queryFn: async () => {
      return await getMembersByDistrictAndGender({
        searchType: MetricSearchType.MembersByDistrictAndGender,
        district: searchParams?.district ?? district,
      });
    },
    enabled: !!searchParams,
  });

  //* Effects
  // Default value
  useEffect(() => {
    setSearchParams({ district });
    form.setValue('district', district);
  }, [data]);

  // Set data
  useEffect(() => {
    if (data) {
      const transformedData = Object.entries(data).map(([urbanSectorName, payload]) => {
        const totalMembers: number = Object.values(data).reduce(
          (total: number, item: { men: number; women: number }) => total + item?.men + item?.women,
          0
        );

        return {
          urbanSectorName,
          men: payload?.men,
          women: payload?.women,
          totalPercentage: (((payload?.men + payload?.women) / totalMembers) * 100).toFixed(1),
        };
      });
      setMappedData(transformedData);
    }
  }, [data, district]);

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof metricsFormSchema>): void => {
    setSearchParams(formData);
  };

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] md:h-[28rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardHeader className='flex flex-col sm:flex-row items-center justify-between px-4 py-2'>
        <CardTitle className='flex justify-center items-center gap-2 font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
          <span>Distrito - Sector Urbano</span>
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
              name='district'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover
                      open={isInputSearchDistrictOpen}
                      onOpenChange={setIsInputSearchDistrictOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={all}
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-center px-2 text-[12px] md:text-[14px]',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-4'
                            )}
                          >
                            {field.value
                              ? Object.values(District).find((district) => district === field.value)
                              : 'Elige un distrito'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un distrito...'
                            className='h-9 text-[12px] md:text-[14px]'
                          />
                          <CommandEmpty>Co-pastor no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {Object.values(District).map((district) => (
                              <CommandItem
                                className='text-[12px] md:text-[14px]'
                                value={district}
                                key={district}
                                onSelect={() => {
                                  form.setValue('district', district);
                                  form.handleSubmit(handleSubmit)();
                                  setIsInputSearchDistrictOpen(false);
                                }}
                              >
                                {district}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    district === field.value ? 'opacity-100' : 'opacity-0'
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
            'w-full h-[258px] sm:h-[290px] md:h-[290px] lg:h-[335px] xl:h-[335px] 2xl:h-[350px]'
          )}
        >
          <BarChart
            accessibilityLayer
            data={mappedData}
            margin={{ top: 5, right: 5, left: -28, bottom: 10 }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey='urbanSectorName'
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 10)}
              className='text-[12px] md:text-[14px]'
            />
            <YAxis type='number' className='text-[12px] md:text-[14px]' />
            <ChartTooltip
              cursor={false}
              content={MembersByDistrictAndGenderTooltipContent as any}
            />
            <ChartLegend
              content={<ChartLegendContent className='ml-10 text-[12px] md:text-[14px]' />}
            />
            <Bar dataKey='men' fill='var(--color-men)' radius={4} />
            <Bar dataKey='women' fill='var(--color-women)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
