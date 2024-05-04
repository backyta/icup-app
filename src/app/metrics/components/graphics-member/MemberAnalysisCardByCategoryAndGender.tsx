import { useMediaQuery } from '@react-hook/media-query';
import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  XAxis,
  YAxis,
} from 'recharts';

import { Card } from '@/shared/components/ui/card';

const dataCategory = [
  {
    category: 'Niñ(0-12)',
    Varones: 18,
    Mujeres: 22,
  },
  {
    category: 'Ado(13-20)',
    Varones: 17,
    Mujeres: 13,
  },
  {
    category: 'Jóv(21-30 )',
    Varones: 31,
    Mujeres: 27,
  },
  {
    category: 'Adu(31-45)',
    Varones: 25,
    Mujeres: 44,
  },
  {
    category: 'Adu.may(45-55)',
    Varones: 15,
    Mujeres: 10,
  },
  {
    category: 'Anc(56+)',
    Varones: 8,
    Mujeres: 11,
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

export const MemberAnalysisCardByCategoryAndGender = (): JSX.Element => {
  // * Media Queries Library hooks
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isDesktopLG = useMediaQuery('(min-width: 1024px)');
  const isDesktopXL = useMediaQuery('(min-width: 1280px)');

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40  flex flex-col col-start-2 col-end-3 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <h3 className='p-2 text-center font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
        Miembros por Categoría y Genero (%)
      </h3>
      <ResponsiveContainer
        width='100%'
        height={
          isDesktop && !isDesktopLG
            ? '100%'
            : isDesktopLG && !isDesktopXL
              ? '90%'
              : isDesktopXL
                ? '100%'
                : '100%'
        }
      >
        <AreaChart
          width={500}
          height={400}
          data={dataCategory}
          stackOffset='expand'
          margin={{ top: 5, right: 40, left: -5, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#c8c8c8' />
          <XAxis dataKey='category' />
          <YAxis tickFormatter={toPercent} />
          <Tooltip content={renderTooltipContent} />
          <Area type='monotone' dataKey='Varones' stackId='1' stroke='#68c4f2' fill='#68c4f2' />
          <Area type='monotone' dataKey='Mujeres' stackId='1' stroke='#e54fc0' fill='#e54fc0' />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
