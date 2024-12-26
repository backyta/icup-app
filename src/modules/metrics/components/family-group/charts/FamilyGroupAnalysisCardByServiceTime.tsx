/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { FcDataBackup, FcDeleteDatabase } from 'react-icons/fc';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Bar, XAxis, YAxis, CartesianGrid, BarChart } from 'recharts';

import { getSimpleZones } from '@/modules/zone/services/zone.service';

import {
  FamilyGroupServiceTime,
  FamilyGroupServiceTimeNames,
} from '@/modules/family-group/enums/family-group-service-time.enum';

import { MetricSearchType } from '@/modules/metrics/enums/metrics-search-type.enum';
import { metricsFormSchema } from '@/modules/metrics/validations/metrics-form-schema';
import { getFamilyGroupsByServiceTime } from '@/modules/metrics/services/family-group-metrics.service';
import { FamilyGroupsByServiceTimeTooltipContent } from '@/modules/metrics/components/family-group/tooltips/components/FamilyGroupsByServiceTimeTooltipContent';

import { cn } from '@/shared/lib/utils';

import { RecordOrder } from '@/shared/enums/record-order.enum';

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
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

const chartConfig = {
  serviceTimesCount: {
    label: 'Horario de Culto',
    color: '#da43f2',
  },
} satisfies ChartConfig;

interface ResultDataOptions {
  serviceTime: string;
  serviceTimesCount: number;
  copastor: string;
  supervisor: string;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
  totalPercentage: string;
}

interface SearchParamsOptions {
  zone?: string;
  all?: boolean;
}

interface Props {
  churchId: string | undefined;
}

