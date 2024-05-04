import { Card } from '@/shared/components/ui/card';
import { useMediaQuery } from '@react-hook/media-query';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    zone: 'Zona A',
    Varones: 10,
    Mujeres: 8,
  },
  {
    zone: 'Zona B',
    Varones: 4,
    Mujeres: 7,
  },
  {
    zone: 'Zona C',
    Varones: 5,
    Mujeres: 9,
  },
];

//* Functions
const toPercent = (decimal: any, fixed: number = 0): string => `${(decimal * 100).toFixed(0)}%`;

const getPercent = (value: any, total: any): string => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 0);
};

const renderTooltipContent = (o: any): JSX.Element => {
  const { payload, label } = o;

  const total = payload.reduce((result: any, entry: any) => result + entry.value, 0);

  return (
    <div className='bg-white p-2 text-black font-normal'>
      <p className='total'>{`${label} (Total: ${total})`}</p>
      <ul className='list'>
        {payload.map((entry: any, index: any) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const MemberLeaderAnalysisCardByZone = (): JSX.Element => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isDesktopLG = useMediaQuery('(min-width: 1024px)');
  const isDesktopXL = useMediaQuery('(min-width: 1280px)');

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-2 col-end-3 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <h3 className='p-2 text-center font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
        Lideres por Zona (%)
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
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: -15, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='zone' />
          <YAxis />
          <Tooltip content={renderTooltipContent} />
          <Legend />
          <Bar dataKey='Mujeres' fill='#eac508' />
          <Bar dataKey='Varones' fill='#06a9f1' />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
