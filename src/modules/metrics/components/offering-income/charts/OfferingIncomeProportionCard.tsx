/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import CountUp from 'react-countup';
import { PieChart, Pie } from 'recharts';
import { FaDonate } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

import { ChartContainer, type ChartConfig } from '@/shared/components/ui/chart';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

import { RecordOrder } from '@/shared/enums/record-order.enum';

import { MetricSearchType } from '@/modules/metrics/enums/metrics-search-type.enum';
import { getOfferingIncomeProportion } from '@/modules/metrics/services/offering-income-metrics.service';

const chartConfigActive = {
  active: {
    color: '#00C49F',
  },
  inactive: {
    color: '#808080',
  },
} satisfies ChartConfig;

const chartConfigInactive = {
  active: {
    color: '#808080',
  },
  inactive: {
    color: '#fd6c6c',
  },
} satisfies ChartConfig;

interface MappedDataOptions {
  name: string;
  value: number;
  fill: string;
}

interface Props {
  churchId: string | undefined;
}

export const OfferingIncomeProportionCard = ({ churchId }: Props): JSX.Element => {
  //* States
  const [activeOfferingIncomeDataMapped, setActiveOfferingIncomeDataMapped] =
    useState<MappedDataOptions[]>();
  const [inactiveOfferingIncomeDataMapped, setInactiveOfferingIncomeDataMapped] =
    useState<MappedDataOptions[]>();

  //* Queries
  const { data } = useQuery({
    queryKey: ['offering-income-proportion', churchId],
    queryFn: () =>
      getOfferingIncomeProportion({
        searchType: MetricSearchType.OfferingIncomeByProportion,
        year: String(new Date().getFullYear()),
        order: RecordOrder.Ascending,
        church: churchId ?? '',
      }),
    retry: 1,
    enabled: !!churchId,
  });

  //* Effects
  useEffect(() => {
    const newData = {
      activeOfferingsIncomeRecordsCount: data?.activeOfferingIncomeRecordsCount,
      inactiveOfferingsIncomeRecordsCount: data?.inactiveOfferingIncomeRecordsCount,
    };

    if (data) {
      const activeOfferingsIncomeTransformedData = Object.keys(newData).map((_, index) => {
        return {
          name: index === 0 ? 'active' : 'inactive',
          value:
            index === 0
              ? data.activeOfferingIncomeRecordsCount
              : data.inactiveOfferingIncomeRecordsCount,
          fill: index === 0 ? 'var(--color-active)' : 'var(--color-inactive)',
        };
      });

      const inactiveOfferingsIncomeTransformedData = Object.keys(newData).map((_, index) => {
        return {
          name: index === 0 ? 'inactive' : 'active',
          value:
            index === 0
              ? data.inactiveOfferingIncomeRecordsCount
              : data.activeOfferingIncomeRecordsCount,
          fill: index === 0 ? 'var(--color-inactive)' : 'var(--color-active)',
        };
      });

      setActiveOfferingIncomeDataMapped(activeOfferingsIncomeTransformedData);
      setInactiveOfferingIncomeDataMapped(inactiveOfferingsIncomeTransformedData);
    }
  }, [data]);

  return (
    <div className='w-full grid gap-6 xl:flex xl:gap-10 justify-center items-center px-5'>
      <Card className='w-[270px] md:w-[300px] mx-auto xl:mx-0 cursor-default shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
        <CardHeader className='py-5'>
          <div className='flex justify-center gap-4'>
            <FaDonate className='text-[5rem] text-lime-500' />
            <div className='flex flex-col gap-2 items-top justify-center'>
              <CardTitle className='text-center text-[2.8rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.5rem] font-extrabold leading-10'>
                {
                  <CountUp
                    end={Number(data?.totalOfferingIncomeRecordsCount)}
                    start={0}
                    duration={4}
                  />
                }
              </CardTitle>
              <CardDescription className='text-[14.5px] md:text-[15px] xl:text-[16px] font-bold text-center'>
                Registros Totales
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className='flex flex-col justify-center items-center sm:flex-row gap-6 sm:gap-4 md:gap-8 xl:gap-10'>
        {/* Active offerings */}
        <Card className='w-[270px] md:w-[300px] cursor-default shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
          <CardHeader className='py-5'>
            <div className='flex justify-center gap-4 h-[5rem] relative'>
              <span className='absolute -top-3 left-12 md:left-14 font-bold text-[14px] md:text-[15px]'>
                {(() => {
                  const activeOfferingsIncome = data?.activeOfferingIncomeRecordsCount ?? 0;
                  const inactiveOfferingsIncome = data?.inactiveOfferingIncomeRecordsCount ?? 0;
                  const totalOfferingsIncome = activeOfferingsIncome + inactiveOfferingsIncome;

                  return totalOfferingsIncome > 0 ? (
                    <CountUp
                      end={Number(
                        ((activeOfferingsIncome / totalOfferingsIncome) * 100).toFixed(0)
                      )}
                      start={0}
                      duration={4}
                    />
                  ) : (
                    0
                  );
                })()}
                %
              </span>

              <ChartContainer config={chartConfigActive} className='w-[55%] h-[130%]'>
                <PieChart>
                  <Pie data={activeOfferingIncomeDataMapped} dataKey='value' nameKey='name'></Pie>
                </PieChart>
              </ChartContainer>

              <div className='flex flex-col  items-center justify-center'>
                <CardDescription className='text-[14px] md:text-[15px] font-bold text-center'>
                  Tasa de registros <span className='text-green-500'>Activas</span>
                </CardDescription>
                <CardTitle className='text-center text-[2.2rem] xl:text-[2.5rem] font-extrabold leading-10'>
                  {
                    <CountUp
                      end={Number(data?.activeOfferingIncomeRecordsCount)}
                      start={0}
                      duration={4}
                    />
                  }
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Inactive Offerings */}
        <Card className='w-[270px] md:w-[300px] cursor-default shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
          <CardHeader className='py-5'>
            <div className='flex justify-center gap-4 h-[5rem] relative'>
              <span className='absolute -top-3 left-12 md:left-14 font-bold text-[14px] md:text-[15px]'>
                {(() => {
                  const activeOfferingsIncome = data?.activeOfferingIncomeRecordsCount ?? 0;
                  const inactiveOfferingsIncome = data?.inactiveOfferingIncomeRecordsCount ?? 0;
                  const totalOfferingsIncome = activeOfferingsIncome + inactiveOfferingsIncome;

                  return totalOfferingsIncome > 0 ? (
                    <CountUp
                      end={Number(
                        ((inactiveOfferingsIncome / totalOfferingsIncome) * 100).toFixed(0)
                      )}
                      start={0}
                      duration={4}
                    />
                  ) : (
                    0
                  );
                })()}
                %
              </span>
              <ChartContainer config={chartConfigInactive} className='w-[55%] h-[130%]'>
                <PieChart>
                  <Pie data={inactiveOfferingIncomeDataMapped} dataKey='value' nameKey='name'></Pie>
                </PieChart>
              </ChartContainer>
              <div className='flex flex-col  items-center justify-center'>
                <CardDescription className='text-[14px] md:text-[15px] font-bold text-center'>
                  Tasa de registros <span className='text-red-500'>Inactivas</span>
                </CardDescription>
                <CardTitle className='text-center text-[2.2rem] xl:text-[2.5rem] font-extrabold leading-10'>
                  {
                    <CountUp
                      end={Number(data?.inactiveOfferingIncomeRecordsCount)}
                      start={0}
                      duration={4}
                    />
                  }
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
