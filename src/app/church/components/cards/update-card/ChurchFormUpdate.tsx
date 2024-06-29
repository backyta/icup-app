/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useEffect } from 'react';

import { type z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { FormChurchSkeleton } from '@/app/church/components';
import { churchFormSchema } from '@/app/church/validations';
import { getMainChurch, updateChurch } from '@/app/church/services';
import { WorshipTimes, WorshipTimesNames } from '@/app/church/enums';
import { type ErrorResponse, type ChurchResponse } from '@/app/church/interfaces';

import { useChurchUpdateSubmitButtonLogic } from '@/hooks';

import {
  validateDistrictsAllowedByModule,
  validateUrbanSectorsAllowedByDistrict,
} from '@/shared/helpers';
import {
  CountryNames,
  DepartmentNames,
  DistrictNames,
  ProvinceNames,
  UrbanSectorNames,
} from '@/shared/enums';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Calendar } from '@/shared/components/ui/calendar';
import { Textarea } from '@/shared/components/ui/textarea';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

interface ChurchFormUpdateProps {
  id: string;
  onSubmit: () => void;
  onScroll: () => void;
  data: ChurchResponse | undefined;
}

export const ChurchFormUpdate = ({
  id,
  data,
  onSubmit,
  onScroll,
}: ChurchFormUpdateProps): JSX.Element => {
  //* States
  const [isInputMainChurchOpen, setIsInputMainChurchOpen] = useState<boolean>(false);
  const [isInputFoundingDateOpen, setIsInputFoundingDateOpen] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);

  const [isLoadingData, setIsLoadingData] = useState(true);

  //* Hooks (external libraries)
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //* Form
  const form = useForm<z.infer<typeof churchFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(churchFormSchema),
    defaultValues: {
      churchName: '',
      email: '',
      foundingDate: undefined,
      worshipTimes: [],
      isAnexe: false,
      phoneNumber: '',
      country: '',
      department: '',
      province: '',
      district: '',
      urbanSector: '',
      address: '',
      referenceAddress: '',
      status: '',
      theirMainChurch: '',
    },
  });

  //* Watchers
  const district = form.watch('district');
  const isAnexe = form.watch('isAnexe');
  const theirMainChurch = form.watch('theirMainChurch');

  useEffect(() => {
    form.setValue('churchName', data?.churchName!);
    form.setValue('foundingDate', new Date(data?.foundingDate.replace(/-/g, '/') as any));
    form.setValue('worshipTimes', data?.worshipTimes as WorshipTimes[]);
    form.setValue('email', data?.email!);
    form.setValue('phoneNumber', data?.phoneNumber!);
    form.setValue('country', data?.country!);
    form.setValue('department', data?.department!);
    form.setValue('province', data?.province!);
    form.setValue('district', data?.district!);
    form.setValue('urbanSector', data?.urbanSector!);
    form.setValue('address', data?.address!);
    form.setValue('referenceAddress', data?.referenceAddress!);
    form.setValue('isAnexe', data?.isAnexe);
    form.setValue('theirMainChurch', data?.theirMainChurch?.id);
    form.setValue('status', data?.status);

    setTimeout(() => {
      setIsLoadingData(false);
    }, 1000);
  }, []);

  //* Custom hooks
  useChurchUpdateSubmitButtonLogic({
    formChurchUpdate: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
  });

  //* Helpers
  const disabledUrbanSectors = validateUrbanSectorsAllowedByDistrict(district);
  const disabledDistricts = validateDistrictsAllowedByModule(pathname);

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: updateChurch,
    onError: (error: ErrorResponse) => {
      if (error.message !== 'Unauthorized') {
        toast.error(error.message, {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          setIsInputDisabled(false);
          setIsSubmitButtonDisabled(false);
        }, 1500);
      }

      if (error.message === 'Unauthorized') {
        toast.error('Operación rechazada, el token expiro ingresa nuevamente.', {
          position: 'top-center',
          className: 'justify-center',
        });

        setTimeout(() => {
          navigate('/');
        }, 3500);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['churches-by-term'] });

      toast.success('Cambios guardados correctamente', {
        position: 'top-center',
        className: 'justify-center',
      });

      setTimeout(() => {
        onScroll();
      }, 150);

      setTimeout(() => {
        onSubmit();
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  //* Querys
  const query = useQuery({
    queryKey: ['mainChurch', id],
    queryFn: getMainChurch,
  });

  //* Handler form
  const handleSubmit = (formData: z.infer<typeof churchFormSchema>): void => {
    mutation.mutate({ id, formData });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[990px] xl:w-[1100px]'
    >
      <h2 className='text-center text-orange-500 pb-2 font-bold text-[20px] md:text-[24px]'>
        Actualizar información de la Iglesia
      </h2>

      <TabsContent value='general-info'>
        <Card className='w-full'>
          {isLoadingData && <FormChurchSkeleton />}

          {!isLoadingData && (
            <CardContent className='py-3 px-4'>
              <div className='dark:text-slate-300 text-slate-500 font-bold text-[16px] mb-4 pl-4'>
                Iglesia: {data?.churchName} - {data?.district}
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='w-full flex flex-col md:grid md:grid-cols-2 gap-x-10 gap-y-5 px-2 sm:px-12'
                >
                  <div className='col-start-1 col-end-2'>
                    <FormField
                      control={form.control}
                      name='churchName'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Nombre
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar una nombre a la iglesia.
                            </FormDescription>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                placeholder='Eje: Iglesia Roca Fuerte...'
                                type='text'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='foundingDate'
                      render={({ field }) => (
                        <FormItem className='flex flex-col mt-4'>
                          <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                            Fecha de fundación
                          </FormLabel>
                          <Popover
                            open={isInputFoundingDateOpen}
                            onOpenChange={setIsInputFoundingDateOpen}
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  disabled={isInputDisabled}
                                  variant={'outline'}
                                  className={cn(
                                    'w-full pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'LLL dd, y', { locale: es })
                                  ) : (
                                    <span className='text-sm md:text-[14px] lg:text-sm'>
                                      Selecciona la fecha de fundación
                                    </span>
                                  )}
                                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0' align='start'>
                              <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setIsInputFoundingDateOpen(false);
                                }}
                                disabled={(date) =>
                                  date > new Date() || date < new Date('1900-01-01')
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription className='pl-2 text-blue-600 text-[11.5px] xl:text-[12.5px] font-bold italic'>
                            * Fecha en la que se fundo o se creo la iglesia.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='worshipTimes'
                      render={() => (
                        <FormItem>
                          <div className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Horarios
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Seleccione los horarios que tendrá la iglesia.
                            </FormDescription>
                          </div>
                          <div className='flex flex-wrap space-x-5 space-y-1'>
                            {Object.values(WorshipTimes).map((worshipTime) => (
                              <FormField
                                key={worshipTime}
                                control={form.control}
                                name='worshipTimes'
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={worshipTime}
                                      className='flex items-center space-x-2 space-y-0'
                                    >
                                      <FormControl className='grid'>
                                        <Checkbox
                                          disabled={isInputDisabled}
                                          checked={field.value?.includes(worshipTime)}
                                          onCheckedChange={(checked) => {
                                            let updatedWorshipTimes: WorshipTimes[] = [];
                                            checked
                                              ? (updatedWorshipTimes = field.value
                                                  ? [...field.value, worshipTime]
                                                  : [worshipTime])
                                              : (updatedWorshipTimes =
                                                  field.value?.filter(
                                                    (value) => value !== worshipTime
                                                  ) ?? []);

                                            field.onChange(updatedWorshipTimes);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className='text-[14px] font-medium'>
                                        {WorshipTimesNames[worshipTime]}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              E-mail
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asigne un e-mail que tendrá la iglesia.
                            </FormDescription>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                placeholder='Eje: iglesia.central@example.com'
                                type='email'
                                autoComplete='username'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='phoneNumber'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Numero de teléfono
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asigne un numero telefónico que tendrá la iglesia.
                            </FormDescription>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                placeholder='Eje: 999 999 999'
                                type='text'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='country'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              País
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar el país al que pertenece la iglesia.
                            </FormDescription>
                            <Select
                              disabled={isInputDisabled}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  {field.value ? (
                                    <SelectValue placeholder='Selecciona el país' />
                                  ) : (
                                    'Selecciona el país'
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(CountryNames).map(([key, value]) => (
                                  <SelectItem className={`text-[14px]`} key={key} value={key}>
                                    {value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='department'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Departamento
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar el departamento al que pertenece la casa familiar.
                            </FormDescription>
                            <Select
                              disabled={isInputDisabled}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  {field.value ? (
                                    <SelectValue placeholder='Selecciona el departamento' />
                                  ) : (
                                    'Selecciona el departamento'
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(DepartmentNames).map(([key, value]) => (
                                  <SelectItem className={`text-[14px]`} key={key} value={key}>
                                    {value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='province'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Provincia
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar la provincia a la que pertenece la iglesia.
                            </FormDescription>
                            <Select
                              disabled={isInputDisabled}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  {field.value ? (
                                    <SelectValue placeholder='Selecciona la provincia' />
                                  ) : (
                                    'Selecciona la provincia'
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(ProvinceNames).map(([key, value]) => (
                                  <SelectItem className={`text-[14px]`} key={key} value={key}>
                                    {value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <div className='col-start-2 col-end-3'>
                    <FormField
                      control={form.control}
                      name='district'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Distrito
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar el distrito al que pertenece la iglesia.
                            </FormDescription>
                            <Select
                              disabled={isInputDisabled}
                              onValueChange={field.onChange}
                              onOpenChange={() => {
                                form.resetField('urbanSector', {
                                  defaultValue: '',
                                });
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  {field.value ? (
                                    <SelectValue placeholder='Selecciona el distrito' />
                                  ) : (
                                    'Selecciona el distrito'
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(DistrictNames).map(([key, value]) => (
                                  <SelectItem
                                    className={`text-[14px] ${disabledDistricts?.disabledDistricts?.includes(value) ? 'hidden' : ''}`}
                                    key={key}
                                    value={key}
                                  >
                                    {value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='urbanSector'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3 md:mt-5'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Sector Urbano
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar el sector urbano al que pertenece la iglesia.
                            </FormDescription>
                            <Select
                              disabled={isInputDisabled}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  {field.value ? (
                                    <SelectValue placeholder='Selecciona el sector urbano' />
                                  ) : (
                                    'Selecciona el sector urbano'
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(UrbanSectorNames).map(([key, value]) => (
                                  <SelectItem
                                    className={`text-[14px] ${disabledUrbanSectors?.disabledUrbanSectors?.includes(value) ?? !district ? 'hidden' : ''}`}
                                    key={key}
                                    value={key}
                                  >
                                    {value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='address'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3 md:mt-5'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Dirección
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar la dirección de la iglesia.
                            </FormDescription>
                            <FormControl>
                              <Input
                                disabled={isInputDisabled}
                                placeholder='Ej: Av. Central 123 - Mz.A Lt.3'
                                type='text'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='referenceAddress'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3 md:mt-5'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Referencia de dirección
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                disabled={isInputDisabled}
                                placeholder='Comentarios sobre la dirección referencia de la iglesia...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='isAnexe'
                      render={({ field }) => (
                        <FormItem className='flex flex-row gap-2 items-end mt-3 px-1 py-3 h-[2.5rem]'>
                          <FormControl>
                            <Checkbox
                              disabled={isInputDisabled}
                              checked={field?.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                form.resetField('theirMainChurch', {
                                  keepError: true,
                                });
                                if (!theirMainChurch) {
                                  setIsSubmitButtonDisabled(true);
                                  setIsMessageErrorDisabled(true);
                                }
                              }}
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel className='text-[13px] md:text-[14px]'>
                              ¿Esta iglesia sera un anexo?
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {isAnexe && (
                      <FormField
                        control={form.control}
                        name='theirMainChurch'
                        render={({ field }) => {
                          return (
                            <FormItem className='mt-3'>
                              <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                                Iglesia Principal
                              </FormLabel>
                              <FormDescription className='text-[14px]'>
                                Seleccione una iglesia principal para este anexo.
                              </FormDescription>
                              <Popover
                                open={isInputMainChurchOpen}
                                onOpenChange={setIsInputMainChurchOpen}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      value={field.value}
                                      disabled={isInputDisabled}
                                      variant='outline'
                                      role='combobox'
                                      className={cn('w-full justify-between ')}
                                    >
                                      {field.value
                                        ? query?.data?.find((church) => church.id === field.value)
                                            ?.churchName
                                        : 'Busque y seleccione una iglesia'}
                                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent align='center' className='w-auto px-4 py-2'>
                                  <Command>
                                    <CommandInput
                                      placeholder='Busque una iglesia...'
                                      className='h-9 text-[14px]'
                                    />
                                    <CommandEmpty>Iglesia no encontrada.</CommandEmpty>
                                    <CommandGroup className='max-h-[200px] h-auto'>
                                      {query?.data?.map((church) => (
                                        <CommandItem
                                          className='text-[14px]'
                                          value={church.id}
                                          key={church.id}
                                          onSelect={() => {
                                            form.setValue('theirMainChurch', church.id);
                                            setIsInputMainChurchOpen(false);
                                          }}
                                        >
                                          {church.churchName}
                                          <CheckIcon
                                            className={cn(
                                              'ml-auto h-4 w-4',
                                              church.id === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
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
                    )}

                    <FormField
                      control={form.control}
                      name='status'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-5'>
                            <FormLabel className='text-[14px]'>Estado</FormLabel>
                            <Select
                              disabled={isInputDisabled}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl className='text-[14px]'>
                                <SelectTrigger>
                                  {field.value === 'active' ? (
                                    <SelectValue placeholder='Activo' />
                                  ) : (
                                    <SelectValue placeholder='Inactivo' />
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem className='text-[14px]' value='active'>
                                  Activo
                                </SelectItem>
                                <SelectItem className='text-[14px]' value='inactive'>
                                  Inactivo
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            {form.getValues('status') === 'active' && (
                              <FormDescription className='pl-2 text-[12px] xl:text-[13px] font-bold'>
                                *El registro esta <span className='text-green-500'>activo</span>,
                                para colocarla como <span className='text-red-500'>Inactivo</span>{' '}
                                debe eliminar el registro desde la pestaña{' '}
                                <span className='font-bold text-red-500'>Eliminar Iglesia. </span>
                              </FormDescription>
                            )}
                            {form.getValues('status') === 'inactive' && (
                              <FormDescription className='pl-2 text-[12px] xl:text-[13px] font-bold'>
                                * El registro esta <span className='text-red-500 '>Inactivo</span>,
                                puede modificar el estado eligiendo otra opción.
                              </FormDescription>
                            )}
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  {isMessageErrorDisabled ? (
                    <p className='-mb-5 mt-4 md:mt-1 md:-mb-3 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                      ❌ Datos incompletos, completa todos los campos para guardar el registro.
                    </p>
                  ) : (
                    <p className='-mt-3 order-last md:-mt-2 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                      ¡Campos completados correctamente! <br /> Para finalizar por favor guarde los
                      cambios.
                    </p>
                  )}

                  <div className='mt-2 md:mt-1 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4 w-full md:w-[20rem] md:m-auto'>
                    <Button
                      disabled={isSubmitButtonDisabled}
                      type='submit'
                      className='w-full text-[14px]'
                      onClick={() => {
                        setTimeout(() => {
                          if (Object.keys(form.formState.errors).length === 0) {
                            setIsSubmitButtonDisabled(true);
                            setIsInputDisabled(true);
                          }
                        }, 100);
                      }}
                    >
                      Guardar cambios
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
};
