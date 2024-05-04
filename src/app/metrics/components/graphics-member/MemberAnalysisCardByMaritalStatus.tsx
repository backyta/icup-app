import { useMediaQuery } from '@react-hook/media-query';
import { ResponsiveContainer, BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card } from '@/shared/components/ui/card';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const dataMaritalStatus = [
  {
    status: 'Soltero(a)',
    members: 54,
  },
  {
    status: 'Casado(a)',
    members: 24,
  },
  {
    status: 'Viudo(a)',
    members: 15,
  },
  {
    status: 'Divorciado(a)',
    members: 10,
  },
  {
    status: 'Otro',
    members: 10,
  },
];

//* Functions
const getPath = (x: any, y: any, width: any, height: any): string => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props: any): JSX.Element => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke='none' fill={fill} />;
};

export const MemberAnalysisCardByMaritalStatus = (): JSX.Element => {
  //*  Media Queries Library hooks
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isDesktopLG = useMediaQuery('(min-width: 1024px)');
  const isDesktopXL = useMediaQuery('(min-width: 1280px)');

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-2 col-end-3 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <h3 className='p-2 text-center font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
        Miembros por Estado Civil
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
          height={400}
          data={dataMaritalStatus}
          margin={{ top: 5, right: 30, left: -20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='status' />
          <YAxis />

          <Bar dataKey='members' fill='#8884d8' shape={<TriangleBar />} label={{ position: 'top' }}>
            {dataMaritalStatus.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
