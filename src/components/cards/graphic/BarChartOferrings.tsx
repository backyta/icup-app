import { DatePickerWithRange } from '@/components/date-pickers/DateRagePicker';
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
    <Card className='bg-slate-200 flex flex-col row-start-1 row-end-2 col-start-1 col-end-3 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-3 xl:col-start-1 xl:col-end-4 xl:row-start-1 xl:row-end-2 h-[16rem] lg:h-[18rem] xl:h-[25rem] 2xl:h-[30rem] mt-3 xl:mt-5 lg:mt-5 lg-mb-5 md:mt-5 2xl:mt-10'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.35rem]  2xl:text-3xl inline-block'>
          Ofrendas - Dominicales
        </h3>
        <DatePickerWithRange></DatePickerWithRange>
      </div>
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
