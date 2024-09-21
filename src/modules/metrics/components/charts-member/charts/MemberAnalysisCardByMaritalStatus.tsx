/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

import { MetricSearchType } from '@/modules/metrics/enums';
import { getMembersByMaritalStatus } from '@/modules/metrics/services';

import { cn } from '@/shared/lib/utils';

import {
  ChartTooltip,
  ChartContainer,
  type ChartConfig,
  ChartTooltipContent,
} from '@/shared/components/ui/chart';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/shared/components/ui/card';

const chartConfig = {
  membersCount: {
    label: 'Miembros',
  },
  single: {
    label: 'Soltero(a)',
    color: '#0088FE',
  },
  married: {
    label: 'Casado(a)',
    color: '#00C49F',
  },
  windowed: {
    label: 'Viudo(a)',
    color: '#FFBB28',
  },
  divorced: {
    label: 'Divorciado(a)',
    color: '#FF8042',
  },
  other: {
    label: 'Otro',
    color: '#b431ff',
  },
} satisfies ChartConfig;

interface ResultDataOptions {
  maritalStatus: string;
  membersCount: number;
  fill: string;
}

export const MemberAnalysisCardByMaritalStatus = (): JSX.Element => {
  //* States
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Queries
  const { data } = useQuery({
    queryKey: ['members-by-marital-status'],
    queryFn: async () =>
      await getMembersByMaritalStatus({
        searchType: MetricSearchType.MembersByMaritalStatus,
        year: String(new Date().getFullYear()),
      }),
  });

  //* Effects
  useEffect(() => {
    if (data) {
      const transformedData = Object.entries(data).map(([maritalStatus, membersCount]) => {
        return {
          maritalStatus,
          membersCount,
          fill: `var(--color-${maritalStatus})`,
        };
      });

      setMappedData(transformedData);
    }
  }, [data]);

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-2 col-end-3 h-[22rem] md:h-[28rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardTitle className='flex justify-center items-center gap-2.5 px-4 py-2.5 text-center font-bold  text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
        <span className='ml-20'>Estado civil</span>
        <Badge
          variant='active'
          className='mt-1 text-[10px] md:text-[11px] py-0.3 md:py-0.35 tracking-wide'
        >
          Activos
        </Badge>
      </CardTitle>

      <CardContent className='h-full pl-3 pr-5 py-0'>
        <ChartContainer
          config={chartConfig}
          className={cn(
            'w-full h-[300px] sm:h-[300px] md:h-[300px] lg:h-[338px] xl:h-[335px] 2xl:h-[345px]'
          )}
        >
          <BarChart
            accessibilityLayer
            data={mappedData}
            layout='vertical'
            margin={{ top: 5, right: 5, left: 38, bottom: 10 }}
            className='-ml-3 md:ml-0'
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey='maritalStatus'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className='text-[12px] md:text-[14px]'
              tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
            />
            <XAxis dataKey='membersCount' type='number' hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className='text-[12px] md:text-[13px]' />}
            />

            <Bar dataKey='membersCount' layout='vertical' radius={5}></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