export const FamilyGroupAnalysisCardByServiceTime = ({ churchId }: Props): JSX.Element => {
  //* States
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();
  const [isInputSearchZoneOpen, setIsInputSearchZoneOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);

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
    queryKey: ['zones-for-family-groups-service-time', churchId],
    queryFn: () => getSimpleZones({ churchId: churchId ?? '', isSimpleQuery: true }),
  });

  const familyGroupsByServiceTimeQuery = useQuery({
    queryKey: ['family-groups-by-service-time', { ...searchParams, church: churchId }],
    queryFn: () => {
      return getFamilyGroupsByServiceTime({
        searchType: MetricSearchType.FamilyGroupsByServiceTime,
        zone: searchParams?.zone ?? zone,
        allZones: searchParams?.all ?? all,
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
      setSearchParams({ zone, all: false });
      form.setValue('zone', zone);
      form.setValue('all', false);
    }
  }, [zonesQuery?.data]);

  // Set data
  useEffect(() => {
    if (familyGroupsByServiceTimeQuery?.data) {
      const transformedData = Object.entries(familyGroupsByServiceTimeQuery?.data).map(
        ([key, payload]) => {
          const totalMembers: number = Object.values(familyGroupsByServiceTimeQuery?.data).reduce(
            (total: number, item: { serviceTimesCount: number }) => total + item.serviceTimesCount,
            0
          );

          return {
            serviceTime:
              key === FamilyGroupServiceTime.Time0900
                ? FamilyGroupServiceTimeNames[key as FamilyGroupServiceTime]
                : FamilyGroupServiceTime.Time1000
                  ? FamilyGroupServiceTimeNames[key as FamilyGroupServiceTime]
                  : FamilyGroupServiceTime.Time1600
                    ? FamilyGroupServiceTimeNames[key as FamilyGroupServiceTime]
                    : FamilyGroupServiceTime.Time1630
                      ? FamilyGroupServiceTimeNames[key as FamilyGroupServiceTime]
                      : FamilyGroupServiceTime.Time1700
                        ? FamilyGroupServiceTimeNames[key as FamilyGroupServiceTime]
                        : FamilyGroupServiceTime.Time1730
                          ? FamilyGroupServiceTimeNames[key as FamilyGroupServiceTime]
                          : FamilyGroupServiceTime.Time1800
                            ? FamilyGroupServiceTimeNames[key as FamilyGroupServiceTime]
                            : FamilyGroupServiceTime.Time1830
                              ? FamilyGroupServiceTimeNames[key as FamilyGroupServiceTime]
                              : FamilyGroupServiceTime.Time1900
                                ? FamilyGroupServiceTimeNames[key as FamilyGroupServiceTime]
                                : FamilyGroupServiceTime.Time1930
                                  ? FamilyGroupServiceTimeNames[key as FamilyGroupServiceTime]
                                  : FamilyGroupServiceTime.Time2000
                                    ? FamilyGroupServiceTimeNames[key as FamilyGroupServiceTime]
                                    : '',
            serviceTimesCount: payload?.serviceTimesCount,
            copastor: payload?.copastor,
            supervisor: payload?.supervisor,
            church: {
              isAnexe: payload?.church?.isAnexe,
              abbreviatedChurchName: payload?.church?.abbreviatedChurchName,
            },
            totalPercentage: ((payload.serviceTimesCount / totalMembers) * 100).toFixed(1),
          };
        }
      );

      setMappedData(transformedData);
    }

    if (!familyGroupsByServiceTimeQuery?.data) {
      setMappedData([]);
    }
  }, [familyGroupsByServiceTimeQuery?.data, zone]);

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof metricsFormSchema>): void => {
    setSearchParams(formData);
  };
  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[24rem] md:h-[27rem] lg:h-[27rem] 2xl:h-[27rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardHeader className='z-10 flex flex-col sm:flex-row items-center justify-between px-4 pt-1.5 pb-2'>
        <div className='flex flex-col'>
          <CardTitle className='flex justify-center items-center gap-2 font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
            <span>Grupos Familiares</span>
            {!!zonesQuery?.data?.length && (
              <Badge
                variant='active'
                className='mt-1 text-[11px] text-white md:text-[11px] py-0.3 md:py-0.35 tracking-wide'
              >
                Activos
              </Badge>
            )}
          </CardTitle>
          <CardDescription className='-ml-2 sm:ml-1 text-center sm:text-left text-[14px] md:text-[14.5px] italic'>
            Por Horario de culto.
          </CardDescription>
        </div>
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
                        <FormControl className='text-[14px] md:text-[14px]'>
                          <Button
                            disabled={all}
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between w-full text-center overflow-hidden px-2 text-[14px] md:text-[14px]',
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
                                className='h-9 text-[14px] md:text-[14px]'
                              />
                              <CommandEmpty>Zona no encontrada.</CommandEmpty>
                              <CommandGroup className='max-h-[200px] h-auto'>
                                {zonesQuery?.data?.map((zone) => (
                                  <CommandItem
                                    className='text-[14px] md:text-[14px]'
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
                            <p className='text-[12.5px] md:text-[14px] font-medium text-red-500 text-center'>
                              ❌No hay zonas disponibles.
                            </p>
                          )
                        )}
                      </PopoverContent>
                    </Popover>
                    <FormMessage className='text-[13px]' />
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
                    <FormLabel className='text-[13px] md:text-[14px]'>Todos</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardHeader>

      {!mappedData?.length && !searchParams ? (
        <CardContent className='h-full pl-3 pr-4 py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full pl-3 pr-4 py-0'>
          {familyGroupsByServiceTimeQuery?.isFetching && !mappedData?.length && (
            <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
              <FcDataBackup className='text-[6rem] pb-2' />
              <p>Consultando datos....</p>
            </div>
          )}
          {!!mappedData?.length && searchParams && (
            <ChartContainer
              config={chartConfig}
              className={cn(
                'w-full h-[270px] sm:h-[310px] md:h-[350px] lg:h-[350px] xl:h-[350px] 2xl:h-[345px]'
              )}
            >
              <BarChart
                accessibilityLayer
                data={mappedData}
                margin={{ top: 5, right: 5, left: -30, bottom: 10 }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='serviceTime'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  tickFormatter={(value) => value.slice(0, 10)}
                  className='text-[12.5px] md:text-[14px]'
                />
                <YAxis type='number' className='text-[12.5px] md:text-[14px]' />
                <ChartTooltip
                  cursor={false}
                  content={FamilyGroupsByServiceTimeTooltipContent as any}
                />
                <ChartLegend
                  content={<ChartLegendContent className='ml-8 text-[13px] md:text-[14px]' />}
                />
                <Bar dataKey='serviceTimesCount' fill='var(--color-serviceTimesCount)' radius={4} />
              </BarChart>
            </ChartContainer>
          )}
          {!familyGroupsByServiceTimeQuery?.isFetching && !mappedData?.length && (
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
