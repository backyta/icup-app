/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  { Miembros: 5, Casa: 'A-1', Ofrenda: 25.5 },
  { Miembros: 3, Casa: 'A-2', Ofrenda: 30.2 },
  { Miembros: 9, Casa: 'A-3', Ofrenda: 18.2 },
  { Miembros: 8, Casa: 'A-4', Ofrenda: 9.2 },
  { Miembros: 4, Casa: 'B-1', Ofrenda: 44.8 },
  { Miembros: 8, Casa: 'B-2', Ofrenda: 17.2 },
  { Miembros: 10, Casa: 'B-3', Ofrenda: 23.3 },
  { Miembros: 3, Casa: 'B-4', Ofrenda: 32.1 },
  { Miembros: 7, Casa: 'C-1', Ofrenda: 45.4 },
  { Miembros: 6, Casa: 'C-2', Ofrenda: 21.9 },
  { Miembros: 12, Casa: 'C-3', Ofrenda: 50.3 },
  { Miembros: 4, Casa: 'C-4', Ofrenda: 10.3 },
];

export const BarChartHouse = (): JSX.Element => {
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
    <Card className='flex flex-col row-start-2 row-end-3 col-start-1 col-end-3 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 lg:row-start-2 lg:row-end-3 xl:col-start-4 xl:col-end-7 xl:row-start-1 xl:row-end-2 h-[18rem] lg:h-[20rem] xl:h-[25rem] 2xl:h-[26rem]  mt-0 border-slate-500'>
      <div className='flex flex-col sm:flex-row items-center justify-between md:p-2 p-3 lg:p-3 xl:p-2 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50rem] 2xl:text-3xl inline-block'>
          Ofrendas - Casa Familiar
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
                  <FormMessage />
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
          <XAxis dataKey='Casa' />
          <YAxis />
          <Tooltip />

          {!form.formState.errors.termDate?.message && (
            <Legend wrapperStyle={{ left: 0 }} />
          )}
          <Bar dataKey='Ofrenda' fill='#029012' />
          <Bar dataKey='Miembros' fill='#0ED0D0' />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
