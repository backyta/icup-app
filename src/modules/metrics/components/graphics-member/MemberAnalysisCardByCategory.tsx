import { useState } from 'react';

import { useMediaQuery } from '@react-hook/media-query';
import { ResponsiveContainer, Sector, PieChart, Pie } from 'recharts';

import { Card } from '@/shared/components/ui/card';

const dataMembersRadialGraphic = [
  { name: 'Niños', value: 25 },
  { name: 'Adolescentes', value: 20 },
  { name: 'Jóvenes', value: 36 },
  { name: 'Adultos', value: 23 },
  { name: 'Adulto mayor', value: 25 },
  { name: 'Ancianos', value: 15 },
];

//* Functions
const renderActiveShape = (props: any): JSX.Element => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 5}
        y={ey}
        textAnchor={textAnchor}
        fill='#01A093'
      >{`Pers: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 5} y={ey} dy={18} textAnchor={textAnchor} fill='#FFBB28'>
        {`Porc: ${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

export const MemberAnalysisCardByCategory = (): JSX.Element => {
  //* States
  const onPieEnter = (_: any, index: any): void => {
    setActiveIndex(index);
  };
  // * Media Queries Library hooks
  const isTablet = useMediaQuery('(min-width: 640px)');
  const isTabletMD = useMediaQuery('(min-width: 768px)');
  const isDesktopLG = useMediaQuery('(min-width: 1024px)');
  const isDesktopXL = useMediaQuery('(min-width: 1280px)');

  const [activeIndex, setActiveIndex] = useState<any>(0);

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <h3 className='p-2 text-center font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
        Miembros (categoría)
      </h3>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={400} height={400} margin={{ top: 5, right: 35, left: 20, bottom: 10 }}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={dataMembersRadialGraphic}
            cx='50%'
            cy='50%'
            innerRadius={
              isTabletMD && !isDesktopLG
                ? 55
                : isDesktopLG && !isDesktopXL
                  ? 70
                  : isDesktopXL
                    ? 85
                    : isTablet
                      ? 55
                      : 50
            }
            outerRadius={
              isTabletMD && !isDesktopLG
                ? 75
                : isDesktopLG && !isDesktopXL
                  ? 90
                  : isDesktopXL
                    ? 120
                    : isTablet
                      ? 75
                      : 60
            }
            fill='#01a093'
            dataKey='value'
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};
