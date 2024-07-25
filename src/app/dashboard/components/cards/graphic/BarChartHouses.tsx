/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { cn } from '@/shared/lib/utils';

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/components/ui/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

import { dashBoardChartFormSchema } from '@/app/dashboard/validations';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Button } from '@/shared/components/ui/button';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';
import { years } from '@/shared/data';

// TODO : se podría traer las ofrendas de casa y ver cual casa gano por semana,
// TODO : 10 casas no mas y lanzar el top acumulativo de ofrendas casa ves que se ingresa el dato se suma al acumulado
const chartData = [
  { 'family-group-code': 'A-1', discípulos: 5, ofrenda: 25.5 },
  { 'family-group-code': 'A-2', discípulos: 6, ofrenda: 30.2 },
  { 'family-group-code': 'A-3', discípulos: 9, ofrenda: 18.2 },
  { 'family-group-code': 'A-4', discípulos: 8, ofrenda: 9.2 },
  { 'family-group-code': 'B-1', discípulos: 5, ofrenda: 44.8 },
  { 'family-group-code': 'B-2', discípulos: 8, ofrenda: 17.2 },
  { 'family-group-code': 'B-3', discípulos: 10, ofrenda: 23.3 },
  { 'family-group-code': 'B-4', discípulos: 5, ofrenda: 32.1 },
  { 'family-group-code': 'C-1', discípulos: 7, ofrenda: 45.4 },
  { 'family-group-code': 'C-2', discípulos: 6, ofrenda: 21.9 },
];

const chartConfig = {
  ofrenda: {
    label: 'Ofrenda',
    color: '#029012',
  },
  discípulos: {
    label: 'Discípulos',
    color: '#0ED0D0',
  },
} satisfies ChartConfig;

export const BarChartHouse = (): JSX.Element => {
  //* States
  const [isInputSearchYearOpen, setIsInputSearchYearOpen] = useState<boolean>(false);

  //* Form
  const form = useForm<z.infer<typeof dashBoardChartFormSchema>>({
    resolver: zodResolver(dashBoardChartFormSchema),
    mode: 'onChange',
    defaultValues: {
      year: '2024',
    },
  });

  //* Form handler
  const handleSubmit = (values: z.infer<typeof dashBoardChartFormSchema>): void => {
    console.log({ values });
  };

  return (
    <Card className='flex flex-col row-start-2 row-end-3 col-start-1 col-end-3 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 lg:row-start-2 lg:row-end-3 xl:col-start-4 xl:col-end-7 xl:row-start-1 xl:row-end-2 h-[20rem] lg:h-[22rem] xl:h-[25rem] 2xl:h-[26rem] mt-0 border-slate-500'>
      <div className='grid grid-cols-4 justify-center items-center'>
        <CardHeader className='flex flex-col items-center justify-center p-2 col-span-3'>
          <CardTitle className='font-bold pl-[5rem] md:pl-[12rem] lg:pl-[16rem] xl:pl-[6.8rem] 2xl:pl-[8.5rem] 3-xl:pl-[16rem] text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50rem] 2xl:text-[1.75rem] inline-block'>
            Ofrendas - Grupo Familiar
          </CardTitle>
          <CardDescription className='text-[14.5px] pl-[5rem] md:pl-[12rem] lg:pl-[16rem] xl:pl-[6.8rem] 2xl:pl-[8.5rem] 3-xl:pl-[16rem] text-center'>
            Top de ofrendas por grupo familiar (anual)
          </CardDescription>
        </CardHeader>

        <div className='col-span-1 flex justify-center -pl-[2rem]'>
          <Form {...form}>
            <form className='flex'>
              <FormField
                control={form.control}
                name='year'
                render={({ field }) => {
                  return (
                    <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                      <Popover open={isInputSearchYearOpen} onOpenChange={setIsInputSearchYearOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'justify-between w-full text-center px-2',
                                !field.value &&
                                  'text-slate-500 dark:text-slate-200 font-normal px-2'
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
                                    year && form.handleSubmit(handleSubmit)();
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
      </div>

      <CardContent className='h-full py-0'>
        <ChartContainer
          config={chartConfig}
          className={cn('w-full h-[225px] sm:h-[240px] lg:h-[275px] xl:h-[325px] 2xl:h-[335px]')}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 5, right: 5, left: -32, bottom: 10 }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey='family-group-code'
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 6)}
              className='text-[12px] sm:text-[14px]'
            />

            <YAxis className='text-[12px] sm:text-[14px]' />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent className='text-[12px] sm:text-[14px]' indicator='dot' />
              }
            />

            <ChartLegend
              content={<ChartLegendContent className='ml-10 text-[12px] sm:text-[14px]' />}
            />

            <Bar dataKey='discípulos' fill='var(--color-discípulos)' radius={4} />
            <Bar dataKey='ofrenda' fill='var(--color-ofrenda)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
