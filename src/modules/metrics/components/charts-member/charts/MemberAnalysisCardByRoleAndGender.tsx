/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Bar, XAxis, YAxis, CartesianGrid, BarChart } from 'recharts';

import { MetricSearchType } from '@/modules/metrics/enums';
import { getMembersByRole } from '@/modules/metrics/services';
import { MembersByRoleAndGenderTooltipContent } from '@/modules/metrics/components/charts-member/tooltips/components';

import { cn } from '@/shared/lib/utils';
import { MemberRole, MemberRoleNames } from '@/shared/enums';

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
    color: '#00bcdc',
  },
  women: {
    label: 'Mujeres',
    color: '#bb3dff',
  },
} satisfies ChartConfig;

interface ResultDataOptions {
  role: string;
  men: number;
  women: number;
  totalPercentage: string;
}

export const MemberAnalysisCardByRoleAndGender = (): JSX.Element => {
  //* States
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Queries
  const { data } = useQuery({
    queryKey: ['members-by-role-and-gender'],
    queryFn: async () =>
      await getMembersByRole({
        searchType: MetricSearchType.MembersByRoleAndGender,
        year: String(new Date().getFullYear()),
      }),
  });

  //* Effects
  useEffect(() => {
    if (data) {
      const transformedData = Object.entries(data).map(([role, value]) => {
        const totalMembers: number = Object.values(data).reduce(
          (total: number, item: { men: number; women: number }) => total + item?.men + item?.women,
          0
        );

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
          men: value?.men,
          women: value?.women,
          totalPercentage: (((value?.men + value?.women) / totalMembers) * 100).toFixed(1),
        };
      });

      setMappedData(transformedData);
    }
  }, [data]);

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] md:h-[28rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardTitle className='flex justify-center items-center gap-2.5 p-2 text-center font-bold mb-2 sm:mb-0 text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
        <span className='ml-20'>Roles Eclesiásticos</span>
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
            'w-full h-[295px] sm:h-[298px] md:h-[290px] lg:h-[338px] xl:h-[338px] 2xl:h-[350px]'
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
              tickFormatter={(value) => value.slice(0, 10)}
              className='text-[12px] md:text-[14px]'
            />

            <YAxis className='text-[12px] md:text-[14px]' />
            <ChartTooltip cursor={false} content={MembersByRoleAndGenderTooltipContent as any} />

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
