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

const chartData = [
  { date: '02/03', dia: 75.5, tarde: 85.5 },
  { date: '09/03', dia: 90.2, tarde: 55.7 },
  { date: '16/03', dia: 45.2, tarde: 100.2 },
  { date: '23/03', dia: 62.8, tarde: 45.2 },
  { date: '30/03', dia: 85.2, tarde: 39.7 },
  { date: '06/04', dia: 43.3, tarde: 54.4 },
  { date: '13/04', dia: 43.3, tarde: 23.4 },
];

const chartConfig = {
  dia: {
    label: 'Dia',
    color: '#F09330',
  },
  tarde: {
    label: 'Tarde',
    color: '#0284C7',
  },
} satisfies ChartConfig;

export const BarChartOfferings = (): JSX.Element => {
  //* Form

  return (
    <Card className='flex flex-col row-start-1 row-end-2 col-start-1 col-end-3 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-3 lg:row-start-1 lg:row-end-2 xl:col-start-1 xl:col-end-4 xl:row-start-1 xl:row-end-2 h-[20rem] lg:h-[22rem] xl:h-[25rem] 2xl:h-[26rem] m-0 border-slate-400'>
      <CardHeader className='flex flex-col items-center justify-between p-2'>
        <CardTitle className='font-bold text-xl sm:text-2xl md:text-[1.36rem] lg:text-[1.60rem] xl:text-[1.50em] 2xl:text-[1.75rem] inline-block'>
          Ofrendas - Dominicales
        </CardTitle>
        <CardDescription className='text-[14.5px]'>Ultimas ofrendas dominicales</CardDescription>
      </CardHeader>

      <CardContent className='h-full py-0'>
        <ChartContainer
          config={chartConfig}
          className={cn('w-full h-[245px] lg:h-[275px] xl:h-[325px] 2xl:h-[335px]')}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 5, right: 5, left: -32, bottom: 10 }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey='date'
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

            <ChartLegend content={<ChartLegendContent className='text-[12px] sm:text-[14px]' />} />

            <Bar dataKey='dia' fill='var(--color-dia)' radius={4} />
            <Bar dataKey='tarde' fill='var(--color-tarde)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// className={cn(
//   !form.formState.errors.dateTerm?.message &&
//     'w-full h-[210px] sm:h-[245px] lg:h-[275px] xl:h-[330px]',
//   form.formState.errors.dateTerm?.message && 'md:h-[260px] h-[300px] w-full'
// )}
//   const [open, setOpen] = useState(false);
// function onSubmit(values: z.infer<typeof barChartFormSchema>): void {
//   console.log({ values });
// }
// const form = useForm<z.infer<typeof barChartFormSchema>>({
//   resolver: zodResolver(barChartFormSchema),
//   mode: 'onChange',
//   defaultValues: {},
// });
/* <Form {...form}>
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
  </Form> */
