/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';

import type * as z from 'zod';
import { toast, Toaster } from 'sonner';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useDropzone } from 'react-dropzone';
import { TiDeleteOutline } from 'react-icons/ti';

import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import {
  MemberType,
  MemberTypeNames,
  OfferingIncomeCreationType,
  OfferingIncomeCreationSubType,
  OfferingIncomeCreationCategory,
  OfferingIncomeCreationTypeNames,
  OfferingIncomeCreationSubTypeNames,
  OfferingIncomeCreationShiftTypeNames,
  OfferingIncomeCreationCategoryNames,
} from '@/modules/offering/income/enums';
import {
  useOfferingIncomeFileDropZone,
  useOfferingIncomeCreationMutation,
  useOfferingIncomeCreationSubmitButtonLogic,
} from '@/modules/offering/income/hooks';
import { offeringIncomeFormSchema } from '@/modules/offering/income/validations';

import { CurrencyTypeNames, OfferingFileType } from '@/modules/offering/shared/enums';
import { useImagesUploadMutation, useModuleQueries } from '@/modules/offering/shared/hooks';
import { type FilesProps, type RejectionProps } from '@/modules/offering/shared/interfaces';

import { getSimpleZones } from '@/modules/zone/services';
import { getSimpleChurches } from '@/modules/church/services';
import { getSimpleFamilyGroups } from '@/modules/family-group/services';

import { type PastorResponse } from '@/modules/pastor/interfaces';
import { type CopastorResponse } from '@/modules/copastor/interfaces';
import { type PreacherResponse } from '@/modules/preacher/interfaces';
import { type DiscipleResponse } from '@/modules/disciple/interfaces';
import { type SupervisorResponse } from '@/modules/supervisor/interfaces';

import { cn } from '@/shared/lib/utils';
import { PageTitle } from '@/shared/components/page';
import { getCodeAndNameFamilyGroup, getFullNames } from '@/shared/helpers';

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from '@/shared/components/ui/form';
import {
  Command,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from '@/shared/components/ui/command';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Textarea } from '@/shared/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

type QueryDataResponse =
  | DiscipleResponse[]
  | PreacherResponse[]
  | SupervisorResponse[]
  | CopastorResponse[]
  | PastorResponse[];

