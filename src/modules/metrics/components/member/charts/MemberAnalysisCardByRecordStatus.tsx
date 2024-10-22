/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { FcDataBackup, FcDeleteDatabase } from 'react-icons/fc';
import { Bar, YAxis, XAxis, BarChart, CartesianGrid } from 'recharts';

import { cn } from '@/shared/lib/utils';
import { MemberRole, MemberRoleNames, RecordOrder } from '@/shared/enums';

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

interface Props {
  churchId: string | undefined;
}

export const MemberAnalysisCardByRecordStatus = ({ churchId }: Props): JSX.Element => {
  //* States
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Queries
  const membersByRecordStatusQuery = useQuery({
    queryKey: ['members-by-record-status', churchId],
    queryFn: () =>
      getMembersByRecordStatus({
        searchType: MetricSearchType.MembersByRecordStatus,
        year: String(new Date().getFullYear()),
        order: RecordOrder.Ascending,
        church: churchId ?? '',
      }),
    enabled: !!churchId,
  });

  //* Effects
  useEffect(() => {
    if (membersByRecordStatusQuery?.data) {
      const transformedData = Object.entries(membersByRecordStatusQuery?.data).map(
        ([role, payload]) => {
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
            active: payload?.active,
            inactive: payload?.inactive,
          };
        }
      );

      setMappedData(transformedData);
    }
  }, [membersByRecordStatusQuery?.data]);

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-2 col-end-3 h-[22rem] md:h-[25rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardTitle className='font-bold text-center text-[22px] px-4 py-2.5 sm:text-[25px] md:text-[28px] 2xl:text-[30px] inline-block'>
        Estado de Registro
      </CardTitle>

      {!mappedData?.length ? (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          {membersByRecordStatusQuery?.isFetching && !mappedData?.length && (
            <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
              <FcDataBackup className='text-[6rem] pb-2' />
              <p>Consultando datos....</p>
            </div>
          )}
        </CardContent>
      ) : (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          {membersByRecordStatusQuery?.isFetching && !mappedData?.length && (
            <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
              <FcDataBackup className='text-[6rem] pb-2' />
              <p>Consultando datos....</p>
            </div>
          )}
          {mappedData?.length && (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[295px] sm:h-[295px] md:h-[330px] lg:h-[330px] xl:h-[330px] 2xl:h-[345px]'
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
          )}
          {!membersByRecordStatusQuery?.isFetching && !mappedData?.length && (
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
