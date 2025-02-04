/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@react-hook/media-query';
import { FcDataBackup, FcDeleteDatabase } from 'react-icons/fc';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Bar, XAxis, YAxis, CartesianGrid, BarChart } from 'recharts';

import { metricsFormSchema } from '@/modules/metrics/validations/metrics-form-schema';

import { MetricSearchType } from '@/modules/metrics/enums/metrics-search-type.enum';
import { getSimpleCopastors } from '@/modules/copastor/services/copastor.service';
import { getFamilyGroupsByCopastorAndZone } from '@/modules/metrics/services/family-group-metrics.service';
import { FamilyGroupsByCopastorAndZoneTooltipContent } from '@/modules/metrics/components/family-group/tooltips/components/FamilyGroupsByCopastorAndZoneTooltipContent';

import { cn } from '@/shared/lib/utils';

import { RecordOrder } from '@/shared/enums/record-order.enum';
import { getFullNames, getInitialFullNames } from '@/shared/helpers/get-full-names.helper';

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
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

const chartConfig = {
  familyGroupsCount: {
    label: 'Zona',
    color: '#2662D9',
  },
} satisfies ChartConfig;

interface ResultDataOptions {
  zoneName: string;
  supervisor: string;
  familyGroupsCount: number;
  church: {
    isAnexe: boolean;
    abbreviatedChurchName: string;
  };
  totalPercentage: string;
}

interface SearchParamsOptions {
  copastor?: string;
  all?: boolean;
}

interface Props {
  churchId: string | undefined;
}

