/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@react-hook/media-query';
import { barChartFormSchema } from '@/app/dashboard/validations';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/shared/lib/utils';

import { CalendarIcon } from '@radix-ui/react-icons';

import {
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';

const dataMembersByMonth = [
  { date: 'Enero', Nuevos: 10, Bajas: 2 },
  { date: 'Febrero', Nuevos: 12, Bajas: 0 },
  { date: 'Marzo', Nuevos: 11, Bajas: 1 },
  { date: 'Abril', Nuevos: 20, Bajas: 5 },
  { date: 'Mayo', Nuevos: 5, Bajas: 10 },
  { date: 'Junio', Nuevos: 2, Bajas: 5 },
  { date: 'Julio', Nuevos: 6, Bajas: 0 },
];

export const MemberFluctuationAnalysisCardByMonth = (): JSX.Element => {
  //* States
  const [open, setOpen] = useState(false);

  // * Media Queries Library hooks
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

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 xl:px-3 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Fluctuación de miembros
        </h3>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name='dateTerm'
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
                            <span className='text-[14px]'>Elige las fechas</span>
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
          form.formState.errors.dateTerm?.message && isDesktop
            ? '75%'
            : form.formState.errors.dateTerm?.message && !isDesktop
              ? '60%'
              : isDesktopXL
                ? '100%'
                : '80%'
        }
        aspect={0}
      >
        <BarChart
          data={dataMembersByMonth}
          width={500}
          height={300}
          margin={{ top: 5, right: 30, left: -15, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#c8c8c8'></CartesianGrid>
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip labelClassName='text-black' />

          {!form.formState.errors.dateTerm?.message && <Legend wrapperStyle={{ left: 0 }} />}

          <Bar dataKey='Nuevos' fill='#22C55E' />
          <Bar dataKey='Bajas' fill='#EF4444' />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
