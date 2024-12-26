/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { CheckIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { FcDeleteDatabase } from 'react-icons/fc';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon } from '@radix-ui/react-icons';

import { getDisciples } from '@/modules/disciple/services/disciple.service';
import { getSimpleChurches } from '@/modules/church/services/church.service';

import { MemberInfoItem } from '@/modules/dashboard/components/cards/info/MemberInfoItem';
import { dashBoardSearchFormSchema } from '@/modules/dashboard/validations/dashboard-search-form-schema';

import { cn } from '@/shared/lib/utils';
import { RecordOrder } from '@/shared/enums/record-order.enum';

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

export function MembersInfoCard(): JSX.Element {
  //* States
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

  //* Queries
  const query = useQuery({
    queryKey: ['last-disciples', searchParams],
    queryFn: () =>
      getDisciples({
        limit: '10',
        all: false,
        offset: '0',
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
    <Card className='h-auto w-auto row-start-3 row-end-4 col-start-1 col-end-2 md:row-start-3 md:row-end-4 md:col-start-1 lg:row-start-3 lg:row-end-4 md:col-end-3 xl:col-start-1 xl:col-end-4 xl:row-start-2 xl:row-end-3 border-slate-400'>
      <div className='w-full flex flex-col md:grid md:grid-cols-4 md:justify-center md:items-center'>
        <CardHeader className='flex flex-col items-center justify-center px-4 py-2.5 col-span-3'>
          <CardTitle className='font-bold md:pl-[7rem] lg:pl-[16rem] xl:pl-[4rem] 2xl:pl-[8.5rem] 3-xl:pl-[16rem] text-[22px] sm:text-[25px] md:text-[28px] 2xl:text-[30px] inline-block'>
            Discípulos Nuevos
          </CardTitle>
          <CardDescription className='text-[14px] md:text-[14.5px] md:pl-[7rem] lg:pl-[16rem] xl:pl-[4rem] 2xl:pl-[8.5rem] 3-xl:pl-[16rem] text-center'>
            Últimos discípulos registrados.
          </CardDescription>
        </CardHeader>

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
                                'justify-between w-full text-center px-2 text-[13.5px] md:text-[14px]',
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
                              className='h-9 text-[14px] md:text-[14px]'
                            />
                            <CommandEmpty>Iglesia no encontrada.</CommandEmpty>
                            <CommandGroup className='max-h-[100px] h-auto'>
                              {churchesQuery?.data?.map((church) => (
                                <CommandItem
                                  className='text-[14px] md:text-[14px]'
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
                      <FormMessage className='text-[13px]' />
                    </FormItem>
                  );
                }}
              />
            </form>
          </Form>
        </div>
      </div>

      {query.isLoading ? (
        <CardContent className='h-[42.5rem]'>
          {
            <>
              <div className={'flex flex-col items-center justify-center space-y-4 h-full'}>
                <div className='flex space-x-2'>
                  <div className='w-4 h-4 bg-blue-500 rounded-full animate-bounce'></div>
                  <div className='w-4 h-4 bg-blue-500 rounded-full animate-bounce animation-delay-200'></div>
                  <div className='w-4 h-4 bg-blue-500 rounded-full animate-bounce animation-delay-400'></div>
                </div>
                <span className='text-blue-500 text-lg font-medium'>Cargando...</span>
              </div>
            </>
          }
        </CardContent>
      ) : !query?.isLoading && query?.data ? (
        query?.data?.map((data) => <MemberInfoItem key={data.id} data={data} />)
      ) : (
        <CardContent className='h-[42.5rem]'>
          <div className='text-red-500 text-[14px] md:text-lg flex flex-col justify-center items-center h-full -mt-6'>
            <FcDeleteDatabase className='text-[6rem] pb-2' />
            <p>No hay datos disponibles para mostrar.</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
