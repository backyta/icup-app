import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FaPeopleRoof } from 'react-icons/fa6';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';

import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useEffect, useState } from 'react';

const COLORS_ACTIVE = ['#00C49F', '#808080'];
const COLORS_INACTIVE = ['#808080', '#fd6c6c'];

export const MemberProportionCards = (): JSX.Element => {
  //* States
  const [numberPeopleByGender, setNumberPeopleByGender] = useState({ man: 0, woman: 0 });

  //* Consultar el total de inactivos y activos
  const membersActive = 285;
  const membersInactive = 30;
  const total = membersActive + membersInactive;

  useEffect(() => {
    const mujeres = Math.floor(Math.random() * total);
    const varones = total - mujeres;

    setNumberPeopleByGender({ man: varones, woman: mujeres });
  }, []);

  const dataMembers = [
    { name: 'Activos', value: membersActive },
    { name: 'Inactivos', value: membersInactive },
  ];

  return (
    <div className='grid gap-6 xl:flex xl:gap-10 justify-center px-5'>
      <div className='flex gap-4 justify-center'>
        {/* Total and Total by Gender */}
        <Card className='w-auto h-auto cursor-default shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
          <CardHeader className='p-2 pt-4'>
            <div className='flex flex-col justify-center items-center gap-3'>
              <div className='flex justify-center gap-1 items-end'>
                <BsGenderMale className='text-blue-500 font-bold text-[2rem]  md:text-[2.3rem]' />
                <span className='text-[20px] font-extrabold'>{numberPeopleByGender.man}</span>
              </div>
              <div className='flex justify-center items-end'>
                <BsGenderFemale className='text-pink-500 font-bold text-[2rem] md:text-[2.3rem]' />
                <span className='text-[20px] font-extrabold'>{numberPeopleByGender.woman}</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className='w-[270px] md:w-[300px] cursor-default shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
          <CardHeader className='py-4'>
            <div className='flex justify-center gap-4'>
              <FaPeopleRoof className='text-[5rem] text-sky-500' />
              <div className='flex flex-col gap-2 items-top justify-center'>
                <CardTitle className='text-center text-[2.8rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.5rem] font-extrabold leading-10'>
                  {total}
                </CardTitle>
                <CardDescription className='text-[14.5px] md:text-[15px] xl:text-[16px] font-bold text-center'>
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
          <CardHeader className='py-4'>
            <div className='flex justify-center gap-4 h-[5rem] relative'>
              <span className='absolute -top-3 left-8 font-bold text-[14px] md:text-[15px] xl:text-[16px]'>
                {((membersActive / (membersActive + membersInactive)) * 100).toFixed(0)}%
              </span>
              <ResponsiveContainer width='50%' height='125%'>
                <PieChart width={400} height={400}>
                  <Pie
                    data={dataMembers}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={35}
                    dataKey='value'
                  >
                    {dataMembers.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS_ACTIVE[index % COLORS_ACTIVE.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className='flex flex-col  items-center justify-center'>
                <CardDescription className='text-[14.5px] md:text-[15px] xl:text-[16px] font-bold text-center'>
                  Tasa de miembros <span className='text-green-500'>Activos</span>
                </CardDescription>
                <CardTitle className='text-center text-[2.2rem] xl:text-[2.5rem] font-extrabold leading-10'>
                  {membersActive}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Inactive Members */}
        <Card className='w-[270px] md:w-[300px] cursor-default shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
          <CardHeader className='py-4'>
            <div className='flex justify-center gap-4 h-[5rem] relative'>
              <span className='absolute -top-3 left-8 font-bold text-[14px] md:text-[15px] xl:text-[16px]'>
                {((membersInactive / (membersActive + membersInactive)) * 100).toFixed(0)}%
              </span>
              <ResponsiveContainer width='50%' height='125%'>
                <PieChart width={400} height={400}>
                  <Pie
                    data={dataMembers}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={35}
                    dataKey='value'
                  >
                    {dataMembers.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS_INACTIVE[index % COLORS_INACTIVE.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className='flex flex-col  items-center justify-center'>
                <CardDescription className='text-[14.5px] md:text-[15px] xl:text-[16px]  font-bold text-center'>
                  Tasa de miembros <span className='text-red-500'>Inactivos</span>
                </CardDescription>
                <CardTitle className='text-center text-[2.2rem] xl:text-[2.5rem] font-extrabold leading-10'>
                  {membersInactive}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
