/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { FcDeleteDatabase } from 'react-icons/fc';
import { ArrowUpDown, CheckIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon } from '@radix-ui/react-icons';

import { getSimpleChurches } from '@/modules/church/services/church.service';

import { DashboardSearchType } from '@/modules/dashboard/enums/dashboard-search-type.enum';
import { getProportionFamilyGroups } from '@/modules/dashboard/services/dashboard.service';
import { FamilyGroupInfoItem } from '@/modules/dashboard/components/cards/info/FamilyGroupInfoItem';
import { dashBoardSearchFormSchema } from '@/modules/dashboard/validations/dashboard-search-form-schema';

import { cn } from '@/shared/lib/utils';
import { RecordOrder } from '@/shared/enums/record-order.enum';
import { LoadingSpinner } from '@/shared/components/spinner/LoadingSpinner';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/shared/components/ui/card';
import {
  Command,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from '@/shared/components/ui/command';
import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';

interface SearchParamsOptions {
  churchId?: string;
}

export function HousesInfoCard(): JSX.Element {
  //* States
  const [changedValue, setChangedValue] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useState<SearchParamsOptions | undefined>(undefined);
  const [isInputSearchChurchOpen, setIsInputSearchChurchOpen] = useState<boolean>(false);

  //* Form
  const form = useForm<z.infer<typeof dashBoardSearchFormSchema>>({
    resolver: zodResolver(dashBoardSearchFormSchema),
    mode: 'onChange',
    defaultValues: {
      churchId: '',
    },
  });

  //* Watchers
  const churchId = form.getValues('churchId');

  const toggleChangeValue = (): void => {
    setChangedValue(!changedValue);
  };

  //* Queries
  const query = useQuery({
    queryKey: [
      'proportion-family-groups',
      changedValue ? 'most-populated' : 'less-populated',
      searchParams,
    ],
    queryFn: () =>
      getProportionFamilyGroups({
        searchType: changedValue
          ? DashboardSearchType.MostPopulatedFamilyGroups
          : DashboardSearchType.LessPopulatedFamilyGroups,
        populationLevel: changedValue ? 'most-populated' : 'less-populated',
        churchId: searchParams?.churchId ?? churchId,
        order: RecordOrder.Ascending,
      }),
    retry: 1,
    enabled: !!searchParams && !!searchParams.churchId,
  });

  const churchesQuery = useQuery({
    queryKey: ['churches-for-last-members'],
    queryFn: () => getSimpleChurches({ isSimpleQuery: true }),
  });

  //* Effects
  // Default value
  useEffect(() => {
    if (churchesQuery.data) {
      const churchId = churchesQuery?.data?.map((church) => church?.id)[0];
      setSearchParams({ churchId });
      form.setValue('churchId', churchId);
    }
  }, [churchesQuery?.data]);

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof dashBoardSearchFormSchema>): void => {
    setSearchParams(formData);
  };

  return (
    <Card className='w-auto h-auto row-start-4 row-end-5 col-start-1 col-end-2 md:row-end-4 md:col-start-1 md:col-end-3 lg:row-start-4 lg:row-end-5  xl:col-start-4 xl:col-end-7 xl:row-start-2 xl:row-end-3  border-slate-400'>
      <div className='w-full flex flex-col md:grid md:grid-cols-4 md:justify-center md:items-center'>
        <CardHeader className='flex flex-col items-center justify-center px-4 py-2.5 col-span-2'>
          <CardTitle className='font-bold ml-[0rem] md:-ml-[1rem] text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px] inline-block'>
            Grupos Familiares
          </CardTitle>

          <CardDescription className='text-[13.5px] ml-[0rem] md:ml-[1rem] md:text-[14.5px]'>
            {`Grupos familiares con  ${changedValue ? 'más' : 'menos'} discípulos.`}
          </CardDescription>
        </CardHeader>
        <div className='flex gap-4 justify-center col-span-2 md:justify-end'>
          <Button onClick={toggleChangeValue} className='w-[3rem] m-0'>
            <ArrowUpDown className='h-4 w-6 sm:h-6 sm:w-6' />
          </Button>

          {/* Form */}

          <div className='col-span-1 flex justify-center -pl-[2rem] pb-2 xl:pr-5'>
            <Form {...form}>
              <form>
                <FormField
                  control={form.control}
                  name='churchId'
                  render={({ field }) => {
                    return (
                      <FormItem className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2'>
                        <Popover
                          open={isInputSearchChurchOpen}
                          onOpenChange={setIsInputSearchChurchOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'justify-between w-full text-center px-2 text-[12px] md:text-[14px]',
                                  !field.value &&
                                    'text-slate-500 dark:text-slate-200 font-normal px-2'
                                )}
                              >
                                {field.value
                                  ? churchesQuery?.data
                                      ?.find((church) => church.id === field.value)
                                      ?.churchCode.split('-')
                                      .slice(0, 2)
                                      .join('-')
                                  : searchParams?.churchId
                                    ? churchesQuery?.data
                                        ?.find((church) => church.id === searchParams.churchId)
                                        ?.churchCode.split('-')
                                        .slice(0, 2)
                                        .join('-')
                                    : 'ICUP-CENTRAL'}
                                <CaretSortIcon className='h-4 w-4 shrink-0' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align='center' className='w-auto px-4 py-2'>
                            <Command>
                              <CommandInput
                                placeholder='Busque una iglesia'
                                className='h-9 text-[12px] md:text-[14px]'
                              />
                              <CommandEmpty>Iglesia no encontrada.</CommandEmpty>
                              <CommandGroup className='max-h-[100px] h-auto'>
                                {churchesQuery?.data?.map((church) => (
                                  <CommandItem
                                    className='text-[12px] md:text-[14px]'
                                    value={church.churchCode}
                                    key={church.id}
                                    onSelect={() => {
                                      form.setValue('churchId', church.id);
                                      church && form.handleSubmit(handleSubmit)();
                                      setIsInputSearchChurchOpen(false);
                                    }}
                                  >
                                    {church?.abbreviatedChurchName}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        church.id === field.value ? 'opacity-100' : 'opacity-0'
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
      </div>

      {query.isLoading ? (
        <CardContent className='h-[42.5rem]'>
          <LoadingSpinner />
        </CardContent>
      ) : !query?.isLoading && query?.data ? (
        query.data?.map((data) => <FamilyGroupInfoItem key={data.id} data={data} />)
      ) : (
        <div className='text-red-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
          <FcDeleteDatabase className='text-[6rem] pb-2' />
          <p>No hay datos disponibles para mostrar.</p>
        </div>
      )}
    </Card>
  );
}
