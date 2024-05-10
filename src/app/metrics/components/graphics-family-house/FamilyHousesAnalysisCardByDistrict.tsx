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

import { districts } from '@/shared/data';

import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';

const dataDistrictIndep = [
  {
    'urban-sector': 'Independencia',
    Casas: 7,
  },
  {
    'urban-sector': 'Payet',
    Casas: 9,
  },
  {
    'urban-sector': 'Tahuantinsuyo',
    Casas: 10,
  },
  {
    'urban-sector': 'Ermitaño',
    Casas: 7,
  },
  {
    'urban-sector': 'Unificada',
    Casas: 9,
  },
  {
    'urban-sector': 'Industrial',
    Casas: 8,
  },
];

const dataDistrictPuenteP = [
  {
    'urban-sector': 'Ensenada',
    Casas: 3,
  },
  {
    'urban-sector': 'Laderas',
    Casas: 4,
  },
  {
    'urban-sector': 'Shangri_La',
    Casas: 4,
  },
  {
    'urban-sector': 'Cercado',
    Casas: 3,
  },
  {
    'urban-sector': 'Copacabana',
    Casas: 2,
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

export const FamilyHousesAnalysisCardByDistrict = (): JSX.Element => {
  //* States
  const [isInputSearchDistrictOpen, setIsInputSearchDistrictOpen] = useState<boolean>(false);
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
      all: false,
      district: '',
    },
  });

  //* Form handler
  const handleSubmit = (values: z.infer<typeof chartFormValidationSchema>): void => {
    console.log({ values });
  };

  //* Watchers
  const district = form.watch('district');
  const all = form.watch('all');

  //* Effects
  useEffect(() => {
    if (district === 'puente_piedra') {
      setDataResult(dataDistrictPuenteP);
    }
    if (district === 'independencia') {
      setDataResult(dataDistrictIndep);
    }
    if (!district) {
      setDataResult(dataDistrictIndep);
    }

    if (all) {
      setDataResult([...dataDistrictIndep, ...dataDistrictPuenteP]);
    }
  }, [district, all]);

  const totalCantidad = dataResult.reduce((total, item) => total + item.Casas, 0);
  const newData = dataResult.map((item) => ({
    ...item,
    Porcentaje: ((item.Casas / totalCantidad) * 100).toFixed(1),
  }));

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 xl:px-3 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Casas Familiares (distrito)
        </h3>
        <Form {...form}>
          <form className='flex'>
            <FormField
              control={form.control}
              name='district'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover
                      open={isInputSearchDistrictOpen}
                      onOpenChange={setIsInputSearchDistrictOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={all}
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-center px-2',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-4'
                            )}
                          >
                            {field.value
                              ? districts.find((district) => district.value === field.value)?.label
                              : 'Elige un distrito'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque un distrito...'
                            className='h-9 text-[14px]'
                          />
                          <CommandEmpty>Distrito no encontrado.</CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {districts.map((district) => (
                              <CommandItem
                                className='text-[14px]'
                                value={district.label}
                                key={district.value}
                                onSelect={() => {
                                  form.setValue('district', district.value);
                                  form.handleSubmit(handleSubmit)();
                                  setIsInputSearchDistrictOpen(false);
                                }}
                              >
                                {district.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    district.value === field.value ? 'opacity-100' : 'opacity-0'
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
              name='all'
              render={({ field }) => (
                <FormItem className='flex flex-row items-end space-x-3 space-y-0 rounded-md border p-3 h-[2.5rem]'>
                  <FormControl>
                    <Checkbox
                      checked={field?.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        checked && form.resetField('district');
                        checked && form.handleSubmit(handleSubmit)();
                      }}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel className='text-[13px] md:text-[14px]'>Todos</FormLabel>
                  </div>
                </FormItem>
              )}
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
          <XAxis dataKey='urban-sector' />
          {!all && <YAxis type='number' />}
          {all && <YAxis type='number' domain={[0, 20]} allowDataOverflow />}
          <Tooltip content={renderTooltipContent} />
          <Legend />
          <Bar dataKey='Casas' fill='#62d723' />
          <Line type='linear' dataKey='Porcentaje' stroke='#ff7300' />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
