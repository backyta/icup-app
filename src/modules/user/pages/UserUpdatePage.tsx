/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import { type z } from 'zod';
import { Toaster } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  UserRole,
  UserRoleNames,
  UserSearchType,
  UserSearchTypeNames,
  UserSearchNamesByGender,
  UserSearchNamesByRecordStatus,
} from '@/modules/user/enums';
import { userSearchByTermFormSchema } from '@/modules/user/validations';
import { type UserSearchFormByTerm, type UserResponse } from '@/modules/user/interfaces';
import { userUpdateColumns as columns, SearchByTermUserDataTable } from '@/modules/user/components';

import { useUserStore } from '@/stores/user';

import { cn } from '@/shared/lib/utils';

import { PageTitle, SearchTitle } from '@/shared/components/page';
import { RecordOrder, RecordOrderNames } from '@/shared/enums';
import { arrayRolesFormatterToString, namesFormatter, lastNamesFormatter } from '@/shared/helpers';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/shared/components/ui/form';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';

const dataFictional: UserResponse[] = [
  {
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    roles: [],
    recordStatus: '',
  },
];

export const UserUpdatePage = (): JSX.Element => {
  //* States
  const [dataForm, setDataForm] = useState<UserSearchFormByTerm>();
  const [isDisabledSubmitButton, setIsDisabledSubmitButton] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useState<UserSearchFormByTerm | undefined>();

  const isFiltersSearchByTermDisabled = useUserStore(
    (state) => state.isFiltersSearchByTermDisabled
  );
  const setIsFiltersSearchByTermDisabled = useUserStore(
    (state) => state.setIsFiltersSearchByTermDisabled
  );

  //* Forms
  const form = useForm<z.infer<typeof userSearchByTermFormSchema>>({
    resolver: zodResolver(userSearchByTermFormSchema),
    mode: 'onChange',
    defaultValues: {
      limit: '10',
      namesTerm: '',
      lastNamesTerm: '',
      selectTerm: '',
      multiSelectTerm: undefined,
      all: false,
      order: RecordOrder.Ascending,
    },
  });

  //* Watchers
  const searchType = form.watch('searchType');
  const limit = form.watch('limit');
  const order = form.watch('order');

  //* Effects
  useEffect(() => {
    if (form.getValues('all')) {
      form.setValue('limit', '10');
    }
  }, [form.getValues('all')]);

  useEffect(() => {
    if (limit !== '' && order !== '') {
      setIsDisabledSubmitButton(false);
    }

    if (limit === '' || order === '') {
      setIsDisabledSubmitButton(true);
    }
  }, [limit, order]);

  useEffect(() => {
    setIsFiltersSearchByTermDisabled(true);
  }, []);

  useEffect(() => {
    document.title = 'Modulo Usuario - IcupApp';
  }, []);

  //* Form handler
  function onSubmit(formData: z.infer<typeof userSearchByTermFormSchema>): void {
    const newNamesTerm = namesFormatter(formData?.namesTerm);
    const newLastNamesTerm = lastNamesFormatter(formData?.lastNamesTerm);

    const formatRoles = arrayRolesFormatterToString(formData.multiSelectTerm);

    setSearchParams({
      ...formData,
      namesTerm: newNamesTerm,
      lastNamesTerm: newLastNamesTerm,
      multiSelectTerm: formatRoles,
    });

    setIsDisabledSubmitButton(true);
    setIsFiltersSearchByTermDisabled(false);
    setDataForm({
      ...formData,
      namesTerm: newNamesTerm,
      lastNamesTerm: newLastNamesTerm,
      multiSelectTerm: formatRoles,
    });
    form.reset();
    setIsDisabledSubmitButton(false);
  }

  return (
    <div className='animate-fadeInPage'>
      <PageTitle className='text-user-color'>Modulo Usuario</PageTitle>

      <SearchTitle isUpdateSearch className='text-orange-500' titleName={'usuarios'} />

      <div className='px-4 md:-px-2 md:px-[2rem] xl:px-[3rem] py-4 md:py-7 w-full'>
        {isFiltersSearchByTermDisabled && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid grid-cols-1 gap-4 gap-y-4 items-end mb-10 md:mb-10 md:grid-cols-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 w-auto'
            >
              <FormField
                control={form.control}
                name='searchType'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-[14px] font-bold'>Tipo</FormLabel>
                      <FormDescription className='text-[14px]'>
                        ¿Qué tipo de búsqueda desea hacer?
                      </FormDescription>
                      <Select
                        onOpenChange={() => {
                          form.resetField('selectTerm', {
                            keepError: true,
                          });
                          form.resetField('multiSelectTerm', {
                            keepError: true,
                          });
                          form.resetField('namesTerm', {
                            keepError: true,
                          });
                          form.resetField('lastNamesTerm', {
                            keepError: true,
                          });
                        }}
                        onValueChange={field.onChange}
                      >
                        <FormControl className='text-[13px] md:text-[14px]'>
                          <SelectTrigger>
                            <SelectValue placeholder='Selecciona un tipo' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(UserSearchTypeNames).map(([key, value]) => (
                            <SelectItem
                              className={`text-[13px] md:text-[14px]`}
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

              {(searchType === UserSearchType.RecordStatus ||
                searchType === UserSearchType.Gender) && (
                <FormField
                  control={form.control}
                  name='selectTerm'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className='text-[14px] font-bold'>Termino</FormLabel>
                        <FormDescription className='text-[14px]'>
                          Selecciona una opción de búsqueda.
                        </FormDescription>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl className='text-[13px] md:text-[14px]'>
                            <SelectTrigger>
                              {field.value ? (
                                <SelectValue
                                  className='text-[13px] md:text-[14px]'
                                  placeholder='Elige una opción'
                                />
                              ) : (
                                'Elige una opción'
                              )}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(
                              searchType === UserSearchType.Gender
                                ? UserSearchNamesByGender
                                : UserSearchNamesByRecordStatus
                            ).map(([key, value]) => (
                              <SelectItem
                                className={cn(`text-[13px] md:text-[14px]`)}
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
              )}

              {(searchType === UserSearchType.FirstName ||
                searchType === UserSearchType.FullName) && (
                <FormField
                  control={form.control}
                  name='namesTerm'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[14px] font-bold'>Termino (nombres)</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Escribe los nombres que deseas buscar.
                      </FormDescription>
                      <FormControl>
                        <Input
                          className='text-[13px] md:text-[14px]'
                          placeholder='Ejem: Rolando Martin...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {(searchType === UserSearchType.LastName ||
                searchType === UserSearchType.FullName) && (
                <FormField
                  control={form.control}
                  name='lastNamesTerm'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[14px] font-bold'>Termino (apellidos)</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Escribe los apellidos que deseas buscar.
                      </FormDescription>
                      <FormControl>
                        <Input
                          className='text-[13px] md:text-[14px]'
                          placeholder='Ejem: Sanchez Torres...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {searchType === UserSearchType.Roles && (
                <FormField
                  control={form.control}
                  name='multiSelectTerm'
                  render={() => (
                    <FormItem>
                      <FormLabel className='text-[14px] font-bold'>Roles</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Seleccione los roles que desea buscar
                      </FormDescription>
                      <div className='flex flex-wrap gap-y-1 justify-start sm:justify-around items-center'>
                        {Object.values(UserRole).map((role) => (
                          <FormField
                            key={role}
                            control={form.control}
                            name='multiSelectTerm'
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={role}
                                  className='flex flex-row items-center space-x-3 space-y-0'
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(role)}
                                      onCheckedChange={(checked) => {
                                        let updatedRoles: UserRole[] = [];
                                        checked
                                          ? (updatedRoles = field.value
                                              ? [...field.value, role]
                                              : [role])
                                          : (updatedRoles =
                                              field.value?.filter((value) => value !== role) ?? []);

                                        field.onChange(updatedRoles);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className='text-[13px] md:text-[14px] font-normal'>
                                    {UserRoleNames[role]}
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
              )}

              <div className='grid grid-cols-2 items-end justify-evenly'>
                <div className='flex flex-col gap-2 col-start-1 col-end-3 pb-2'>
                  <FormField
                    control={form.control}
                    name='limit'
                    render={() => (
                      <FormItem>
                        <FormLabel className='text-[14px] font-bold'>Limite</FormLabel>
                        <FormDescription className='text-[14px]'>
                          ¿Cuantos registros necesitas?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex gap-4 col-start-1 col-end-3 justify-between sm:justify-normal sm:gap-6 md:gap-6 lg:gap-4 md:justify-start'>
                  <FormField
                    control={form.control}
                    name='limit'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={form.getValues('all')}
                            className='text-[13px] md:text-[14px]'
                            value={form.getValues('all') ? '-' : field.value ?? ''}
                            placeholder='Limite de registros'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='all'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 space-y-0 rounded-md border p-3 h-[2.5rem] w-[8rem] justify-center'>
                        <FormControl>
                          <Checkbox
                            disabled={!form.getValues('limit') || !!form.formState.errors.limit} // transform to boolean
                            checked={field?.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                            }}
                            className={
                              form.getValues('limit') && !form.formState.errors.limit
                                ? ''
                                : 'bg-slate-500'
                            }
                          />
                        </FormControl>
                        <div className='space-y-1 leading-none'>
                          <FormLabel className='text-[13px] md:text-[14px]'>Todos</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  className={cn(
                    'flex flex-col gap-2 col-start-1 col-end-3',
                    form.formState.errors.limit && 'mt-2'
                  )}
                >
                  <FormField
                    control={form.control}
                    name='limit'
                    render={() => (
                      <FormItem>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name='order'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='text-[14px] font-bold'>Orden</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Elige el tipo de orden de los registros.
                    </FormDescription>
                    <Select
                      onOpenChange={() => {}}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl className='text-[14px]'>
                        <SelectTrigger>
                          {field.value ? (
                            <SelectValue
                              className='text-[13px] md:text-[14px]'
                              placeholder='Selecciona un tipo de orden'
                            />
                          ) : (
                            'Selecciona un tipo de orden'
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(RecordOrderNames).map(([key, value]) => (
                          <SelectItem
                            className={`text-[13px] md:text-[14px]`}
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
                )}
              />

              <div>
                <Toaster position='top-center' richColors />
                <Button
                  disabled={isDisabledSubmitButton}
                  type='submit'
                  variant='ghost'
                  className='mx-auto w-full mt-2 md:mt-3 xl:mt-0 md:col-start-2 md:col-end-3 lg:col-start-2 lg:col-end-3 lg:row-start-auto lg:row-end-auto xl:row-start-auto xl:row-end-auto xl:col-start-auto xl:col-end-auto text-[13px] lg:text-[14px] h-[2.5rem] 2xl:mx-auto px-4 py-2 border-1 border-green-500 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:text-green-100 hover:from-green-500 hover:via-green-600 hover:to-green-700 dark:from-green-600 dark:via-green-700 dark:to-green-800 dark:text-gray-100 dark:hover:text-gray-200 dark:hover:from-green-700 dark:hover:via-green-800 dark:hover:to-green-900'
                >
                  Buscar
                </Button>
              </div>
            </form>
          </Form>
        )}

        {/* Table */}
        <div className='w-full'>
          {
            <SearchByTermUserDataTable
              columns={columns}
              data={dataFictional}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              dataForm={dataForm}
            />
          }
        </div>
      </div>
    </div>
  );
};
