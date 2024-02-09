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
  { Miembros: 5, Líder: 'A-1', Ofrenda: 25.5 },
  { Miembros: 3, Líder: 'A-2', Ofrenda: 30.2 },
  { Miembros: 9, Líder: 'A-3', Ofrenda: 18.2 },
  { Miembros: 8, Líder: 'A-4', Ofrenda: 9.2 },
  { Miembros: 4, Líder: 'B-1', Ofrenda: 44.8 },
  { Miembros: 8, Líder: 'B-2', Ofrenda: 17.2 },
  { Miembros: 10, Líder: 'B-3', Ofrenda: 23.3 },
  { Miembros: 3, Líder: 'B-4', Ofrenda: 32.1 },
  { Miembros: 7, Líder: 'C-1', Ofrenda: 45.4 },
  { Miembros: 6, Líder: 'C-2', Ofrenda: 21.9 },
  { Miembros: 12, Líder: 'C-3', Ofrenda: 50.3 },
  { Miembros: 4, Líder: 'C-4', Ofrenda: 10.3 },
];

export const BarChartHouse = (): JSX.Element => {
  return (
    <Card className='bg-slate-200 flex flex-col row-start-2 row-end-3 col-start-1 col-end-3 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 xl:col-start-4 xl:col-end-7 xl:row-start-1 xl:row-end-2 h-[16rem] lg:h-[18rem] xl:h-[25rem] 2xl:h-[30rem] lg:-mt-[19rem] xl:mt-5 2xl:mt-10'>
      <div className='flex flex-col sm:flex-row items-center justify-between md:p-2 p-3 lg:p-3 xl:p-2 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.30rem] 2xl:text-3xl inline-block'>
          Ofrendas - Casa Familiar
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
          <XAxis dataKey='Líder' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Ofrenda' fill='#029012' />
          <Bar dataKey='Miembros' fill='#0ED0D0' />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
