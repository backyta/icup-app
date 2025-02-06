/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@react-hook/media-query';
import { FcDataBackup, FcDeleteDatabase } from 'react-icons/fc';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { MetricSearchType } from '@/modules/metrics/enums/metrics-search-type.enum';
import { metricsFormSchema } from '@/modules/metrics/validations/metrics-form-schema';
import { getFluctuationFamilyGroupsByYear } from '@/modules/metrics/services/family-group-metrics.service';
import { FamilyGroupsFluctuationByYearTooltipContent } from '@/modules/metrics/components/family-group/tooltips/components/FamilyGroupsFluctuationByYearTooltipContent';

import { cn } from '@/shared/lib/utils';

import { RecordOrder } from '@/shared/enums/record-order.enum';
import { generateYearOptions } from '@/shared/helpers/generate-year-options.helper';

import {
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  type ChartConfig,
  ChartLegendContent,
} from '@/shared/components/ui/chart';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/shared/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
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
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);

  //* Media Queries
  const intermediateSM = useMediaQuery('(min-width: 640px)');
  const intermediateLG = useMediaQuery('(min-width: 1280px)');
  const intermediateXL = useMediaQuery('(min-width: 1300px)');
  const intermediate2XL = useMediaQuery('(min-width: 1450px)');

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
    retry: false,
  });

  //* Helpers
  const years = generateYearOptions(2025);

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
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] md:h-[25rem] lg:h-[27rem] 2xl:h-[27rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardHeader className='flex flex-col sm:flex-row items-center justify-between px-4 py-2.5'>
        <CardTitle className='font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px] inline-block'>
          {intermediate2XL ? (
            <span>Fluctuación de Grupos Familiares</span>
          ) : intermediateXL ? (
            <span>Fluctuación de Grupos Familiares</span>
          ) : intermediateLG ? (
            <span>Fluctuación de Grupos Familiares</span>
          ) : intermediateSM ? (
            <span>Fluctuación de Grupos Familiares</span>
          ) : (
            <span>Fluct. de Grupos Familiares</span>
          )}
        </CardTitle>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name='year'
              render={({ field }) => {
                return (
                  <FormItem className='flex justify-start gap-5 items-center'>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.handleSubmit(handleSubmit)();
                      }}
                      value={field.value}
                    >
                      <FormControl className='text-[14px] md:text-[14px] w-[4.8rem] font-medium'>
                        <SelectTrigger>
                          {field.value ? <SelectValue placeholder='Año' /> : 'Año'}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className={cn(years.length >= 3 ? 'h-[8rem]' : 'h-auto')}>
                        {Object.values(years).map(({ label, value }) => (
                          <SelectItem className={`text-[14px]`} key={value} value={label}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-[13px]' />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </CardHeader>

      {!familyGroupsFluctuationByYearQuery?.data?.length && !searchParams ? (
        <CardContent className='h-full px-2 sm:px-4 py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p className='font-medium text-[15px] md:text-[16px]'>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full px-2 sm:px-4 py-0'>
          {familyGroupsFluctuationByYearQuery?.isFetching &&
            !familyGroupsFluctuationByYearQuery?.data?.length && (
              <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
                <FcDataBackup className='text-[6rem] pb-2' />
                <p className='font-medium text-[15px] md:text-[16px]'>Consultando datos....</p>
              </div>
            )}
          {!!familyGroupsFluctuationByYearQuery?.data?.length && searchParams && (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[255px] sm:h-[285px] md:h-[330px] lg:h-[330px] xl:h-[360px] 2xl:h-[360px]'
              )}
            >
              <BarChart
                accessibilityLayer
                data={familyGroupsFluctuationByYearQuery?.data}
                margin={{ top: 5, right: 5, left: -35, bottom: 10 }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  tickFormatter={(value) => value.slice(0, 3)}
                  className='text-[12.5px] md:text-[14px]'
                />

                <YAxis className='text-[12.5px] md:text-[14px]' />

                <ChartTooltip
                  cursor={false}
                  content={FamilyGroupsFluctuationByYearTooltipContent as any}
                />

                <ChartLegend
                  content={<ChartLegendContent className='ml-8 text-[13px] md:text-[14px]' />}
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
              <div className='text-red-500 flex flex-col justify-center items-center h-full -mt-6'>
                <FcDeleteDatabase className='text-[6rem] pb-2' />
                <p className='font-medium text-[15px] md:text-[16px]'>
                  No hay datos disponibles para mostrar.
                </p>
              </div>
            )}
        </CardContent>
      )}
    </Card>
  );
};
