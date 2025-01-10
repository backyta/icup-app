/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { PieChart, Pie } from 'recharts';

import { useEffect, useState } from 'react';

import CountUp from 'react-countup';
import { FaPeopleRoof } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';

import { RecordOrder } from '@/shared/enums/record-order.enum';

import { MetricSearchType } from '@/modules/metrics/enums/metrics-search-type.enum';
import { getMembersProportion } from '@/modules/metrics/services/member-metrics.service';

import { type ChartConfig, ChartContainer } from '@/shared/components/ui/chart';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

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

export const MemberProportionCard = ({ churchId }: Props): JSX.Element => {
  //* States
  const [activeMemberDataMapped, setActiveMemberDataMapped] = useState<MappedDataOptions[]>();
  const [inactiveMemberDataMapped, setInactiveMemberDataMapped] = useState<MappedDataOptions[]>();

  //* Queries
  const { data } = useQuery({
    queryKey: ['members-proportion', churchId],
    queryFn: () =>
      getMembersProportion({
        searchType: MetricSearchType.MembersByProportion,
        order: RecordOrder.Ascending,
        church: churchId ?? '',
      }),
    retry: 1,
    enabled: !!churchId,
  });

  //* Effects
  useEffect(() => {
    const newData = {
      countMembersActive: data?.countMembersActive,
      countMembersInactive: data?.countMembersInactive,
    };

    if (data) {
      const activeMemberTransformedData = Object.keys(newData).map((_, index) => {
        return {
          name: index === 0 ? 'active' : 'inactive',
          value: index === 0 ? data.countMembersActive : data.countMembersInactive,
          fill: index === 0 ? 'var(--color-active)' : 'var(--color-inactive)',
        };
      });

      const inactiveMemberTransformedData = Object.keys(newData).map((_, index) => {
        return {
          name: index === 0 ? 'inactive' : 'active',
          value: index === 0 ? data.countMembersInactive : data.countMembersActive,
          fill: index === 0 ? 'var(--color-inactive)' : 'var(--color-active)',
        };
      });

      setActiveMemberDataMapped(activeMemberTransformedData);
      setInactiveMemberDataMapped(inactiveMemberTransformedData);
    }
  }, [data]);

  return (
    <div className='grid gap-6 xl:flex xl:gap-10 justify-center px-2'>
      <div className='flex gap-4 justify-center mx-auto w-[90%] sm:w-auto sm:mx-0'>
        {/* Total and Total by Gender */}
        <Card className='w-auto h-auto shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
          <CardHeader className='p-2 pt-4'>
            <div className='flex flex-col justify-center items-center gap-6 md:gap-3'>
              <div className='flex justify-center items-center gap-1.5'>
                <BsGenderMale className='text-blue-500 font-bold text-[1.8rem] md:text-[2rem]' />
                <span className='text-[22px] md:text-[26px] font-extrabold'>
                  {<CountUp end={Number(data?.countMembersMale)} start={0} duration={4} />}
                </span>
              </div>

              <div className='flex justify-center gap-1.5 items-center'>
                <BsGenderFemale className='text-pink-500 font-bold text-[1.8rem] md:text-[2rem]' />
                <span className='text-[22px] md:text-[26px] font-extrabold'>
                  {<CountUp end={Number(data?.countMembersFemale)} start={0} duration={4} />}
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className='w-[270px] md:w-[300px] shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
          <CardHeader className='py-5'>
            <div className='flex justify-center gap-4'>
              <FaPeopleRoof className='text-[5rem] text-sky-500' />
              <div className='flex flex-col gap-2 items-top justify-center'>
                <CardTitle className='text-center text-[3rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.5rem] font-extrabold leading-10'>
                  {<CountUp end={Number(data?.totalCountMembers)} start={0} duration={4} />}
                </CardTitle>
                <CardDescription className='text-[15px] md:text-[15px] xl:text-[16px] font-bold text-center'>
                  Miembros totales
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className='flex flex-col justify-center items-center sm:flex-row gap-6 sm:gap-4 md:gap-8 xl:gap-10'>
        {/* Active Members */}
        <Card className='w-[270px] md:w-[300px] cursor-default shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
          <CardHeader className='py-5'>
            <div className='flex justify-center gap-4 h-[5rem] relative'>
              <span className='absolute -top-3 left-[3.2rem] md:left-14 font-bold text-[15px] md:text-[15px]'>
                {(() => {
                  const activeMembers = data?.countMembersActive ?? 0;
                  const inactiveMembers = data?.countMembersInactive ?? 0;
                  const totalMembers = activeMembers + inactiveMembers;

                  return totalMembers > 0 ? (
                    <CountUp
                      end={Number(((activeMembers / totalMembers) * 100).toFixed(0))}
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
                  <Pie data={activeMemberDataMapped} dataKey='value' nameKey='name'></Pie>
                </PieChart>
              </ChartContainer>

              <div className='flex flex-col  items-center justify-center'>
                <CardDescription className='text-[15px] md:text-[15px] font-bold text-center'>
                  Tasa de miembros <span className='text-green-500'>Activos</span>
                </CardDescription>
                <CardTitle className='text-center text-[2.2rem] xl:text-[2.4rem] font-extrabold leading-10'>
                  {<CountUp end={Number(data?.countMembersActive)} start={0} duration={4} />}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Inactive Members */}
        <Card className='w-[270px] md:w-[300px] cursor-default shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
          <CardHeader className='py-5'>
            <div className='flex justify-center gap-4 h-[5rem] relative'>
              <span className='absolute -top-3 left-[3.2rem] md:left-14 font-bold text-[15px] md:text-[15px]'>
                {(() => {
                  const activeMembers = data?.countMembersActive ?? 0;
                  const inactiveMembers = data?.countMembersInactive ?? 0;
                  const totalMembers = activeMembers + inactiveMembers;

                  return totalMembers > 0 ? (
                    <CountUp
                      end={Number(((inactiveMembers / totalMembers) * 100).toFixed(0))}
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
                  <Pie data={inactiveMemberDataMapped} dataKey='value' nameKey='name'></Pie>
                </PieChart>
              </ChartContainer>
              <div className='flex flex-col  items-center justify-center'>
                <CardDescription className='text-[15px] md:text-[15px] font-bold text-center'>
                  Tasa de miembros <span className='text-red-500'>Inactivos</span>
                </CardDescription>
                <CardTitle className='text-center text-[2.2rem] xl:text-[2.4rem] font-extrabold leading-10'>
                  {<CountUp end={Number(data?.countMembersInactive)} start={0} duration={4} />}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