export const OfferingIncomeCreatePage = (): JSX.Element => {
  //* States
  const [isInputZoneOpen, setIsInputZoneOpen] = useState<boolean>(false);
  const [isInputFamilyGroupOpen, setIsInputFamilyGroupOpen] = useState<boolean>(false);
  const [isInputChurchOpen, setIsInputChurchOpen] = useState<boolean>(false);
  const [isInputDateOpen, setIsInputDateOpen] = useState<boolean>(false);

  const [queryData, setQueryData] = useState<QueryDataResponse>();

  const [files, setFiles] = useState<FilesProps[]>([]);
  const [rejected, setRejected] = useState<RejectionProps[]>([]);

  const [isDropZoneDisabled, setIsDropZoneDisabled] = useState<boolean>(false);

  const [isDeleteFileButtonDisabled, setIsDeleteFileButtonDisabled] = useState<boolean>(false);

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);

  const [isInputMemberDisabled, setIsInputMemberDisabled] = useState<boolean>(true);
  const [isInputMemberOpen, setIsInputMemberOpen] = useState<boolean>(false);

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  //* Form
  const form = useForm<z.infer<typeof offeringIncomeFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(offeringIncomeFormSchema),
    defaultValues: {
      type: '',
      subType: '',
      category: '',
      memberType: '',
      shift: '',
      amount: '',
      date: undefined,
      currency: '',
      comments: '',
      fileNames: [],
      familyGroupId: '',
      memberId: '',
      zoneId: '',
      churchId: '',
    },
  });

  //* Watchers
  const type = form.watch('type');
  const churchId = form.watch('churchId');
  const subType = form.watch('subType');
  const category = form.watch('category');
  const memberType = form.watch('memberType');

  //* Custom hooks
  useOfferingIncomeCreationSubmitButtonLogic({
    isDropZoneDisabled,
    isDeleteFileButtonDisabled,
    isInputDisabled,
    offeringIncomeCreationForm: form,
    offeringIncomeCreationSubType: OfferingIncomeCreationSubType,
    offeringIncomeCreationType: OfferingIncomeCreationType,
    setIsDropZoneDisabled,
    setIsMessageErrorDisabled,
    setIsSubmitButtonDisabled,
  });

  //* Queries
  const churchesQuery = useQuery({
    queryKey: ['churches'],
    queryFn: () => getSimpleChurches({ isSimpleQuery: true }),
    retry: 1,
  });

  const familyGroupsQuery = useQuery({
    queryKey: ['family-groups', churchId],
    queryFn: () => getSimpleFamilyGroups({ isSimpleQuery: true, churchId }),
    retry: 1,
    enabled: !!churchId,
  });

  const zonesQuery = useQuery({
    queryKey: ['zones', churchId],
    queryFn: () => getSimpleZones({ isSimpleQuery: true, churchId }),
    retry: 1,
    enabled: !!churchId,
  });

  const { pastorsQuery, copastorsQuery, supervisorsQuery, preachersQuery, disciplesQuery } =
    useModuleQueries({ memberType });

  const { onDrop, removeAll, removeFile, removeRejected } = useOfferingIncomeFileDropZone({
    offeringIncomeForm: form,
    files,
    setFiles,
    setRejected,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxSize: 1024 * 1000, // 1KB
    onDrop,
    disabled: isDropZoneDisabled,
  });

  const offeringIncomeCreationMutation = useOfferingIncomeCreationMutation({
    setFiles,
    imageUrls,
    setIsInputDisabled,
    setIsInputMemberDisabled,
    setIsSubmitButtonDisabled,
    setIsDeleteFileButtonDisabled,
    offeringIncomeCreationForm: form,
  });

  const uploadImagesMutation = useImagesUploadMutation();

  //* Effects
  useEffect(() => {
    if (memberType === MemberType.Disciple) setQueryData(disciplesQuery.data);
    if (memberType === MemberType.Preacher) setQueryData(preachersQuery.data);
    if (memberType === MemberType.Supervisor) setQueryData(supervisorsQuery.data);
    if (memberType === MemberType.Copastor) setQueryData(copastorsQuery.data);
    if (memberType === MemberType.Pastor) setQueryData(pastorsQuery.data);
  }, [pastorsQuery, copastorsQuery, supervisorsQuery, preachersQuery, disciplesQuery]);

  useEffect(() => {
    if (memberType) {
      setIsInputMemberDisabled(false);
    }
    if (!memberType) {
      setIsInputMemberDisabled(true);
    }
    form.resetField('memberId', {
      keepError: true,
    });
  }, [memberType]);

  useEffect(() => {
    document.title = 'Modulo Ofrenda - IcupApp';
  }, []);

  //* Form handler
  const handleSubmit = async (
    formData: z.infer<typeof offeringIncomeFormSchema>
  ): Promise<void> => {
    let imageUrls;

    try {
      if (files.length >= 1) {
        const uploadResult = await uploadImagesMutation.mutateAsync({
          files: files as any,
          fileType: OfferingFileType.Income,
          offeringType: formData.type,
          offeringSubType: formData.subType ?? null,
        });

        imageUrls = uploadResult.imageUrls;
        setImageUrls(imageUrls ?? []);
      }

      await offeringIncomeCreationMutation.mutateAsync({
        type: formData.type,
        subType: formData.subType,
        category: formData.category,
        shift: formData.shift,
        amount: formData.amount,
        currency: formData.currency,
        date: formData.date,
        comments: formData.comments,
        memberType: formData.memberType,
        memberId: formData.memberId,
        familyGroupId: formData.familyGroupId,
        zoneId: formData.zoneId,
        churchId: formData.churchId,
        recordStatus: formData.recordStatus,
        imageUrls: (imageUrls as any) ?? [],
      });
    } catch (error) {
      if (uploadImagesMutation.isError) {
        toast.warning(
          '¡Oops! Fallo en la subida de imágenes, por favor actualize el navegador y vuelva a intentarlo.',
          {
            position: 'top-center',
            className: 'justify-center',
          }
        );
      }

      setTimeout(() => {
        setIsInputDisabled(false);
        setIsSubmitButtonDisabled(false);
      }, 1500);
    }
  };

  return (
    <div className='animate-fadeInPage'>
      <PageTitle className='text-green-600'>Modulo de Ingreso</PageTitle>

      <h1 className='text-left leading-7 pb-2 pt-3 px-4 sm:px-5 2xl:px-24 font-sans font-bold text-green-500 text-[1.5rem] sm:text-[1.75rem] md:text-[1.85rem] lg:text-[1.9rem] xl:text-[2.1rem] 2xl:text-4xl'>
        Crear nuevo ingreso de ofrenda
      </h1>
      <p className='dark:text-slate-300 text-left font-sans font-bold pl-5 pr-6  sm:pl-7 2xl:px-28 text-[12px] md:text-[15px] xl:text-base'>
        Por favor llena los siguientes datos para crear un nuevo registro de ingreso.
      </p>

      <div className='flex flex-col items-center pb-8 gap-y-8 md:gap-y-12 px-6 py-4 sm:px-12 sm:py-8 2xl:px-36 2xl:py-8'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='w-full flex flex-col md:grid gap-x-8 gap-y-4'
          >
            <div className='md:col-start-1 md:col-end-2'>
              <FormField
                control={form.control}
                name='churchId'
                render={({ field }) => (
                  <FormItem className='mt-3'>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                      Iglesia
                    </FormLabel>
                    <FormDescription className='text-[14px]'>
                      Selecciona la iglesia de destino para este registro.
                    </FormDescription>
                    <Popover open={isInputChurchOpen} onOpenChange={setIsInputChurchOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isInputDisabled}
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-slate-500 font-normal'
                            )}
                          >
                            {field.value
                              ? churchesQuery?.data?.find((zone) => zone.id === field.value)
                                  ?.abbreviatedChurchName
                              : 'Busque y seleccione una iglesia'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align='center' className='w-auto px-4 py-2'>
                        <Command>
                          {churchesQuery?.data?.length && churchesQuery?.data?.length > 0 ? (
                            <>
                              <CommandInput
                                placeholder='Busque una iglesia'
                                className='h-9 text-[14px]'
                              />
                              <CommandEmpty>Iglesia no encontrada.</CommandEmpty>
                              <CommandGroup className='max-h-[200px] h-auto'>
                                {churchesQuery?.data?.map((church) => (
                                  <CommandItem
                                    className='text-[14px]'
                                    value={church.abbreviatedChurchName}
                                    key={church.id}
                                    onSelect={() => {
                                      form.setValue('churchId', church.id);
                                      setIsInputChurchOpen(false);
                                    }}
                                  >
                                    {church.abbreviatedChurchName}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        church.id === field.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </>
                          ) : (
                            churchesQuery?.data?.length === 0 && (
                              <p className='text-[14.5px] text-red-500 text-center'>
                                ❌No hay iglesias disponibles.
                              </p>
                            )
                          )}
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>Tipo</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asigna un tipo de ofrenda al nuevo registro.
                      </FormDescription>
                      <Select
                        disabled={isInputDisabled}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona una tipo de ofrenda' />
                            ) : (
                              'Selecciona una tipo de ofrenda'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(OfferingIncomeCreationTypeNames).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
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

              {type === OfferingIncomeCreationType.Offering && (
                <FormField
                  control={form.control}
                  name='subType'
                  render={({ field }) => {
                    return (
                      <FormItem className='mt-3'>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Sub-Tipo
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Asigna un sub-tipo de ofrenda al nuevo registro.
                        </FormDescription>
                        <Select
                          disabled={isInputDisabled}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              {field.value ? (
                                <SelectValue placeholder='Selecciona una sub-tipo de ofrenda' />
                              ) : (
                                'Selecciona una sub-tipo de ofrenda'
                              )}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(OfferingIncomeCreationSubTypeNames).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}

              {type === OfferingIncomeCreationType.Offering && (
                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => {
                    return (
                      <FormItem className='mt-3'>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Categoría
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Asigna una categoría al nuevo registro.
                        </FormDescription>
                        <Select
                          disabled={isInputDisabled}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              {field.value ? (
                                <SelectValue placeholder='Selecciona una categoría de ofrenda' />
                              ) : (
                                'Selecciona una categoría de ofrenda'
                              )}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(OfferingIncomeCreationCategoryNames).map(
                              ([key, value]) =>
                                (subType === OfferingIncomeCreationSubType.SundayService ||
                                  subType === OfferingIncomeCreationSubType.FamilyGroup ||
                                  subType === OfferingIncomeCreationSubType.GeneralFasting ||
                                  subType === OfferingIncomeCreationSubType.GeneralVigil ||
                                  subType === OfferingIncomeCreationSubType.ZonalFasting ||
                                  subType === OfferingIncomeCreationSubType.ZonalVigil ||
                                  subType === OfferingIncomeCreationSubType.UnitedService) &&
                                key !== OfferingIncomeCreationCategory.OfferingBox ? (
                                  <SelectItem disabled key={key} value={key}>
                                    {value}
                                  </SelectItem>
                                ) : subType === OfferingIncomeCreationSubType.Special &&
                                  (key === OfferingIncomeCreationCategory.Activities ||
                                    key === OfferingIncomeCreationCategory.OfferingBox ||
                                    key === OfferingIncomeCreationCategory.General) ? (
                                  <SelectItem disabled key={key} value={key}>
                                    {value}
                                  </SelectItem>
                                ) : subType === OfferingIncomeCreationSubType.ChurchGround &&
                                  (key === OfferingIncomeCreationCategory.OfferingBox ||
                                    key === OfferingIncomeCreationCategory.General) ? (
                                  <SelectItem disabled key={key} value={key}>
                                    {value}
                                  </SelectItem>
                                ) : subType === OfferingIncomeCreationSubType.Activities &&
                                  key !== OfferingIncomeCreationCategory.General ? (
                                  <SelectItem disabled key={key} value={key}>
                                    {value}
                                  </SelectItem>
                                ) : (subType === OfferingIncomeCreationSubType.SundaySchool ||
                                    subType === OfferingIncomeCreationSubType.YouthService) &&
                                  key === OfferingIncomeCreationCategory.General ? (
                                  <SelectItem disabled key={key} value={key}>
                                    {value}
                                  </SelectItem>
                                ) : (
                                  <SelectItem key={key} value={key}>
                                    {value}
                                  </SelectItem>
                                )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}

              {((type === OfferingIncomeCreationType.Offering &&
                subType === OfferingIncomeCreationSubType.Special &&
                category === OfferingIncomeCreationCategory.InternalDonation) ||
                (type === OfferingIncomeCreationType.Offering &&
                  subType === OfferingIncomeCreationSubType.ChurchGround &&
                  category === OfferingIncomeCreationCategory.InternalDonation) ||
                (type === OfferingIncomeCreationType.Offering &&
                  subType === OfferingIncomeCreationSubType.SundaySchool &&
                  category === OfferingIncomeCreationCategory.InternalDonation) ||
                (type === OfferingIncomeCreationType.Offering &&
                  subType === OfferingIncomeCreationSubType.YouthService &&
                  category === OfferingIncomeCreationCategory.InternalDonation)) && (
                <FormField
                  control={form.control}
                  name='memberType'
                  render={({ field }) => {
                    return (
                      <FormItem className='mt-3'>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Tipo de Miembro
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isInputDisabled}
                        >
                          <FormControl>
                            <SelectTrigger>
                              {field.value ? (
                                <SelectValue placeholder='Selecciona el tipo de miembro' />
                              ) : (
                                'Selecciona el tipo de miembro'
                              )}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(MemberTypeNames).map(([key, value]) => (
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
              )}

              {((type === OfferingIncomeCreationType.Offering &&
                subType === OfferingIncomeCreationSubType.Special &&
                category === OfferingIncomeCreationCategory.InternalDonation) ||
                (type === OfferingIncomeCreationType.Offering &&
                  subType === OfferingIncomeCreationSubType.ChurchGround &&
                  category === OfferingIncomeCreationCategory.InternalDonation) ||
                (type === OfferingIncomeCreationType.Offering &&
                  subType === OfferingIncomeCreationSubType.SundaySchool &&
                  category === OfferingIncomeCreationCategory.InternalDonation) ||
                (type === OfferingIncomeCreationType.Offering &&
                  subType === OfferingIncomeCreationSubType.YouthService &&
                  category === OfferingIncomeCreationCategory.InternalDonation)) && (
                <FormField
                  control={form.control}
                  name='memberId'
                  render={({ field }) => (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Miembro
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Seleccione un miembro para asignarlo al registro.
                      </FormDescription>
                      {disciplesQuery?.isFetching ||
                      preachersQuery?.isFetching ||
                      supervisorsQuery?.isFetching ||
                      copastorsQuery?.isFetching ||
                      pastorsQuery?.isFetching ? (
                        <div className='pt-2 font-black text-[16px] text-center dark:text-gray-300 text-gray-500'>
                          <span>Cargando información...</span>
                        </div>
                      ) : (
                        <Popover open={isInputMemberOpen} onOpenChange={setIsInputMemberOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isInputMemberDisabled}
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between ',
                                  !field.value && 'font-normal'
                                )}
                              >
                                {field.value
                                  ? `${queryData?.find((member) => member.id === field.value)?.member?.firstName} ${queryData?.find((member) => member.id === field.value)?.member?.lastName}`
                                  : 'Busque y seleccione un miembro'}
                                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align='center' className='w-auto px-4 py-2'>
                            <Command>
                              {queryData?.length && queryData?.length > 0 ? (
                                <>
                                  <CommandInput
                                    placeholder='Busque un miembro...'
                                    className='h-9 text-[14px]'
                                  />
                                  <CommandEmpty>Miembro no encontrado.</CommandEmpty>
                                  <CommandGroup className='max-h-[200px] h-auto'>
                                    {queryData?.map((item) => (
                                      <CommandItem
                                        className='text-[14px]'
                                        value={getFullNames({
                                          firstNames: item.member?.firstName ?? '',
                                          lastNames: item.member?.lastName ?? '',
                                        })}
                                        key={item.id}
                                        onSelect={() => {
                                          form.setValue('memberId', item.id);
                                          setIsInputMemberOpen(false);
                                        }}
                                      >
                                        {`${item?.member?.firstName} ${item?.member?.lastName}`}
                                        <CheckIcon
                                          className={cn(
                                            'ml-auto h-4 w-4',
                                            item.id === field.value ? 'opacity-100' : 'opacity-0'
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </>
                              ) : (
                                queryData?.length === 0 && (
                                  <p className='text-[14.5px] text-red-500 text-center'>
                                    ❌No hay miembros disponibles.
                                  </p>
                                )
                              )}
                            </Command>
                          </PopoverContent>
                        </Popover>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {type === OfferingIncomeCreationType.Offering &&
                subType === OfferingIncomeCreationSubType.FamilyGroup &&
                category === OfferingIncomeCreationCategory.OfferingBox && (
                  <FormField
                    control={form.control}
                    name='familyGroupId'
                    render={({ field }) => (
                      <FormItem className='mt-3'>
                        <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                          Grupo Familiar
                        </FormLabel>
                        <FormDescription className='text-[14px]'>
                          Seleccione un grupo familiar para asignarlo al registro.
                        </FormDescription>
                        <Popover
                          open={isInputFamilyGroupOpen}
                          onOpenChange={setIsInputFamilyGroupOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isInputDisabled}
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between',
                                  !field.value && 'text-slate-500 font-normal'
                                )}
                              >
                                {field.value
                                  ? `${familyGroupsQuery?.data?.find((familyGroup) => familyGroup.id === field.value)?.familyGroupName} - ${familyGroupsQuery?.data?.find((familyGroup) => familyGroup.id === field.value)?.familyGroupCode}`
                                  : 'Busque y seleccione un grupo familiar'}
                                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align='center' className='w-auto px-4 py-2'>
                            <Command>
                              {familyGroupsQuery?.data?.length &&
                              familyGroupsQuery?.data?.length > 0 ? (
                                <>
                                  <CommandInput
                                    placeholder='Busque un grupo familiar...'
                                    className='h-9 text-[14px]'
                                  />
                                  <CommandEmpty>Grupo familiar no encontrado.</CommandEmpty>
                                  <CommandGroup className='max-h-[200px] h-auto'>
                                    {familyGroupsQuery?.data?.map((familyGroup) => (
                                      <CommandItem
                                        className='text-[14px]'
                                        value={getCodeAndNameFamilyGroup({
                                          code: familyGroup.familyGroupCode,
                                          name: familyGroup.familyGroupName,
                                        })}
                                        key={familyGroup.id}
                                        onSelect={() => {
                                          form.setValue('familyGroupId', familyGroup.id);
                                          setIsInputFamilyGroupOpen(false);
                                        }}
                                      >
                                        {`${familyGroup?.familyGroupName} ${familyGroup?.familyGroupCode}`}
                                        <CheckIcon
                                          className={cn(
                                            'ml-auto h-4 w-4',
                                            familyGroup.id === field.value
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </>
                              ) : (
                                familyGroupsQuery?.data?.length === 0 && (
                                  <p className='text-[14.5px] text-red-500 text-center'>
                                    ❌No hay grupos familiares disponibles.
                                  </p>
                                )
                              )}
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

              {((type === OfferingIncomeCreationType.Offering &&
                subType === OfferingIncomeCreationSubType.ZonalFasting &&
                category === OfferingIncomeCreationCategory.OfferingBox) ||
                (type === OfferingIncomeCreationType.Offering &&
                  subType === OfferingIncomeCreationSubType.ZonalVigil &&
                  category === OfferingIncomeCreationCategory.OfferingBox)) && (
                <FormField
                  control={form.control}
                  name='zoneId'
                  render={({ field }) => (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>Zona</FormLabel>
                      <FormDescription className='text-[14px]'>
                        Seleccione una zona para asignarlo al registro.
                      </FormDescription>
                      <Popover open={isInputZoneOpen} onOpenChange={setIsInputZoneOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={isInputDisabled}
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-slate-500 font-normal'
                              )}
                            >
                              {field.value
                                ? zonesQuery?.data?.find((zone) => zone.id === field.value)
                                    ?.zoneName
                                : 'Busque y seleccione una zona'}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align='center' className='w-auto px-4 py-2'>
                          <Command>
                            {zonesQuery?.data?.length && zonesQuery?.data?.length > 0 ? (
                              <>
                                <CommandInput
                                  placeholder='Busque una zona...'
                                  className='h-9 text-[14px]'
                                />
                                <CommandEmpty>Zona no encontrada.</CommandEmpty>
                                <CommandGroup className='max-h-[200px] h-auto'>
                                  {zonesQuery?.data?.map((zone) => (
                                    <CommandItem
                                      className='text-[14px]'
                                      value={zone.zoneName}
                                      key={zone.id}
                                      onSelect={() => {
                                        form.setValue('zoneId', zone.id);
                                        setIsInputZoneOpen(false);
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
                              </>
                            ) : (
                              zonesQuery?.data?.length === 0 && (
                                <p className='text-[14.5px] text-red-500 text-center'>
                                  ❌No hay zonas disponibles.
                                </p>
                              )
                            )}
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {(subType === OfferingIncomeCreationSubType.SundayService ||
                subType === OfferingIncomeCreationSubType.SundaySchool) &&
                category === OfferingIncomeCreationCategory.OfferingBox && (
                  <FormField
                    control={form.control}
                    name='shift'
                    render={({ field }) => {
                      return (
                        <FormItem className='mt-3'>
                          <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                            Turno
                          </FormLabel>
                          <FormDescription className='text-[14px]'>
                            Elige el turno de la ofrenda para el registro.
                          </FormDescription>
                          <Select
                            disabled={isInputDisabled}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                {field.value ? (
                                  <SelectValue placeholder='Selecciona un turno para la ofrenda' />
                                ) : (
                                  'Selecciona un turno para la ofrenda'
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(OfferingIncomeCreationShiftTypeNames).map(
                                ([key, value]) => (
                                  <SelectItem key={key} value={key}>
                                    {value}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                )}

              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Monto
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Digita la cantidad o monto de la ofrenda.
                      </FormDescription>
                      <FormControl>
                        <Input
                          disabled={isInputDisabled}
                          placeholder='Monto total de la ofrenda'
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
                name='currency'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                        Divisa / Moneda
                      </FormLabel>
                      <FormDescription className='text-[14px]'>
                        Asignar un tipo de divisa o moneda al registro.
                      </FormDescription>
                      <Select
                        disabled={isInputDisabled}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? (
                              <SelectValue placeholder='Selecciona una tipo de divisa o moneda' />
                            ) : (
                              'Selecciona una tipo de divisa o moneda'
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(CurrencyTypeNames).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
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
                name='date'
                render={({ field }) => (
                  <FormItem className='mt-3'>
                    <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>Fecha</FormLabel>
                    <FormDescription className='text-[14px]'>
                      Elige la fecha de deposito de la ofrenda.
                    </FormDescription>
                    <Popover open={isInputDateOpen} onOpenChange={setIsInputDateOpen}>
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
                              <span className='text-sm md:text-[12px] lg:text-sm'>
                                Seleccione la fecha de la ofrenda
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
                            setIsInputDateOpen(false);
                          }}
                          disabled={
                            (subType !== OfferingIncomeCreationSubType.SundayService &&
                              subType !== OfferingIncomeCreationSubType.SundaySchool &&
                              subType !== OfferingIncomeCreationSubType.FamilyGroup) ||
                            category !== OfferingIncomeCreationCategory.OfferingBox
                              ? (date) => date > new Date() || date < new Date('1900-01-01')
                              : (date) => {
                                  const today = new Date();
                                  const minDate = new Date('1900-01-01');
                                  const dayOfWeek = date.getDay();
                                  return dayOfWeek !== 0 || date > today || date < minDate;
                                }
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='comments'
                render={({ field }) => {
                  return (
                    <FormItem className='mt-3'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold flex items-center'>
                        Comentarios
                        {type !== OfferingIncomeCreationType.IncomeAdjustment && (
                          <span className='ml-3 inline-block bg-gray-200 text-slate-600 border text-[10px] font-semibold uppercase px-2 py-[2px] rounded-full mr-1'>
                            Opcional
                          </span>
                        )}
                        {type === OfferingIncomeCreationType.IncomeAdjustment && (
                          <span className='ml-3 inline-block bg-orange-200 text-orange-600 border text-[10px] font-bold uppercase px-2 py-[2px] rounded-full mr-1'>
                            Requerido
                          </span>
                        )}
                      </FormLabel>
                      {type === OfferingIncomeCreationType.IncomeAdjustment && (
                        <FormDescription>
                          Escribe una breve descripción sobre el ajuste
                        </FormDescription>
                      )}
                      <FormControl>
                        <Textarea
                          disabled={isInputDisabled}
                          placeholder={`${
                            type === OfferingIncomeCreationType.IncomeAdjustment
                              ? `Comentarios sobre el ajuste de ingreso...`
                              : 'Comentarios sobre el registro de la ofrenda...'
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className='md:col-start-2 md:col-end-3 md:border-l-2 border-slate-200 dark:border-slate-800 md:pl-6'>
              <FormField
                control={form.control}
                name='fileNames'
                render={() => {
                  return (
                    <FormItem className='mt-3 md:mt-0'>
                      <FormLabel className='text-[14px] md:text-[14.5px] font-bold flex items-center'>
                        Subir imagen{' '}
                        <span className='ml-3 inline-block bg-gray-200 text-slate-600 border text-[10px] font-semibold uppercase px-2 py-[2px] rounded-full mr-1'>
                          Opcional
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div
                          {...getRootProps({
                            className:
                              'font-medium text-sm sm:text-[15px] p-10 sm:p-12 md:p-16 max-w-[25rem] md:max-w-[25rem] m-auto border border-dashed border-black dark:border-white hover:bg-green-200 dark:hover:text-black ease-in duration-200 text-center',
                          })}
                        >
                          <input {...getInputProps()} className='m-auto w-[20rem]' />

                          {isDragActive ? (
                            <p>Suelte sus archivos aquí ...</p>
                          ) : (
                            <p>
                              Arrastre y suelte sus archivos aquí, o haga clic para seleccionar.
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                      {files && files.length > 3 ? (
                        <span className='text-red-500 font-bold text-[11.5px] md:text-[12.5px] text-center mx-auto justify-center flex'>
                          ❌ Sobrepasa el limite, elige como máximo solo 3 imágenes.
                        </span>
                      ) : (
                        <span className='font-bold text-[11.5px] md:text-[12.5px] pl-6 mt-1 flex flex-col'>
                          <span>✅ Máximo 3 archivos.</span>
                          <span>✅ El campo se bloqueara al llegar o pasar los 3 archivos.</span>
                        </span>
                      )}
                    </FormItem>
                  );
                }}
              />

              <section className='mt-10'>
                <div className='flex gap-4 items-center justify-between'>
                  <h2 className='text-[16px] md:text-[18px] font-bold'>Pre-visualización</h2>
                  <button
                    type='button'
                    disabled={isDeleteFileButtonDisabled}
                    onClick={removeAll}
                    className='mt-1 text-[10.5px] md:text-[11px] w-[8rem] md:w-[10rem] p-2 uppercase tracking-wider font-bold text-red-500 border border-red-400 rounded-md  hover:bg-secondary-400 hover:text-white ease-in duration-200 hover:bg-red-500 transition-colors'
                  >
                    Remover todos los archivos
                  </button>
                </div>

                {/* Accepted files */}
                <h3 className='text-[14.5px] lg:text-[16px] font-semibold mt-5 border-b pb-3'>
                  Archivos Aceptados
                </h3>
                <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 gap-x-5 gap-y-20'>
                  {files.map((file) => (
                    <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
                      <img
                        src={file.preview}
                        alt={file.name}
                        width={100}
                        height={100}
                        onLoad={() => {
                          URL.revokeObjectURL(file.preview);
                        }}
                        className='h-full w-full object-contain rounded-md'
                      />
                      <button
                        type='button'
                        disabled={isDeleteFileButtonDisabled}
                        className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                        onClick={() => {
                          removeFile(file.name);
                        }}
                      >
                        <TiDeleteOutline className='w-12 h-12 fill-red-500 hover:fill-secondary-400 transition-colors' />
                      </button>
                      <p className='mt-2 text-neutral-500 text-[12px] font-medium'>{file.name}</p>
                    </li>
                  ))}
                </ul>

                {/* Rejected Files */}
                <h3 className='text-[14.5px] lg:text-[16px] font-semibold mt-20 border-b pb-3'>
                  Archivos rechazados
                </h3>
                <ul className='mt-2 flex flex-col'>
                  {rejected.map(({ file, errors }) => (
                    <li key={file.name} className='flex items-start justify-between'>
                      <div>
                        <p className='mt-2 text-neutral-500 text-sm font-medium'>{file.name}</p>
                        <ul className='text-[14px] text-red-400 flex gap-3 font-medium'>
                          {errors.map((error) => (
                            <li
                              key={error.code}
                            >{`${error.message === 'File type must be image/*' ? 'Tipo de archivo debe ser una imagen.' : 'Debe ser un archivo menor a 1000KB.'}`}</li>
                          ))}
                        </ul>
                      </div>
                      <button
                        type='button'
                        disabled={isDeleteFileButtonDisabled}
                        className='mt-1 py-1 text-[11px] md:text-[11.5px] uppercase tracking-wider font-bold text-red-500 border border-red-400 rounded-md px-3 hover:bg-red-500 hover:text-white ease-in duration-200 transition-colors'
                        onClick={() => {
                          removeRejected(file.name);
                        }}
                      >
                        remover
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {isMessageErrorDisabled ? (
              <p className='-mb-5 mt-2 md:-mb-2 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 mx-auto md:w-[100%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold'>
                ❌ Datos incompletos, completa todos los campos para crear el registro.
              </p>
            ) : (
              <p className='-mt-2 order-last md:-mt-3 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold'>
                ¡Campos completados correctamente! <br />
              </p>
            )}

            <div className='mt-2 col-start-1 col-end-3 row-start-3 row-end-4 w-full md:w-[20rem] md:m-auto'>
              <Toaster position='top-center' richColors />
              <Button
                disabled={isSubmitButtonDisabled}
                type='submit'
                className={cn(
                  'w-full text-[14px] md:text-[14.5px]',
                  uploadImagesMutation?.isPending &&
                    'bg-emerald-500 disabled:opacity-100 disabled:md:text-[14.5px] text-white'
                )}
                onClick={() => {
                  setTimeout(() => {
                    if (Object.keys(form.formState.errors).length === 0) {
                      setIsInputDisabled(true);
                      setIsDropZoneDisabled(true);
                      setIsInputMemberDisabled(true);
                      setIsDeleteFileButtonDisabled(true);
                      setIsSubmitButtonDisabled(true);
                    }
                  }, 100);
                }}
              >
                {uploadImagesMutation?.isPending ? 'Procesando...' : 'Registrar'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
