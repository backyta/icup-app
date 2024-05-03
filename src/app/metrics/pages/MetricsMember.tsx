/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

import { FaPeopleRoof } from 'react-icons/fa6';

import {
  PieChart,
  ComposedChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  Area,
  AreaChart,
  XAxis,
  YAxis,
} from 'recharts';

import { CalendarIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { useForm } from 'react-hook-form';
import { barChartFormSchema } from '@/app/dashboard/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { cn } from '@/shared/lib/utils';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';

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

const COLORS_ACTIVE = ['#00C49F', '#808080'];
const COLORS_INACTIVE = ['#808080', '#fd6c6c'];

const data = [
  { date: 'Enero', Nuevos: 10, Bajas: 2 },
  { date: 'Febrero', Nuevos: 12, Bajas: 0 },
  { date: 'Marzo', Nuevos: 11, Bajas: 1 },
  { date: 'Abril', Nuevos: 20, Bajas: 5 },
  { date: 'Mayo', Nuevos: 5, Bajas: 10 },
  { date: 'Junio', Nuevos: 2, Bajas: 5 },
  { date: 'Julio', Nuevos: 6, Bajas: 0 },
];

// Marital Status
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

// TODO : hasta aquí separar en componentes de gráficos por tipo de métrica (members, offering houses) y exportarlo aquí para usar
export const MetricsMember = (): JSX.Element => {
  //* States
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isDesktopXL = useMediaQuery('(min-width: 1280px)');

  //* Form
  const form = useForm<z.infer<typeof barChartFormSchema>>({
    resolver: zodResolver(barChartFormSchema),
    mode: 'onChange',
    defaultValues: {},
  });

  //* Form handler
  function onSubmit(values: z.infer<typeof barChartFormSchema>): void {
    console.log({ values });
  }

  // Consultar el total de inactivos y activos
  const membersActive = 145;
  const membersInactive = 30;

  const dataMembers = [
    { name: 'Activos', value: membersActive },
    { name: 'Inactivos', value: membersInactive },
  ];

  return (
    <div>
      <h2 className='text-center text-amber-500 text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-sans font-bold pt-2 leading-tight'>
        Análisis de Miembros de la Iglesia
      </h2>
      <p className='text-center text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-medium text-slate-500'>
        Indicadores y estadísticas clave de los miembros
      </p>
      <hr className='p-[0.015rem] bg-slate-500 mb-4 w-[90%] mx-auto' />

      <div className='grid gap-6 xl:flex xl:gap-10 justify-center px-5'>
        <div className='flex gap-4 justify-center'>
          <Card className='w-auto h-auto shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
            <CardHeader className='p-2 pt-4'>
              <div className='flex flex-col justify-center items-center gap-3'>
                <div className='flex justify-center gap-1 items-end'>
                  <BsGenderMale className='text-blue-500 font-bold text-[2rem]  md:text-[2.3rem]' />
                  <span className='text-[20px] font-extrabold'>100</span>
                </div>
                <div className='flex justify-center items-end'>
                  <BsGenderFemale className='text-pink-500 font-bold text-[2rem] md:text-[2.3rem]' />
                  <span className='text-[20px] font-extrabold'>150</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className='w-[270px] md:w-[300px] shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
            <CardHeader className='py-4'>
              <div className='flex justify-center gap-4'>
                <FaPeopleRoof className='text-[5rem] text-sky-500' />
                <div className='flex flex-col gap-2 items-top justify-center'>
                  <CardTitle className='text-center text-[2.8rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.5rem] font-extrabold leading-10'>
                    {membersActive + membersInactive}
                  </CardTitle>
                  <CardDescription className='text-[14.5px] md:text-[15px] xl:text-[16px] font-bold text-center'>
                    Miembros totales
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className='flex flex-col justify-center items-center sm:flex-row gap-6 sm:gap-4 md:gap-8 xl:gap-10'>
          {/* Active */}
          <Card className='w-[270px] md:w-[300px] shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
            <CardHeader className='py-4'>
              <div className='flex justify-center gap-4 h-[5rem] relative'>
                <span className='absolute -top-3 left-8 font-bold text-[14px] md:text-[15px] xl:text-[16px]'>
                  {((membersActive / (membersActive + membersInactive)) * 100).toFixed(0)}%
                </span>
                <ResponsiveContainer width='50%' height='125%'>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={dataMembers}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      outerRadius={35}
                      dataKey='value'
                    >
                      {dataMembers.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS_ACTIVE[index % COLORS_ACTIVE.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className='flex flex-col  items-center justify-center'>
                  <CardDescription className='text-[14.5px] md:text-[15px] xl:text-[16px] font-bold text-center'>
                    Tasa de miembros <span className='text-green-500'>Activos</span>
                  </CardDescription>
                  <CardTitle className='text-center text-[2.2rem] xl:text-[2.5rem] font-extrabold leading-10'>
                    {membersActive}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Inactive */}
          <Card className='w-[270px] md:w-[300px] shadow-md dark:shadow-slate-700 dark:bg-slate-900 bg-slate-50'>
            <CardHeader className='py-4'>
              <div className='flex justify-center gap-4 h-[5rem] relative'>
                <span className='absolute -top-3 left-8 font-bold text-[14px] md:text-[15px] xl:text-[16px]'>
                  {((membersInactive / (membersActive + membersInactive)) * 100).toFixed(0)}%
                </span>
                <ResponsiveContainer width='50%' height='125%'>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={dataMembers}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      outerRadius={35}
                      dataKey='value'
                    >
                      {dataMembers.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS_INACTIVE[index % COLORS_INACTIVE.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className='flex flex-col  items-center justify-center'>
                  <CardDescription className='text-[14.5px] md:text-[15px] xl:text-[16px]  font-bold text-center'>
                    Tasa de miembros <span className='text-red-500'>Inactivos</span>
                  </CardDescription>
                  <CardTitle className='text-center text-[2.2rem] xl:text-[2.5rem] font-extrabold leading-10'>
                    {membersInactive}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* ----------------------------------------------------------------------------------------------------------------------- */}
      {/* Gráficos independientes */}

      {/* Fluctuación de Miembros (nuevos - bajas) */}
      <div className='mt-10 px-8 md:px-10 flex flex-col xl:grid xl:grid-cols-2 gap-8 h-[90rem] xl:h-auto'>
        <Card className='flex flex-col col-start-1 col-end-2 h-[18rem] lg:h-[20rem] xl:h-[25rem] 2xl:h-[26rem] m-0 border-slate-400'>
          <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 2xl:p-4'>
            <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
              Fluctuación de miembros
            </h3>
            <Form {...form}>
              <form>
                <FormField
                  control={form.control}
                  name='termDate'
                  render={({ field }) => (
                    <FormItem>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[224px] text-left font-normal justify-center p-4 text-[12px] md:text-[13px]',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className='mr-[0.1rem] h-4 w-4' />
                              {field?.value?.from ? (
                                field?.value.to ? (
                                  <>
                                    {format(field?.value.from, 'LLL dd, y', {
                                      locale: es,
                                    })}{' '}
                                    -{' '}
                                    {format(field?.value.to, 'LLL dd, y', {
                                      locale: es,
                                    })}
                                  </>
                                ) : (
                                  format(field?.value.from, 'LLL dd, y')
                                )
                              ) : (
                                <span className='text-[14px] md:text-[15px]'>Elige las fechas</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            initialFocus
                            mode='range'
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              if (date?.from && date?.to) {
                                form.handleSubmit(onSubmit)();
                                setOpen(false);
                              }
                            }}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className='text-center' />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <ResponsiveContainer
            width='100%'
            height={
              form.formState.errors.termDate?.message && isDesktop
                ? '75%'
                : form.formState.errors.termDate?.message && !isDesktop
                  ? '60%'
                  : isDesktopXL
                    ? '100%'
                    : '80%'
            }
            aspect={0}
          >
            <BarChart
              data={data}
              width={500}
              height={300}
              margin={{ top: 5, right: 30, left: -20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#c8c8c8'></CartesianGrid>
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip labelClassName='text-black' />

              {!form.formState.errors.termDate?.message && <Legend wrapperStyle={{ left: 0 }} />}

              <Bar dataKey='Nuevos' fill='#22C55E' />
              <Bar dataKey='Bajas' fill='#EF4444' />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Cantidad de miembros x mes de cumpleaños */}
        <Card className='flex flex-col col-start-2 col-end-3 h-[18rem] lg:h-[25rem] xl:h-[25rem] 2xl:h-[26rem] m-0 border-slate-400'>
          <h3 className='p-2 text-center font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
            Miembros por mes de cumpleaños
          </h3>
          <ResponsiveContainer width='100%' height='100%'>
            <ComposedChart
              layout='vertical'
              width={500}
              height={400}
              data={dataBirthday}
              margin={{ top: 5, right: 30, left: -5, bottom: 10 }}
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

        {/* Rango de edad y categoría (tipo y porcentaje de varones y mujeres por cat) */}

        <Card className='flex flex-col row-start-2 row-end-3 col-start-1 col-end-2 h-[18rem] lg:h-[20rem] xl:h-[25rem] 2xl:h-[26rem] m-0 border-slate-400'>
          <h3 className='p-2 text-center font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
            Miembros por categoría
          </h3>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              width={500}
              height={400}
              data={dataCategory}
              stackOffset='expand'
              margin={{ top: 5, right: 40, left: 5, bottom: 10 }}
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

        {/* Por estado civil */}

        <Card className='flex flex-col row-start-2 row-end-3 col-start-2 col-end-3 h-[18rem] lg:h-[20rem] xl:h-[25rem] 2xl:h-[26rem] m-0 border-slate-400'>
          <h3 className='p-2 text-center font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
            Miembros por Estado Civil
          </h3>
          <BarChart
            width={630}
            height={350}
            data={dataMaritalStatus}
            margin={{ top: 5, right: 40, left: -15, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='status' />
            <YAxis />
            <Bar
              dataKey='members'
              fill='#8884d8'
              shape={<TriangleBar />}
              label={{ position: 'top' }}
            >
              {dataMaritalStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </Card>
      </div>
    </div>
  );
};
