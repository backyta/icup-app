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
  { Miembros: 5, Líder: 'C-2', Ofrenda: 25.5 },
  { Miembros: 3, Líder: 'C-1', Ofrenda: 30.2 },
  { Miembros: 7, Líder: 'A-3', Ofrenda: 18.2 },
  { Miembros: 4, Líder: 'B-1', Ofrenda: 44.8 },
  { Miembros: 8, Líder: 'A-2', Ofrenda: 17.2 },
  { Miembros: 3, Líder: 'B-3', Ofrenda: 23.3 },
  { Miembros: 5, Líder: 'A-1', Ofrenda: 23.3 },
  { Miembros: 6, Líder: 'C-3', Ofrenda: 23.3 },
];

export const BarChartHouse = (): JSX.Element => {
  return (
    <Card className='flex flex-col md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 lg:row-start-2 lg:row-end-3 lg:col-start-1 lg:col-end-3 xl:col-start-4 xl:col-end-7 xl:row-start-1 xl:row-end-2 md:h-[16rem] lg:h-[14rem] xl:h-[25rem] 2xl:h-[30rem] xl:mt-5 lg:mt-5 md:mt-5'>
      <h3 className='text-center font-bold text-3xl p-1'>
        Ofrendas Semanales - Casa Familiar
      </h3>
      <span className='text-center text-sm font-bold'>
        Semana 12/04 - 18/04
      </span>
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

// TODO : hacer swicth para cambiar a los que menos ofrendaron
