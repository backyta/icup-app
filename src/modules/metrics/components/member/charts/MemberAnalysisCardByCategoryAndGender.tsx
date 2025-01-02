/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { FcDataBackup, FcDeleteDatabase } from 'react-icons/fc';
import { CartesianGrid, Area, AreaChart, XAxis, YAxis } from 'recharts';

import { MetricSearchType } from '@/modules/metrics/enums/metrics-search-type.enum';
import { getMembersByCategoryAndGender } from '@/modules/metrics/services/member-metrics.service';
import { MembersByCategoryAndGenderTooltipContent } from '@/modules/metrics/components/member/tooltips/components/MembersByCategoryAndGenderTooltipContent';

import { cn } from '@/shared/lib/utils';
import { RecordOrder } from '@/shared/enums/record-order.enum';

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
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
}

interface Props {
  churchId: string | undefined;
}

export const MemberAnalysisCardByCategoryAndGender = ({ churchId }: Props): JSX.Element => {
  //* States
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Queries
  const membersByCategoryAndGenderQuery = useQuery({
    queryKey: ['members-by-category-and-gender', churchId],
    queryFn: () =>
      getMembersByCategoryAndGender({
        searchType: MetricSearchType.MembersByCategoryAndGender,
        year: String(new Date().getFullYear()),
        order: RecordOrder.Ascending,
        church: churchId ?? '',
      }),
    enabled: !!churchId,
  });

  //* Effects
  useEffect(() => {
    if (membersByCategoryAndGenderQuery?.data) {
      const transformedData = Object.entries(membersByCategoryAndGenderQuery?.data).map(
        ([category, value]) => {
          const totalMembers: number = Object.values(membersByCategoryAndGenderQuery?.data).reduce(
            (total: number, item: { men: number; women: number }) =>
              total + item?.men + item?.women,
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
            church: {
              isAnexe: value?.church?.isAnexe,
              abbreviatedChurchName: value?.church?.abbreviatedChurchName,
            },
            totalPercentage: (((value?.men + value?.women) / totalMembers) * 100).toFixed(1),
          };
        }
      );

      setMappedData(transformedData);
    }
  }, [membersByCategoryAndGenderQuery?.data]);

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40  flex flex-col col-start-2 col-end-3 h-[22rem] md:h-[25rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardTitle className='flex justify-center items-center gap-2.5 px-4 py-2.5 text-center font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
        <span className='ml-6 md:ml-20'>Categoría y Género</span>

        <Badge
          variant='active'
          className='mt-1 text-white text-[11px] md:text-[11px] py-0.3 md:py-0.35 tracking-wide'
        >
          Activos
        </Badge>
      </CardTitle>

      {!mappedData?.length ? (
        <CardContent className='h-full pl-3 pr-4 py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full pl-3 pr-4 py-0'>
          {membersByCategoryAndGenderQuery?.isFetching && !mappedData?.length && (
            <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
              <FcDataBackup className='text-[6rem] pb-2' />
              <p>Consultando datos....</p>
            </div>
          )}
          {mappedData?.length && (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[300px] sm:h-[300px] md:h-[330px] lg:h-[330px] xl:h-[330px] 2xl:h-[345px]'
              )}
            >
              <AreaChart
                accessibilityLayer
                data={mappedData}
                margin={{ top: 5, right: 5, left: -30, bottom: 10 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='category'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className='text-[12.5px] md:text-[14px]'
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis type='number' className='text-[12.5px] md:text-[14px]' />

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
                  content={<ChartLegendContent className='ml-8 text-[13px] md:text-[14px]' />}
                />
              </AreaChart>
            </ChartContainer>
          )}
          {!membersByCategoryAndGenderQuery?.isFetching && !mappedData?.length && (
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
