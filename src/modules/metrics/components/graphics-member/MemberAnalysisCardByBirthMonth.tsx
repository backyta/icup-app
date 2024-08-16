import { useMediaQuery } from '@react-hook/media-query';
import {
  ComposedChart,
  ResponsiveContainer,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  Area,
  XAxis,
  YAxis,
} from 'recharts';

import { Card } from '@/shared/components/ui/card';

const dataBirthday = [
  {
    name: 'Ene',
    Personas: 16,
    'Prom-edad': 35,
  },
  {
    name: 'Feb',
    Personas: 4,
    'Prom-edad': 12,
  },
  {
    name: 'Mar',
    Personas: 32,
    'Prom-edad': 8,
  },
  {
    name: 'Abr',
    Personas: 12,
    'Prom-edad': 27,
  },
  {
    name: 'May',
    Personas: 16,
    'Prom-edad': 19,
  },
  {
    name: 'Jun',
    Personas: 6,
    'Prom-edad': 42,
  },
  {
    name: 'Jul',
    Personas: 19,
    'Prom-edad': 23,
  },
  {
    name: 'Ago',
    Personas: 7,
    'Prom-edad': 18,
  },
  {
    name: 'Set',
    Personas: 4,
    'Prom-edad': 12,
  },
  {
    name: 'Oct',
    Personas: 13,
    'Prom-edad': 40,
  },
  {
    name: 'Nov',
    Personas: 21,
    'Prom-edad': 28,
  },
  {
    name: 'Dic',
    Personas: 8,
    'Prom-edad': 22,
  },
];

export const MemberAnalysisCardByBirthMonth = (): JSX.Element => {
  // * Media Queries Library hooks
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isDesktopLG = useMediaQuery('(min-width: 1024px)');
  const isDesktopXL = useMediaQuery('(min-width: 1280px)');

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-2 col-end-3 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <h3 className='p-2 text-center font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
        Miembros (mes de nacimiento)
      </h3>
      <ResponsiveContainer
        width='100%'
        height={
          isDesktop && !isDesktopLG
            ? '90%'
            : isDesktopLG && !isDesktopXL
              ? '90%'
              : isDesktopXL
                ? '100%'
                : '100%'
        }
      >
        <ComposedChart
          layout='vertical'
          width={500}
          height={400}
          data={dataBirthday}
          margin={{ top: 5, right: 30, left: -5, bottom: 5 }}
        >
          <CartesianGrid stroke='#c8c8c8' />
          <XAxis type='number' />
          <YAxis dataKey='name' type='category' scale='band' />
          <Tooltip labelClassName='text-black' />
          <Legend />
          <Area dataKey='Prom-edad' fill='#8884d8' stroke='#8884d8' />
          <Bar dataKey='Personas' barSize={15} fill='#413ea1' />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
