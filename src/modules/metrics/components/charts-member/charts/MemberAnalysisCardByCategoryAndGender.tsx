/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { CartesianGrid, Area, AreaChart, XAxis, YAxis } from 'recharts';

import { MetricSearchType } from '@/modules/metrics/enums';
import { getMembersByCategoryAndGender } from '@/modules/metrics/services';
import { MembersByCategoryAndGenderTooltipContent } from '@/modules/metrics/components/charts-member/tooltips/components';

import { cn } from '@/shared/lib/utils';

import {
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  type ChartConfig,
  ChartLegendContent,
} from '@/shared/components/ui/chart';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/shared/components/ui/card';

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
  category: string;
  men: number;
  women: number;
  totalPercentage: string;
}

export const MemberAnalysisCardByCategoryAndGender = (): JSX.Element => {
  //* States
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Queries
  const { data } = useQuery({
    queryKey: ['members-by-category-and-gender'],
    queryFn: async () =>
      await getMembersByCategoryAndGender({
        searchType: MetricSearchType.MembersByCategoryAndGender,
        year: String(new Date().getFullYear()),
      }),
  });

  //* Effects
  useEffect(() => {
    if (data) {
      const transformedData = Object.entries(data).map(([category, value]) => {
        const totalMembers: number = Object.values(data).reduce(
          (total: number, item: { men: number; women: number }) => total + item?.men + item?.women,
          0
        );

        return {
          category:
            category === 'child'
              ? 'Niño'
              : category === 'teenager'
                ? 'Adolescente'
                : category === 'youth'
                  ? 'Joven'
                  : category === 'adult'
                    ? 'Adulto'
                    : category === 'middleAged'
                      ? 'Adulto Mayor'
                      : 'Anciano',
          men: value?.men,
          women: value?.women,
          totalPercentage: (((value?.men + value?.women) / totalMembers) * 100).toFixed(1),
        };
      });

      setMappedData(transformedData);
    }
  }, [data]);

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40  flex flex-col col-start-2 col-end-3 h-[22rem] md:h-[28rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardTitle className='flex justify-center items-center gap-2.5 px-4 py-2.5 text-center font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
        <span className='ml-20'>Categoría y Género</span>

        <Badge
          variant='active'
          className='mt-1 text-[10px] md:text-[11px] py-0.3 md:py-0.35 tracking-wide'
        >
          Activos
        </Badge>
      </CardTitle>

      <CardContent className='h-full pl-3 pr-6 py-0'>
        <ChartContainer
          config={chartConfig}
          className={cn(
            'w-full h-[298px] sm:h-[293px] md:h-[290px] lg:h-[335px] xl:h-[335px] 2xl:h-[348px]'
          )}
        >
          <AreaChart
            accessibilityLayer
            data={mappedData}
            margin={{ top: 5, right: 5, left: -28, bottom: 10 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='category'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className='text-[12px] md:text-[14px]'
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis type='number' className='text-[12px] md:text-[14px]' />

            <ChartTooltip
              cursor={false}
              content={MembersByCategoryAndGenderTooltipContent as any}
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
      </CardContent>
    </Card>
  );
};
