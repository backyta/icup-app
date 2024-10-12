/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/shared/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { FcDataBackup, FcDeleteDatabase } from 'react-icons/fc';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Bar, XAxis, YAxis, CartesianGrid, BarChart } from 'recharts';

import { getSimpleZones } from '@/modules/zone/services';
import { MetricSearchType } from '@/modules/metrics/enums';
import { metricsFormSchema } from '@/modules/metrics/validations';
import { getFamilyGroupsByWorshipTime } from '@/modules/metrics/services';
import { FamilyGroupsByWorshipTimeTooltipContent } from '@/modules/metrics/components/family-group/tooltips/components';

import { FamilyGroupWorshipTime, FamilyGroupWorshipTimeNames } from '@/modules/family-group/enums';

import { RecordOrder } from '@/shared/enums';

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/shared/components/ui/form';
import {
  Command,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from '@/shared/components/ui/command';
import {
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  type ChartConfig,
  ChartLegendContent,
} from '@/shared/components/ui/chart';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

const chartConfig = {
  worshipTimesCount: {
    label: 'Horario de Culto',
    color: '#da43f2',
  },
} satisfies ChartConfig;

interface ResultDataOptions {
  worshipTime: string;
  worshipTimesCount: number;
  supervisor: string;
  totalPercentage: string;
}

interface SearchParamsOptions {
  zone?: string;
  allZones?: boolean;
}

interface Props {
  churchId: string | undefined;
}

export const FamilyGroupAnalysisCardByWorshipTime = ({ churchId }: Props): JSX.Element => {
  //* States
  const [isInputSearchZoneOpen, setIsInputSearchZoneOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();

  //* Form
  const form = useForm<z.infer<typeof metricsFormSchema>>({
    resolver: zodResolver(metricsFormSchema),
    mode: 'onChange',
    defaultValues: {
      zone: searchParams ? searchParams.zone : '',
      all: false,
    },
  });

  //* Watchers
  const zone = form.watch('zone');
  const all = form.watch('all');

  //* Queries
  const zonesQuery = useQuery({
    queryKey: ['zones-for-family-groups-worship-time', churchId],
    queryFn: () => getSimpleZones({ church: churchId ?? '', isSimpleQuery: true }),
  });

  const familyGroupsByWorshipTimeQuery = useQuery({
    queryKey: ['family-groups-by-worship-time', { ...searchParams, church: churchId }],
    queryFn: () => {
      return getFamilyGroupsByWorshipTime({
        searchType: MetricSearchType.FamilyGroupsByServiceTime,
        zone: searchParams?.zone ?? zone,
        allZones: !!all,
        order: RecordOrder.Ascending,
        church: churchId ?? '',
      });
    },
    retry: 1,
    enabled: !!searchParams?.zone && !!churchId && !!zonesQuery?.data && !!zonesQuery.data.length,
  });

  //* Effects
  // Default value
  useEffect(() => {
    if (zonesQuery.data) {
      const zone = zonesQuery?.data?.map((zone) => zone?.id)[0];
      setSearchParams({ zone });
      form.setValue('zone', zone);
      form.setValue('all', false);
    }
  }, [zonesQuery?.data]);

  // Set data
  useEffect(() => {
    if (familyGroupsByWorshipTimeQuery?.data) {
      const transformedData = Object.entries(familyGroupsByWorshipTimeQuery?.data).map(
        ([key, payload]) => {
          const totalMembers: number = Object.values(familyGroupsByWorshipTimeQuery?.data).reduce(
            (total: number, item: { worshipTimesCount: number }) => total + item.worshipTimesCount,
            0
          );

          return {
            worshipTime:
              key === FamilyGroupWorshipTime.Time0900
                ? FamilyGroupWorshipTimeNames[key as FamilyGroupWorshipTime]
                : FamilyGroupWorshipTime.Time1000
                  ? FamilyGroupWorshipTimeNames[key as FamilyGroupWorshipTime]
                  : FamilyGroupWorshipTime.Time1600
                    ? FamilyGroupWorshipTimeNames[key as FamilyGroupWorshipTime]
                    : FamilyGroupWorshipTime.Time1630
                      ? FamilyGroupWorshipTimeNames[key as FamilyGroupWorshipTime]
                      : FamilyGroupWorshipTime.Time1700
                        ? FamilyGroupWorshipTimeNames[key as FamilyGroupWorshipTime]
                        : FamilyGroupWorshipTime.Time1730
                          ? FamilyGroupWorshipTimeNames[key as FamilyGroupWorshipTime]
                          : FamilyGroupWorshipTime.Time1800
                            ? FamilyGroupWorshipTimeNames[key as FamilyGroupWorshipTime]
                            : FamilyGroupWorshipTime.Time1830
                              ? FamilyGroupWorshipTimeNames[key as FamilyGroupWorshipTime]
                              : FamilyGroupWorshipTime.Time1900
                                ? FamilyGroupWorshipTimeNames[key as FamilyGroupWorshipTime]
                                : FamilyGroupWorshipTime.Time1930
                                  ? FamilyGroupWorshipTimeNames[key as FamilyGroupWorshipTime]
                                  : FamilyGroupWorshipTime.Time2000
                                    ? FamilyGroupWorshipTimeNames[key as FamilyGroupWorshipTime]
                                    : '',
            worshipTimesCount: payload?.worshipTimesCount,
            supervisor: payload?.supervisor,
            totalPercentage: ((payload.worshipTimesCount / totalMembers) * 100).toFixed(1),
          };
        }
      );

      setMappedData(transformedData);
    }

    if (!familyGroupsByWorshipTimeQuery?.data) {
      setMappedData([]);
    }
  }, [familyGroupsByWorshipTimeQuery?.data, zone]);

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof metricsFormSchema>): void => {
    setSearchParams(formData);
  };
  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[22rem] md:h-[28rem] lg:h-[25rem] 2xl:h-[26rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardHeader className='z-10 flex flex-col sm:flex-row items-center justify-between px-4 py-2.5'>
        <CardTitle className='flex justify-center items-center gap-2 font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
          <span>Grupos F. (hora-culto)</span>
          {!!zonesQuery?.data?.length && (
            <Badge
              variant='active'
              className='mt-1 text-[10px] md:text-[11px] py-0.3 md:py-0.35 tracking-wide'
            >
              Activos
            </Badge>
          )}
        </CardTitle>
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
                              'justify-between w-full text-center overflow-hidden px-2 text-[12px] md:text-[14px]',
                              !field.value && 'text-slate-500 dark:text-slate-200 font-normal px-2'
                            )}
                          >
                            {field.value
                              ? `${zonesQuery?.data?.find((zone) => zone.id === searchParams?.zone)?.zoneName}`
                              : searchParams?.zone
                                ? `${zonesQuery?.data?.find((zone) => zone.id === searchParams?.zone)?.zoneName}`
                                : 'Elige una zona'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        {zonesQuery?.data?.length && zonesQuery?.data?.length > 0 ? (
                          <>
                            <Command>
                              <CommandInput
                                placeholder='Busque una zona...'
                                className='h-9 text-[12px] md:text-[14px]'
                              />
                              <CommandEmpty>Zona no encontrada.</CommandEmpty>
                              <CommandGroup className='max-h-[200px] h-auto'>
                                {zonesQuery?.data?.map((zone) => (
                                  <CommandItem
                                    className='text-[12px] md:text-[14px]'
                                    value={zone.zoneName}
                                    key={zone.id}
                                    onSelect={() => {
                                      form.setValue('zone', zone.id);
                                      form.handleSubmit(handleSubmit)();
                                      setIsInputSearchZoneOpen(false);
                                    }}
                                  >
                                    {zone.zoneName}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        zone.id === field.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </>
                        ) : (
                          zonesQuery?.data?.length === 0 && (
                            <p className='text-[12px] md:text-[14px] font-medium text-red-500 text-center'>
                              ❌No hay zonas disponibles.
                            </p>
                          )
                        )}
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
                        form.handleSubmit(handleSubmit)();
                      }}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel className='text-[12px] md:text-[14px]'>Todos</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardHeader>

      {!mappedData?.length && !searchParams ? (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full pl-3 pr-6 py-0'>
          {familyGroupsByWorshipTimeQuery?.isFetching && !mappedData?.length && (
            <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
              <FcDataBackup className='text-[6rem] pb-2' />
              <p>Consultando datos....</p>
            </div>
          )}
          {!!mappedData?.length && searchParams && (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[252px] sm:h-[285px] md:h-[290px] lg:h-[330px] xl:h-[330px] 2xl:h-[345px]'
              )}
            >
              <BarChart
                accessibilityLayer
                data={mappedData}
                margin={{ top: 5, right: 5, left: -28, bottom: 10 }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='worshipTime'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  tickFormatter={(value) => value.slice(0, 10)}
                  className='text-[12px] md:text-[14px]'
                />
                <YAxis type='number' className='text-[12px] md:text-[14px]' />
                <ChartTooltip
                  cursor={false}
                  content={FamilyGroupsByWorshipTimeTooltipContent as any}
                />
                <ChartLegend
                  content={<ChartLegendContent className='ml-10 text-[12px] md:text-[14px]' />}
                />
                <Bar dataKey='worshipTimesCount' fill='var(--color-worshipTimesCount)' radius={4} />
              </BarChart>
            </ChartContainer>
          )}
          {!familyGroupsByWorshipTimeQuery?.isFetching && !mappedData?.length && (
            <div className='text-red-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
              <FcDeleteDatabase className='text-[6rem] pb-2' />
              <p>No hay datos disponibles para mostrar.</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
