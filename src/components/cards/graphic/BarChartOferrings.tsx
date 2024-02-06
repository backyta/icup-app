import { Card } from '@/components/ui/card';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { date: '25/11', Dia: 75.5, Tarde: 85.5 },
  { date: '26/11', Dia: 90.2, Tarde: 55.7 },
  { date: '26/11', Dia: 45.2, Tarde: 100.2 },
  { date: '26/11', Dia: 62.8, Tarde: 45.2 },
  { date: '26/11', Dia: 85.2, Tarde: 39.7 },
  { date: '26/11', Dia: 43.3, Tarde: 56.4 },
];

export const BarChartOfferings = (): JSX.Element => {
  return (
    <Card className='flex flex-col md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-3 lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-3 xl:col-start-1 xl:col-end-4 xl:row-start-1 xl:row-end-2 md:h-[16rem] lg:h-[14rem] xl:h-[25rem] 2xl:h-[30rem] xl:mt-5 lg:mt-5 md:mt-5'>
      <h3 className='text-center font-bold text-3xl p-2 text-'>
        Ofrendas Dominicales
      </h3>
      <ResponsiveContainer width='100%' aspect={0}>
        <BarChart
          data={data}
          width={500}
          height={300}
          margin={{ top: 5, right: 10, left: 10, bottom: 2 }}
        >
          <CartesianGrid strokeDasharray='4 1 2'></CartesianGrid>
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Dia' fill='#F09330' />
          <Bar dataKey='Tarde' fill='#0284C7' />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
