/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { FcDataBackup, FcDeleteDatabase } from 'react-icons/fc';
import { Bar, XAxis, YAxis, CartesianGrid, BarChart } from 'recharts';

import { MetricSearchType } from '@/modules/metrics/enums';
import { getMembersByRole } from '@/modules/metrics/services';
import { MembersByRoleAndGenderTooltipContent } from '@/modules/metrics/components/member/tooltips/components';

import { cn } from '@/shared/lib/utils';
import { MemberRole, MemberRoleNames, RecordOrder } from '@/shared/enums';

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

interface Props {
  churchId: string | undefined;
}

export const MemberAnalysisCardByRoleAndGender = ({ churchId }: Props): JSX.Element => {
  //* States
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Queries
  const membersByRoleAndGenderQuery = useQuery({
    queryKey: ['members-by-role-and-gender', churchId],
    queryFn: () =>
      getMembersByRole({
        searchType: MetricSearchType.MembersByRoleAndGender,
        year: String(new Date().getFullYear()),
        order: RecordOrder.Ascending,
        church: churchId ?? '',
      }),
  });

  //* Effects
  useEffect(() => {
    if (membersByRoleAndGenderQuery?.data) {
      const transformedData = Object.entries(membersByRoleAndGenderQuery?.data).map(
        ([role, value]) => {
          const totalMembers: number = Object.values(membersByRoleAndGenderQuery?.data).reduce(
            (total: number, item: { men: number; women: number }) =>
              total + item?.men + item?.women,
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
        }
      );

      setMappedData(transformedData);
    }
  }, [membersByRoleAndGenderQuery?.data]);

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] md:h-[28rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardTitle className='flex justify-center items-center gap-2.5 px-4 py-2.5 text-center font-bold mb-2 sm:mb-0 text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
        <span className='ml-20'>Roles Eclesiásticos</span>
        <Badge
          variant='active'
          className='mt-1 text-[10px] md:text-[11px] py-0.3 md:py-0.35 tracking-wide'
        >
          Activos
        </Badge>
      </CardTitle>

      {!mappedData?.length ? (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          {membersByRoleAndGenderQuery?.isFetching && !mappedData?.length && (
            <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
              <FcDataBackup className='text-[6rem] pb-2' />
              <p>Consultando datos....</p>
            </div>
          )}
          {mappedData?.length && (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[252px] sm:h-[285px] md:h-[290px] lg:h-[330px] xl:h-[330px] 2xl:h-[345px]'
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
                <ChartTooltip
                  cursor={false}
                  content={MembersByRoleAndGenderTooltipContent as any}
                />

                <ChartLegend
                  content={<ChartLegendContent className='ml-10 text-[12px] md:text-[14px]' />}
                />

                <Bar dataKey='men' fill='var(--color-men)' radius={4} />
                <Bar dataKey='women' fill='var(--color-women)' radius={4} />
              </BarChart>
            </ChartContainer>
          )}
          {!membersByRoleAndGenderQuery?.isFetching && !mappedData?.length && (
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