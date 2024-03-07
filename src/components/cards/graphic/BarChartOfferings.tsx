/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
// import { DatePickerWithRange } from '@/components/date-pickers/DateRagePicker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
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
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { barChartFormSchema } from '@/validations';
import { type z } from 'zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';

const data = [
  { date: '25/11', Dia: 75.5, Tarde: 85.5 },
  { date: '26/11', Dia: 90.2, Tarde: 55.7 },
  { date: '26/11', Dia: 45.2, Tarde: 100.2 },
  { date: '26/11', Dia: 62.8, Tarde: 45.2 },
  { date: '26/11', Dia: 85.2, Tarde: 39.7 },
  { date: '26/11', Dia: 43.3, Tarde: 56.4 },
];

export const BarChartOfferings = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof barChartFormSchema>>({
    resolver: zodResolver(barChartFormSchema),
    mode: 'onChange',
    defaultValues: {
      // termDate: { from: new Date(), to: new Date() },
    },
  });

  function onSubmit(values: z.infer<typeof barChartFormSchema>): void {
    // form.reset();
    console.log({ values });
  }
  // console.log(form.getValues('termDate'));
  // console.log(form.getValues('termDate.from'));
  // console.log(form.getValues('termDate.to'));

  // TODO : mostrar los graficos despues de elegir la fecha y el mensaje de error, solo mostrar el esquema
  // TODO : poner valores y fechas por defecto para que no se vea vacio
  // TODO : al hacer click o elegir poner los graficos en 0 O en todo caso agrandar un poco el hight de las tablas.
  return (
    <Card className='flex flex-col row-start-1 row-end-2 col-start-1 col-end-3 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-3 lg:row-start-1 lg:row-end-2 xl:col-start-1 xl:col-end-4 xl:row-start-1 xl:row-end-2 h-[16rem] lg:h-[18rem] xl:h-[25rem] 2xl:h-[26rem] m-0 border-slate-400'>
      <div className='flex flex-col sm:flex-row items-center justify-between p-3 md:p-3 lg:p-3 xl:p-2 2xl:p-4'>
        <h3 className='font-bold mb-2 sm:mb-0 text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-3xl inline-block'>
          Ofrendas - Dominicales
        </h3>
        {/* <DatePickerWithRange></DatePickerWithRange> */}
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
                            <span className='text-[12px] md:text-[13px]'>
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
                  <FormMessage className='text-blue-500' />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <ResponsiveContainer width='100%' aspect={0}>
        <BarChart
          data={data}
          width={500}
          height={300}
          margin={{ top: 5, right: 10, left: 10, bottom: 2 }}
        >
          <CartesianGrid strokeDasharray='4 1 2'></CartesianGrid>
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Dia' fill='#F09330' />
          <Bar dataKey='Tarde' fill='#0284C7' />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
