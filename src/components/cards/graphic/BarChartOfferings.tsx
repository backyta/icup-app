/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
// import { DatePickerWithRange } from '@/components/date-pickers/DateRagePicker';
import { useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { useForm } from 'react-hook-form';

import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { barChartFormSchema } from '@/validations';

import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// TODO : Colocar fechas y cantidades del mes anterior, por defecto, hacer un efecto cada 30 o 32 días.
const data = [
  { date: '02/03', Dia: 75.5, Tarde: 85.5 },
  { date: '09/03', Dia: 90.2, Tarde: 55.7 },
  { date: '16/03', Dia: 45.2, Tarde: 100.2 },
  { date: '23/03', Dia: 62.8, Tarde: 45.2 },
  { date: '30/03', Dia: 85.2, Tarde: 39.7 },
  { date: '06/04', Dia: 43.3, Tarde: 54.4 },
  { date: '13/04', Dia: 43.3, Tarde: 23.4 },
];

export const BarChartOfferings = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useForm<z.infer<typeof barChartFormSchema>>({
    resolver: zodResolver(barChartFormSchema),
    mode: 'onChange',
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof barChartFormSchema>): void {
    console.log({ values });
  }

  return (
    <Card className='flex flex-col row-start-1 row-end-2 col-start-1 col-end-3 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-3 lg:row-start-1 lg:row-end-2 xl:col-start-1 xl:col-end-4 xl:row-start-1 xl:row-end-2 h-[18rem] lg:h-[20rem] xl:h-[25rem] 2xl:h-[26rem] m-0 border-slate-400'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Ofrendas - Dominicales
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
                            <span className='text-[14px] md:text-[15px]'>
                              Elige las fechas
                            </span>
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
            ? '80%'
            : form.formState.errors.termDate?.message && !isDesktop
              ? '60%'
              : '100%'
        }
        aspect={0}
      >
        <BarChart
          data={data}
          width={500}
          height={300}
          margin={{ top: 5, right: 20, left: -20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3'></CartesianGrid>
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />

          {!form.formState.errors.termDate?.message && (
            <Legend wrapperStyle={{ left: 0 }} />
          )}

          <Bar dataKey='Dia' fill='#F09330' />
          <Bar dataKey='Tarde' fill='#0284C7' />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
