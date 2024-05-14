/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@react-hook/media-query';

import { cn } from '@/shared/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import {
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
} from 'recharts';

import { chartFormValidationSchema } from '@/app/metrics/validations';

import { months, years } from '@/shared/data';

import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';

const dataJanuary = [
  {
    type: 'Culto Dom.',
    Cantidad: 720.2,
  },
  {
    type: 'Casa Fam.',
    Cantidad: 1650.4,
  },
  {
    type: 'Ayuno Gen.',
    Cantidad: 235.2,
  },
  {
    type: 'Vigilia Gen.',
    Cantidad: 52.3,
  },
  {
    type: 'Ayuno Zon.',
    Cantidad: 36.2,
  },
  {
    type: 'Vigilia Zon.',
    Cantidad: 40.6,
  },
  {
    type: 'Escuela Dom.',
    Cantidad: 125.4,
  },
  {
    type: 'Culto Jóv.',
    Cantidad: 142.9,
  },
  {
    type: 'Culto Unido',
    Cantidad: 97.3,
  },
  {
    type: 'Actividades',
    Cantidad: 467.3,
  },
  {
    type: 'Terreno Igle.',
    Cantidad: 626.3,
  },
  {
    type: 'Ofrenda Esp.',
    Cantidad: 340.3,
  },
  {
    type: 'Ajus. Ingresos',
    Cantidad: 140.3,
  },
];

const dataFebruary = [
  {
    type: 'Culto Dom.',
    Cantidad: 750.3,
  },
  {
    type: 'Casa Fam.',
    Cantidad: 1700.5,
  },
  {
    type: 'Ayuno Gen.',
    Cantidad: 245.1,
  },
  {
    type: 'Vigilia Gen.',
    Cantidad: 55.7,
  },
  {
    type: 'Ayuno Zon.',
    Cantidad: 38.3,
  },
  {
    type: 'Vigilia Zon.',
    Cantidad: 42.1,
  },
  {
    type: 'Escuela Dom.',
    Cantidad: 130.6,
  },
  {
    type: 'Culto Jóv.',
    Cantidad: 150.2,
  },
  {
    type: 'Culto Unido',
    Cantidad: 101.8,
  },
  {
    type: 'Actividades',
    Cantidad: 480.7,
  },
  {
    type: 'Terreno Igle.',
    Cantidad: 640.1,
  },
  {
    type: 'Ofrenda Esp.',
    Cantidad: 350.4,
  },
  {
    type: 'Ajus. Ingresos',
    Cantidad: 140.3,
  },
];

const dataMarch = [
  {
    type: 'Culto Dom.',
    Cantidad: 770.1,
  },
  {
    type: 'Casa Fam.',
    Cantidad: 1750.3,
  },
  {
    type: 'Ayuno Gen.',
    Cantidad: 255.4,
  },
  {
    type: 'Vigilia Gen.',
    Cantidad: 58.2,
  },
  {
    type: 'Ayuno Zon.',
    Cantidad: 40.1,
  },
  {
    type: 'Vigilia Zon.',
    Cantidad: 43.7,
  },
  {
    type: 'Escuela Dom.',
    Cantidad: 135.2,
  },
  {
    type: 'Culto Jóv.',
    Cantidad: 155.4,
  },
  {
    type: 'Culto Unido',
    Cantidad: 105.6,
  },
  {
    type: 'Actividades',
    Cantidad: 495.8,
  },
  {
    type: 'Terreno Igle.',
    Cantidad: 655.3,
  },
  {
    type: 'Ofrenda Esp.',
    Cantidad: 360.7,
  },
  {
    type: 'Ajus. Ingresos',
    Cantidad: 140.3,
  },
];

const dataApril = [
  {
    type: 'Culto Dom.',
    Cantidad: 790.5,
  },
  {
    type: 'Casa Fam.',
    Cantidad: 1800.2,
  },
  {
    type: 'Ayuno Gen.',
    Cantidad: 265.7,
  },
  {
    type: 'Vigilia Gen.',
    Cantidad: 60.3,
  },
  {
    type: 'Ayuno Zon.',
    Cantidad: 41.8,
  },
  {
    type: 'Vigilia Zon.',
    Cantidad: 45.6,
  },
  {
    type: 'Escuela Dom.',
    Cantidad: 140.9,
  },
  {
    type: 'Culto Jóv.',
    Cantidad: 160.7,
  },
  {
    type: 'Culto Unido',
    Cantidad: 110.4,
  },
  {
    type: 'Actividades',
    Cantidad: 510.6,
  },
  {
    type: 'Terreno Igle.',
    Cantidad: 670.8,
  },
  {
    type: 'Ofrenda Esp.',
    Cantidad: 370.5,
  },
  {
    type: 'Ajus. Ingresos',
    Cantidad: 140.3,
  },
];

