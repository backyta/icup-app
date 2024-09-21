/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ComposedChart, Bar, CartesianGrid, Area, XAxis, YAxis } from 'recharts';

import { MetricSearchType } from '@/modules/metrics/enums';
import { getMembersByBirthMonth } from '@/modules/metrics/services';

import { cn } from '@/shared/lib/utils';

import {
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  type ChartConfig,
  ChartLegendContent,
  ChartTooltipContent,
} from '@/shared/components/ui/chart';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/shared/components/ui/card';

const chartConfig = {
  averageAge: {
    label: 'Edad Prom.',
    color: '#2662D9',
  },
  membersCount: {
    label: 'N° Miembros',
    color: '#4391ee',
  },
} satisfies ChartConfig;

interface ResultDataOptions {
  month: string;
  membersCount: number;
  averageAge: number;
}

export const MemberAnalysisCardByBirthMonth = (): JSX.Element => {
  //* States
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Queries
  const { data } = useQuery({
    queryKey: ['members-by-birth-month'],
    queryFn: async () =>
      await getMembersByBirthMonth({
        searchType: MetricSearchType.MembersByBirthMonth,
        year: String(new Date().getFullYear()),
      }),
  });

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
          membersCount: value?.membersCount,
          averageAge: value?.averageAge,
        };
      });
      setMappedData(transformedData);
    }
  }, [data]);

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-2 col-end-3 h-[22rem] md:h-[28rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardTitle className='flex items-center justify-center gap-2.5 px-4 py-2.5 text-center font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
        <span className='ml-20'>Mes de Nacimiento</span>
        <Badge
          variant='active'
          className='mt-1 text-[10px] md:text-[11px] py-0.3 md:py-0.35 tracking-wide'
        >
          Activos
        </Badge>
      </CardTitle>
      <CardContent className='h-full pl-4 pr-6 py-0'>
        <ChartContainer
          config={chartConfig}
          className={cn(
            'w-full h-[298px] sm:h-[293px] md:h-[290px] lg:h-[335px] xl:h-[335px] 2xl:h-[348px]'
          )}
        >
          <ComposedChart
            accessibilityLayer
            data={mappedData}
            margin={{ top: 5, right: 5, left: -35, bottom: 10 }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 8)}
              className='text-[12px] md:text-[14px]'
            />
            <YAxis type='number' className='text-[12px] md:text-[14px]' />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className='text-[12px] md:text-[14px] w-[10rem]'
                  indicator='dot'
                />
              }
            />

            <ChartLegend
              content={<ChartLegendContent className='ml-10 text-[12px] md:text-[14px]' />}
            />

            <Area
              dataKey='averageAge'
              type='linear'
              fill='var(--color-averageAge)'
              fillOpacity={0.4}
              stroke='var(--color-averageAge)'
            />
            <Bar dataKey='membersCount' fill='var(--color-membersCount)' radius={4} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
