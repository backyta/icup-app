import { useMediaQuery } from '@react-hook/media-query';
import {
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Line,
} from 'recharts';

import { Card } from '@/shared/components/ui/card';

const data = [
  {
    rol: 'Pastores',
    Varones: 2,
    Mujeres: 1,
  },
  {
    rol: 'Co-Pastores',
    Varones: 1,
    Mujeres: 4,
  },
  {
    rol: 'Supervisores',
    Varones: 1,
    Mujeres: 3,
  },
  {
    rol: 'Predicadores',
    Varones: 5,
    Mujeres: 10,
  },
  {
    rol: 'Discípulos',
    Varones: 42,
    Mujeres: 76,
  },
];

//* Functions

const renderTooltipContent = (o: any): JSX.Element => {
  const { payload, label } = o;

  return (
    <div className='bg-white p-2 text-black font-normal'>
      <p className='total'>{`${label}`}</p>
      <ul className='list'>
        {payload.map((entry: any, index: any) =>
          entry.dataKey === 'Porcentaje' ? (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}%`}
            </li>
          ) : (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export const MemberAnalysisCardByRole = (): JSX.Element => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isDesktopLG = useMediaQuery('(min-width: 1024px)');
  const isDesktopXL = useMediaQuery('(min-width: 1280px)');

  const totalCantidad = data.reduce((total, item) => total + item.Varones + item.Mujeres, 0);

  const newData = data.map((item) => ({
    ...item,
    Porcentaje: (((item.Varones + item.Mujeres) / totalCantidad) * 100).toFixed(1),
  }));

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <h3 className='p-2 text-center font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
        Miembros (roles eclesiásticos)
      </h3>

      <ResponsiveContainer
        width='100%'
        height={
          isDesktop && !isDesktopLG
            ? '88%'
            : isDesktopLG && !isDesktopXL
              ? '90%'
              : isDesktopXL
                ? '100%'
                : '100%'
        }
      >
        <ComposedChart
          width={500}
          height={300}
          data={newData}
          margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='rol' />
          <YAxis />
          <Tooltip content={renderTooltipContent} />
          <Legend />
          <Bar dataKey='Varones' fill='#00bcdc' />
          <Bar dataKey='Mujeres' fill='#bb3dff' />
          <Line type='linear' dataKey='Porcentaje' stroke='#ff7300' />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
