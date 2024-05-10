import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { GiExpense } from 'react-icons/gi';

const COLORS_ACTIVE = ['#00C49F', '#808080'];
const COLORS_INACTIVE = ['#808080', '#fd6c6c'];

export const OfferingExpensesProportionCards = (): JSX.Element => {
  //* Consultar el total de inactivos y activos
  const offeringIncomeActive = 96;
  const offeringIncomeInactive = 8;
  const total = offeringIncomeActive + offeringIncomeInactive;

  const dataMembers = [
    { name: 'Activos', value: offeringIncomeActive },
    { name: 'Inactivos', value: offeringIncomeInactive },
  ];

  return (
    <div className='w-full grid gap-6 xl:flex xl:gap-10 justify-center items-center px-5'>
      <Card className='w-[270px] md:w-[300px] mx-auto xl:mx-0 cursor-default shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
        <CardHeader className='py-4'>
          <div className='flex justify-center gap-4'>
            <GiExpense className='text-[5rem] text-orange-500' />
            <div className='flex flex-col gap-2 items-top justify-center'>
              <CardTitle className='text-center text-[2.8rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.5rem] font-extrabold leading-10'>
                {total}
              </CardTitle>
              <CardDescription className='text-[14.5px] md:text-[15px] xl:text-[16px] font-bold text-center'>
                Salidas Totales
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className='flex flex-col justify-center items-center sm:flex-row gap-6 sm:gap-4 md:gap-8 xl:gap-10'>
        {/* Active Members */}
        <Card className='w-[270px] md:w-[300px] cursor-default shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
          <CardHeader className='py-4'>
            <div className='flex justify-center gap-4 h-[5rem] relative'>
              <span className='absolute -top-3 left-8 font-bold text-[14px] md:text-[15px] xl:text-[16px]'>
                {(
                  (offeringIncomeActive / (offeringIncomeActive + offeringIncomeInactive)) *
                  100
                ).toFixed(0)}
                %
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
                  Tasa de registros <span className='text-green-500'>Activas</span>
                </CardDescription>
                <CardTitle className='text-center text-[2.2rem] xl:text-[2.5rem] font-extrabold leading-10'>
                  {offeringIncomeActive}
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
                {(
                  (offeringIncomeInactive / (offeringIncomeActive + offeringIncomeInactive)) *
                  100
                ).toFixed(0)}
                %
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
                  Tasa de registros <span className='text-red-500'>Inactivas</span>
                </CardDescription>
                <CardTitle className='text-center text-[2.2rem] xl:text-[2.5rem] font-extrabold leading-10'>
                  {offeringIncomeInactive}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
