import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { GiCardExchange } from 'react-icons/gi';

const COLORS_ACTIVE = ['#00C49F', '#808080'];
const COLORS_INACTIVE = ['#808080', '#fd6c6c'];

export const ComparativeOfferingProportionCards = (): JSX.Element => {
  //* Consultar el total de inactivos y activos
  const offeringIncome = 2045;
  const offeringExpenses = 830;
  const total = offeringIncome + offeringExpenses;

  const dataTotalOffering = [
    { name: 'Ingresos', value: offeringIncome },
    { name: 'Salidas', value: offeringExpenses },
  ];

  return (
    <div className='w-full grid gap-6 xl:flex xl:gap-10 justify-center items-center px-5'>
      <Card className='w-[270px] md:w-[300px] mx-auto xl:mx-0 cursor-default shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
        <CardHeader className='py-4'>
          <div className='flex justify-center gap-4'>
            <GiCardExchange className='text-[5rem] text-blue-500' />
            <div className='flex flex-col gap-2 items-top justify-center'>
              <CardTitle className='text-center text-[2.8rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.5rem] font-extrabold leading-10'>
                {total}
              </CardTitle>
              <CardDescription className='text-[14.5px] md:text-[15px] xl:text-[16px] font-bold text-center'>
                Total Registros
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
                {((offeringIncome / (offeringIncome + offeringExpenses)) * 100).toFixed(0)}%
              </span>
              <ResponsiveContainer width='50%' height='125%'>
                <PieChart width={400} height={400}>
                  <Pie
                    data={dataTotalOffering}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={35}
                    dataKey='value'
                  >
                    {dataTotalOffering.map((entry, index) => (
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
                  Tasa de registros <span className='text-green-500'>Ingresos</span>
                </CardDescription>
                <CardTitle className='text-center text-[2.2rem] xl:text-[2.5rem] font-extrabold leading-10'>
                  {offeringIncome}
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
                {((offeringExpenses / (offeringIncome + offeringExpenses)) * 100).toFixed(0)}%
              </span>
              <ResponsiveContainer width='50%' height='125%'>
                <PieChart width={400} height={400}>
                  <Pie
                    data={dataTotalOffering}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={35}
                    dataKey='value'
                  >
                    {dataTotalOffering.map((entry, index) => (
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
                  Tasa de registros <span className='text-red-500'>Salidas</span>
                </CardDescription>
                <CardTitle className='text-center text-[2.2rem] xl:text-[2.5rem] font-extrabold leading-10'>
                  {offeringExpenses}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
