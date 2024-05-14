/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/shared/lib/utils';

import { zones } from '@/app/family-house/data';

import { chartFormValidationSchema } from '@/app/metrics/validations';

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

const dataZoneA = [
  {
    'code-house': 'A-1',
    Varones: 3,
    Mujeres: 6,
    preacher: 'Felix Torres',
  },
  {
    'code-house': 'A-2',
    Varones: 5,
    Mujeres: 4,
    preacher: 'Johnathan Porras',
  },
  {
    'code-house': 'A-3',
    Varones: 2,
    Mujeres: 4,
    preacher: 'Marcelo Díaz',
  },
  {
    'code-house': 'A-4',
    Varones: 8,
    Mujeres: 2,
    preacher: 'Iris Fiestas',
  },
  {
    'code-house': 'A-5',
    Varones: 3,
    Mujeres: 19,
    preacher: 'Sofia Castillo',
  },
  {
    'code-house': 'A-6',
    Varones: 7,
    Mujeres: 8,
    preacher: 'Margarita Cruz',
  },
];

const dataZoneB = [
  {
    'code-house': 'B-1',
    Varones: 3,
    Mujeres: 6,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'B-2',
    Varones: 5,
    Mujeres: 4,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'B-3',
    Varones: 2,
    Mujeres: 4,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'B-4',
    Varones: 8,
    Mujeres: 2,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'B-5',
    Varones: 3,
    Mujeres: 19,
    preacher: 'Margarita Cruz',
  },
];

const dataZoneC = [
  {
    'code-house': 'C-1',
    Varones: 8,
    Mujeres: 2,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'C-2',
    Varones: 5,
    Mujeres: 8,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'C-3',
    Varones: 7,
    Mujeres: 2,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'C-4',
    Varones: 8,
    Mujeres: 3,
    preacher: 'Margarita Cruz',
  },
];

const dataZoneD = [
  {
    'code-house': 'D-1',
    Varones: 3,
    Mujeres: 6,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'D-2',
    Varones: 5,
    Mujeres: 4,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'D-3',
    Varones: 2,
    Mujeres: 4,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'D-4',
    Varones: 8,
    Mujeres: 2,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'D-5',
    Varones: 3,
    Mujeres: 19,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'D-6',
    Varones: 7,
    Mujeres: 8,
  },
  {
    'code-house': 'D-7',
    Varones: 7,
    Mujeres: 8,
    preacher: 'Margarita Cruz',
  },
  {
    'code-house': 'D-8',
    Varones: 7,
    Mujeres: 8,
    preacher: 'Margarita Cruz',
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
      <p className='zone'>{`Pred: ${payload[1]?.payload?.preacher}`}</p>
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

export const MemberAnalysisCardByFamilyHouse = (): JSX.Element => {
  //* States
  const [isInputSearchZoneOpen, setIsInputSearchZoneOpen] = useState<boolean>(false);
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
      zone: '',
    },
  });

  //* Form handler
  const handleSubmit = (values: z.infer<typeof chartFormValidationSchema>): void => {
    console.log({ values });
  };

  //* Watchers
  const zone = form.watch('zone');
  const all = form.watch('all');

  //* Effects
  useEffect(() => {
    if (zone === 'zone-2') {
      setDataResult(dataZoneB);
    }
    if (zone === 'zone-3') {
      setDataResult(dataZoneC);
    }
    if (zone === 'zone-4') {
      setDataResult(dataZoneD);
    }
    if (zone === 'zone-1') {
      setDataResult(dataZoneA);
    }
    if (!zone) {
      setDataResult(dataZoneA);
    }

    if (all) {
      setDataResult([...dataZoneA, ...dataZoneB, ...dataZoneC, ...dataZoneD]);
    }
  }, [zone, all]);

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40  flex flex-col col-start-2 col-end-3 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 xl:px-3 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Miembros (casas familiares)
        </h3>
        <Form {...form}>
          <form className='flex'>
            <FormField
              control={form.control}
              name='zone'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover open={isInputSearchZoneOpen} onOpenChange={setIsInputSearchZoneOpen}>
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
                              ? zones.find((zone) => zone.value === field.value)?.label
                              : 'Elige una zona'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          <CommandInput
                            placeholder='Busque una zona...'
                            className='h-9 text-[14px]'
                          />
                          <CommandEmpty>Zona no encontrada.</CommandEmpty>
                          <CommandGroup className='max-h-[200px] h-auto'>
                            {zones.map((zone) => (
                              <CommandItem
                                className='text-[14px]'
                                value={zone.label}
                                key={zone.value}
                                onSelect={() => {
                                  form.setValue('zone', zone.value);
                                  form.handleSubmit(handleSubmit)();
                                  setIsInputSearchZoneOpen(false);
                                }}
                              >
                                {zone.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    zone.value === field.value ? 'opacity-100' : 'opacity-0'
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
                        checked && form.resetField('zone');
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
          data={dataResult}
          stackOffset='expand'
          margin={{ top: 5, right: 30, left: -5, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#c8c8c8' />
          <XAxis dataKey='code-house' />
          <YAxis tickFormatter={toPercent} />
          <Tooltip content={renderTooltipContent} />
          <Area type='monotone' dataKey='Varones' stackId='1' stroke='#68c4f2' fill='#68c4f2' />
          <Area type='monotone' dataKey='Mujeres' stackId='1' stroke='#e54fc0' fill='#e54fc0' />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
