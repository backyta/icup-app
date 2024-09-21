/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Bar, YAxis, XAxis, BarChart, CartesianGrid } from 'recharts';

import { cn } from '@/shared/lib/utils';
import { MemberRole, MemberRoleNames } from '@/shared/enums';

import { MetricSearchType } from '@/modules/metrics/enums';
import { getMembersByRecordStatus } from '@/modules/metrics/services';

import {
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  type ChartConfig,
  ChartLegendContent,
  ChartTooltipContent,
} from '@/shared/components/ui/chart';
import { Card, CardContent, CardTitle } from '@/shared/components/ui/card';

const chartConfig = {
  active: {
    label: 'Activos',
    color: '#22C55E',
  },
  inactive: {
    label: 'Inactivos',
    color: '#EF4444',
  },
} satisfies ChartConfig;

interface ResultDataOptions {
  role: string;
  active: number;
  inactive: number;
}

export const MemberAnalysisCardByRecordStatus = (): JSX.Element => {
  //* States
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Queries
  const { data } = useQuery({
    queryKey: ['members-by-record-status'],
    queryFn: async () =>
      await getMembersByRecordStatus({
        searchType: MetricSearchType.MembersByRecordStatus,
        year: String(new Date().getFullYear()),
      }),
  });

  //* Effects
  useEffect(() => {
    if (data) {
      const transformedData = Object.entries(data).map(([role, value]) => {
        return {
          role:
            role === MemberRole.Pastor
              ? MemberRoleNames[role]
              : role === MemberRole.Copastor
                ? MemberRoleNames[role]
                : role === MemberRole.Supervisor
                  ? MemberRoleNames[role]
                  : role === MemberRole.Preacher
                    ? MemberRoleNames[role]
                    : MemberRoleNames.disciple,
          active: value?.active,
          inactive: value?.inactive,
        };
      });
      setMappedData(transformedData);
    }
  }, [data]);

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-2 col-end-3 h-[22rem] md:h-[28rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardTitle className='font-bold text-center text-[22px] px-4 py-2.5 sm:text-[25px] md:text-[28px] 2xl:text-[30px] inline-block'>
        Estado de Registro
      </CardTitle>

      <CardContent className='h-full pl-3 pr-6 py-0'>
        <ChartContainer
          config={chartConfig}
          className={cn(
            'w-full h-[298px] sm:h-[295px] md:h-[290px] lg:h-[335px] xl:h-[335px] 2xl:h-[348px]'
          )}
        >
          <BarChart
            accessibilityLayer
            data={mappedData}
            margin={{ top: 5, right: 5, left: -28, bottom: 10 }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey='role'
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

            <Bar dataKey='active' fill='var(--color-active)' radius={4} />
            <Bar dataKey='inactive' fill='var(--color-inactive)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