export const FamilyGroupAnalysisCardByCopastorAndZone = ({ churchId }: Props): JSX.Element => {
  //* States
  const [mappedData, setMappedData] = useState<ResultDataOptions[]>();
  const [isInputSearchCopastorOpen, setIsInputSearchCopastorOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);

  //* Media Queries
  const intermediateSM = useMediaQuery('(min-width: 640px)');
  const intermediateLG = useMediaQuery('(min-width: 1280px)');
  const intermediateXL = useMediaQuery('(min-width: 1375px)');
  const intermediate2XL = useMediaQuery('(min-width: 1450px)');

  //* Form
  const form = useForm<z.infer<typeof metricsFormSchema>>({
    resolver: zodResolver(metricsFormSchema),
    mode: 'onChange',
    defaultValues: {
      copastor: searchParams ? searchParams.copastor : '',
      all: false,
    },
  });

  //* Watchers
  const copastor = form.watch('copastor');
  const all = form.watch('all');

  //* Queries
  const copastorsQuery = useQuery({
    queryKey: ['copastors-for-zone', churchId],
    queryFn: () => getSimpleCopastors({ churchId: churchId ?? '', isSimpleQuery: true }),
    retry: false,
  });

  const familyGroupsByZoneQuery = useQuery({
    queryKey: ['family-groups-by-zone', { ...searchParams, church: churchId }],
    queryFn: () => {
      return getFamilyGroupsByCopastorAndZone({
        searchType: MetricSearchType.FamilyGroupsByCopastorAndZone,
        copastor: searchParams?.copastor ?? copastor,
        allZones: searchParams?.all ?? all,
        order: RecordOrder.Ascending,
        church: churchId ?? '',
      });
    },
    retry: false,
    enabled:
      !!searchParams?.copastor &&
      !!churchId &&
      !!copastorsQuery?.data &&
      !!copastorsQuery.data.length,
  });

  //* Effects
  // Default value
  useEffect(() => {
    if (copastorsQuery.data) {
      const copastor = copastorsQuery?.data?.map((copastor) => copastor?.id)[0];
      setSearchParams({ copastor, all: false });
      form.setValue('copastor', copastor);
      form.setValue('all', false);
    }
  }, [copastorsQuery?.data]);

  // Set data
  useEffect(() => {
    if (familyGroupsByZoneQuery?.data) {
      const transformedData = Object.entries(familyGroupsByZoneQuery?.data).map(
        ([zoneName, payload]) => {
          const totalFamilyGroups: number = Object.values(familyGroupsByZoneQuery?.data).reduce(
            (total: number, item: { familyGroupsCount: number }) => total + item.familyGroupsCount,
            0
          );

          return {
            zoneName,
            familyGroupsCount: payload?.familyGroupsCount,
            copastor: payload?.copastor,
            supervisor: payload?.supervisor,
            church: {
              isAnexe: payload?.church?.isAnexe,
              abbreviatedChurchName: payload?.church?.abbreviatedChurchName,
            },
            totalPercentage: ((payload.familyGroupsCount / totalFamilyGroups) * 100).toFixed(1),
          };
        }
      );
      setMappedData(transformedData);
    }

    if (!familyGroupsByZoneQuery?.data) {
      setMappedData([]);
    }
  }, [familyGroupsByZoneQuery?.data, copastor]);

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof metricsFormSchema>): void => {
    setSearchParams(formData);
  };

  return (
    <Card className='bg-slate-50/40 dark:bg-slate-900/40 flex flex-col col-start-1 col-end-2 h-[24rem] md:h-[27rem] lg:h-[27rem] 2xl:h-[27rem] m-0 border-slate-200 dark:border-slate-800'>
      <CardHeader className='z-10 flex flex-col sm:flex-row items-center justify-between px-4 pt-1.5 pb-2'>
        <div className='flex flex-col'>
          <CardTitle className='flex justify-center items-center gap-2 font-bold text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px]'>
            {intermediate2XL ? (
              <span>Grupos Familiares</span>
            ) : intermediateXL ? (
              <span> Grupos Fam.</span>
            ) : intermediateLG ? (
              <span>Grup. Fam.</span>
            ) : intermediateSM ? (
              <span>Grupos Familiares</span>
            ) : (
              <span>Grupos Familiares</span>
            )}
            {!!copastorsQuery?.data?.length && (
              <Badge
                variant='active'
                className='mt-1 text-[11px] text-white md:text-[11px] py-0.3 md:py-0.35 tracking-wide'
              >
                Activos
              </Badge>
            )}
          </CardTitle>
          <CardDescription className='-ml-6 sm:ml-1 text-center sm:text-left text-[14px] md:text-[14.5px] italic'>
            Por Co-Pastor y Zona.
          </CardDescription>
        </div>
        <Form {...form}>
          <form className='flex'>
            <FormField
              control={form.control}
              name='copastor'
              render={({ field }) => {
                return (
                  <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                    <Popover
                      open={isInputSearchCopastorOpen}
                      onOpenChange={setIsInputSearchCopastorOpen}
                    >
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
                              ? `${getInitialFullNames({ firstNames: copastorsQuery?.data?.find((copastor) => copastor.id === searchParams?.copastor)?.member?.firstNames ?? '', lastNames: '' })} ${copastorsQuery?.data?.find((copastor) => copastor.id === searchParams?.copastor)?.member?.lastNames ?? ''}`
                              : searchParams?.copastor
                                ? `${getInitialFullNames({ firstNames: copastorsQuery?.data?.find((copastor) => copastor.id === searchParams?.copastor)?.member?.firstNames ?? '', lastNames: '' })} ${copastorsQuery?.data?.find((copastor) => copastor.id === searchParams?.copastor)?.member?.lastNames ?? ''}`
                                : 'Elige un co-pastor'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          {copastorsQuery?.data?.length && copastorsQuery?.data?.length > 0 ? (
                            <>
                              <CommandInput
                                placeholder='Busque un co-pastor'
                                className='h-9 text-[14px] md:text-[14px]'
                              />
                              <CommandEmpty>Co-pastor no encontrado.</CommandEmpty>
                              <CommandGroup className='max-h-[200px] h-auto'>
                                {copastorsQuery?.data?.map((copastor) => (
                                  <CommandItem
                                    className='text-[14px] md:text-[14px]'
                                    value={getFullNames({
                                      firstNames: copastor?.member?.firstNames ?? '',
                                      lastNames: copastor?.member?.lastNames ?? '',
                                    })}
                                    key={copastor.id}
                                    onSelect={() => {
                                      form.setValue('copastor', copastor.id);
                                      form.handleSubmit(handleSubmit)();
                                      setIsInputSearchCopastorOpen(false);
                                    }}
                                  >
                                    {`${getInitialFullNames({ firstNames: copastor?.member?.firstNames ?? '', lastNames: '' })} ${copastor?.member?.lastNames ?? ''}`}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        copastor.id === field.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </>
                          ) : (
                            copastorsQuery?.data?.length === 0 && (
                              <p className='text-[12.5px] md:text-[14px] font-medium text-red-500 text-center'>
                                ❌No hay co-pastores disponibles.
                              </p>
                            )
                          )}
                        </Command>
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
                <FormItem className='flex flex-row items-end space-x-2 space-y-0 rounded-md border p-3 h-[2.5rem]'>
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
                    <FormLabel className='text-[13px] md:text-[14px] cursor-pointer'>
                      Todos
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardHeader>

      {!mappedData?.length && !searchParams ? (
        <CardContent className='h-full px-2 sm:px-4 py-0'>
          <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDataBackup className='text-[6rem] pb-2' />
            <p className='font-medium text-[15px] md:text-[16px]'>Consultando datos....</p>
          </div>
        </CardContent>
      ) : (
        <CardContent className='h-full px-2 sm:px-4 py-0'>
          {familyGroupsByZoneQuery?.isFetching && !mappedData?.length && (
            <div className='text-blue-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
              <FcDataBackup className='text-[6rem] pb-2' />
              <p className='font-medium text-[15px] md:text-[16px]'>Consultando datos....</p>
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
                margin={{ top: 5, right: 5, left: -35, bottom: 10 }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey='zoneName'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  tickFormatter={(value) => value.slice(0, 10)}
                  className='text-[12.5px] md:text-[14px]'
                />

                <YAxis className='text-[12.5px] md:text-[14px]' />
                <ChartTooltip
                  cursor={false}
                  content={FamilyGroupsByCopastorAndZoneTooltipContent as any}
                />

                <ChartLegend
                  content={<ChartLegendContent className='ml-8 text-[13px] md:text-[14px]' />}
                />

                <Bar dataKey='familyGroupsCount' fill='var(--color-familyGroupsCount)' radius={4} />
              </BarChart>
            </ChartContainer>
          )}
          {!familyGroupsByZoneQuery?.isFetching && !mappedData?.length && (
            <div className='text-red-500 flex flex-col justify-center items-center h-full -mt-6'>
              <FcDeleteDatabase className='text-[6rem] pb-2' />
              <p className='font-medium text-[15px] md:text-[16px]'>
                No hay datos disponibles para mostrar.
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