const dataMay = [
  {
    type: 'Culto Dom.',
    Cantidad: 810.2,
  },
  {
    type: 'Casa Fam.',
    Cantidad: 1850.7,
  },
  {
    type: 'Ayuno Gen.',
    Cantidad: 275.3,
  },
  {
    type: 'Vigilia Gen.',
    Cantidad: 62.8,
  },
  {
    type: 'Ayuno Zon.',
    Cantidad: 43.5,
  },
  {
    type: 'Vigilia Zon.',
    Cantidad: 47.2,
  },
  {
    type: 'Escuela Dom.',
    Cantidad: 145.7,
  },
  {
    type: 'Culto Jóv.',
    Cantidad: 165.3,
  },
  {
    type: 'Culto Unido',
    Cantidad: 115.2,
  },
  {
    type: 'Actividades',
    Cantidad: 525.4,
  },
  {
    type: 'Terreno Igle.',
    Cantidad: 685.6,
  },
  {
    type: 'Ofrenda Esp.',
    Cantidad: 380.9,
  },
  {
    type: 'Ajus. Ingresos',
    Cantidad: 140.3,
  },
];

//* Functions
const renderTooltipContent = (o: any): JSX.Element => {
  const { payload, label } = o;

  return (
    <div className='bg-white p-2 text-black font-normal'>
      <p className=''>{`${label}`}</p>
      <ul>
        {payload.map((entry: any, index: any) =>
          entry.dataKey === 'Porcentaje' ? (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}%`}
            </li>
          ) : (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} soles`}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export const ComparativeOfferingIncomeAnalysisCardByMonth = (): JSX.Element => {
  //* States
  const [isInputSearchMonthOpen, setIsInputSearchMonthOpen] = useState<boolean>(false);
  const [isInputSearchYearOpen, setIsInputSearchYearOpen] = useState<boolean>(false);
  const [dataResult, setDataResult] = useState<any[]>([]);

  // * Media Queries Library hooks
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isDesktopLG = useMediaQuery('(min-width: 1024px)');
  const isDesktopXL = useMediaQuery('(min-width: 1280px)');

  //* Form
  const form = useForm<z.infer<typeof chartFormValidationSchema>>({
    resolver: zodResolver(chartFormValidationSchema),
    mode: 'onChange',
    defaultValues: {
      month: 'january',
      year: '2024',
    },
  });

  //* Form handler
  const handleSubmit = (values: z.infer<typeof chartFormValidationSchema>): void => {
    console.log({ values });
  };

  //* Watchers
  const month = form.watch('month');
  const year = form.watch('year');

  //* Effects
  useEffect(() => {
    if (year === '2024' && month === 'february') {
      setDataResult(dataFebruary);
    }
    if (year === '2024' && month === 'march') {
      setDataResult(dataMarch);
    }
    if (year === '2024' && month === 'april') {
      setDataResult(dataApril);
    }
    if (year === '2024' && month === 'may') {
      setDataResult(dataMay);
    }
    if (year === '2024' && month === 'january') {
      setDataResult(dataJanuary);
    }
    if (!month) {
      setDataResult(dataJanuary);
    }
  }, [month, year]);

  const totalAmount = dataResult.reduce((total, item) => total + item.Cantidad, 0);

  const newData = dataResult.map((item) => ({
    ...item,
    Porcentaje: ((item.Cantidad / totalAmount) * 100).toFixed(1),
  }));

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-3 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 xl:px-3 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Comparativa Ofrendas (mes)
        </h3>
        <Form {...form}>
          <form className='flex'>
            <FormField
              control={form.control}
              name='month'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover
                      open={isInputSearchMonthOpen}
                      onOpenChange={(e) => {
                        setIsInputSearchMonthOpen(e);
                        form.resetField('year', {
                          defaultValue: '',
                        });
                      }}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-center px-2',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-4'
                            )}
                          >
                            {field.value
                              ? months.find((month) => month.value === field.value)?.label
                              : 'Elige un mes'}
                            <CaretSortIcon className='h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un mes...'
                            className='h-9 text-[14px]'
                          />
                          <CommandEmpty>Mes no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[100px] h-auto'>
                            {months.map((month) => (
                              <CommandItem
                                className='text-[14px]'
                                value={month.label}
                                key={month.value}
                                onSelect={() => {
                                  form.setValue('month', month.value);
                                  month && year && form.handleSubmit(handleSubmit)();
                                  setIsInputSearchMonthOpen(false);
                                }}
                              >
                                {month.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    month.value === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='year'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover
                      open={isInputSearchYearOpen}
                      onOpenChange={(e) => {
                        setIsInputSearchYearOpen(e);
                        !month &&
                          form.resetField('month', {
                            defaultValue: '',
                          });
                      }}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-center px-2',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-2'
                            )}
                          >
                            {field.value
                              ? years.find((year) => year.value === field.value)?.label
                              : 'Año'}
                            <CaretSortIcon className='h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un año...'
                            className='h-9 text-[14px]'
                          />
                          <CommandEmpty>Año no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[100px] h-auto'>
                            {years.map((year) => (
                              <CommandItem
                                className='text-[14px]'
                                value={year.label}
                                key={year.value}
                                onSelect={() => {
                                  form.setValue('year', year.value);
                                  month && year && form.handleSubmit(handleSubmit)();
                                  setIsInputSearchYearOpen(false);
                                }}
                              >
                                {year.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    year.value === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </div>

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
          <XAxis dataKey='type' />
          <YAxis />
          <Tooltip content={renderTooltipContent} />
          <Legend />
          <Bar dataKey='Cantidad' fill='#1c9bdb' />
          <Line type='linear' dataKey='Porcentaje' stroke='#E46F21' />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
