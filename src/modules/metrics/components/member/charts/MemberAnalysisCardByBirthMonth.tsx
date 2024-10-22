/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useQuery } from '@tanstack/react-query';
import { FcDataBackup, FcDeleteDatabase } from 'react-icons/fc';
import { ComposedChart, Bar, CartesianGrid, Area, XAxis, YAxis } from 'recharts';

import { MetricSearchType } from '@/modules/metrics/enums';
import { getMembersByBirthMonth } from '@/modules/metrics/services';

import { cn } from '@/shared/lib/utils';
import { RecordOrder } from '@/shared/enums';

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

interface Props {
  churchId: string | undefined;
}

export const MemberAnalysisCardByBirthMonth = ({ churchId }: Props): JSX.Element => {
  //* Queries
  const membersByBirthMonthQuery = useQuery({
    queryKey: ['members-by-birth-month', churchId],
    queryFn: () =>
      getMembersByBirthMonth({
        searchType: MetricSearchType.MembersByBirthMonth,
        year: String(new Date().getFullYear()),
        order: RecordOrder.Ascending,
        church: churchId ?? '',
      }),
    enabled: !!churchId,
  });

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-2 col-end-3 h-[22rem] md:h-[25rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardTitle className='flex items-center justify-center gap-2.5 px-4 py-2.5 text-center font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
        <span className='ml-20'>Mes de Nacimiento</span>

        <Badge
          variant='active'
          className='mt-1 text-[10px] md:text-[11px] py-0.3 md:py-0.35 tracking-wide'
        >
          Activos
        </Badge>
      </CardTitle>

      {!membersByBirthMonthQuery?.data?.length ? (
        <CardContent className='h-full pl-4 pr-6 py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full pl-4 pr-6 py-0'>
          {membersByBirthMonthQuery?.isFetching && !membersByBirthMonthQuery?.data?.length && (
            <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
              <FcDataBackup className='text-[6rem] pb-2' />
              <p>Consultando datos....</p>
            </div>
          )}
          {membersByBirthMonthQuery?.data?.length && (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[295px] sm:h-[295px] md:h-[330px] lg:h-[330px] xl:h-[330px] 2xl:h-[345px]'
              )}
            >
              <ComposedChart
                accessibilityLayer
                data={membersByBirthMonthQuery?.data}
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
          )}
          {!membersByBirthMonthQuery?.isFetching && !membersByBirthMonthQuery?.data?.length && (
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
