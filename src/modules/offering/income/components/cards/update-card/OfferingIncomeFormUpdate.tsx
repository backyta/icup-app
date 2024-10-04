/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from 'react';

import type * as z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
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
  OfferingIncomeCreationTypeNames,
  OfferingIncomeCreationSubTypeNames,
  OfferingIncomeCreationShiftTypeNames,
} from '@/modules/offering/income/enums';
import {
  useOfferingIncomeSetData,
  useOfferingIncomeFileDropZone,
  useOfferingIncomeUpdateMutation,
  useOfferingIncomeUpdateSubmitButtonLogic,
} from '@/modules/offering/income/hooks';

import { DestroyImageButton } from '@/modules/offering/shared/components';
import { CurrencyTypeNames, OfferingFileType } from '@/modules/offering/shared/enums';
import { type FilesProps, type RejectionProps } from '@/modules/offering/shared/interfaces';
import { useImagesUploadMutation, useModuleQueries } from '@/modules/offering/shared/hooks';

import { offeringIncomeFormSchema } from '@/modules/offering/income/validations';
import { OfferingIncomeFormSkeleton } from '@/modules/offering/income/components';
import { type OfferingIncomeResponse } from '@/modules/offering/income/interfaces';

import { type PastorResponse } from '@/modules/pastor/interfaces';
import { type CopastorResponse } from '@/modules/copastor/interfaces';
import { type PreacherResponse } from '@/modules/preacher/interfaces';
import { type DiscipleResponse } from '@/modules/disciple/interfaces';
import { type SupervisorResponse } from '@/modules/supervisor/interfaces';

import { cn } from '@/shared/lib/utils';
import { RecordStatus } from '@/shared/enums';
import { getCodeAndNameFamilyGroup, getFullNames } from '@/shared/helpers';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
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
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

type QueryDataResponse =
  | DiscipleResponse[]
  | PreacherResponse[]
  | SupervisorResponse[]
  | CopastorResponse[]
  | PastorResponse[];

interface OfferingIncomeFormUpdateProps {
  id: string;
  dialogClose: () => void;
  scrollToTop: () => void;
  data: OfferingIncomeResponse | undefined;
}

export const OfferingIncomeFormUpdate = ({
  id,
  dialogClose: onSubmit,
  scrollToTop: onScroll,
  data,
}: OfferingIncomeFormUpdateProps): JSX.Element => {
  //* States
  const [isInputDateOpen, setIsInputDateOpen] = useState<boolean>(false);
  const [isInputRelationOpen, setIsInputRelationOpen] = useState<boolean>(false);

  const [queryData, setQueryData] = useState<QueryDataResponse>();

  const [files, setFiles] = useState<FilesProps[]>([]);
  const [rejected, setRejected] = useState<RejectionProps[]>([]);

  const [isDropZoneDisabled, setIsDropZoneDisabled] = useState<boolean>(false);

  const [isDeleteFileButtonDisabled, setIsDeleteFileButtonDisabled] = useState<boolean>(false);

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] = useState<boolean>(true);

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isInputMemberOpen, setIsInputMemberOpen] = useState<boolean>(false);

  //* Form
  const form = useForm<z.infer<typeof offeringIncomeFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(offeringIncomeFormSchema),
    defaultValues: {
      type: '',
      subType: '',
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
  const subType = form.watch('subType');
  const comments = form.watch('comments');
  const memberType = form.watch('memberType');

  //* Custom hooks
  useOfferingIncomeSetData({
    id,
    data,
    setFiles,
    setIsLoadingData,
    offeringIncomeUpdateForm: form,
  });

  useOfferingIncomeUpdateSubmitButtonLogic({
    files,
    isDeleteFileButtonDisabled,
    isDropZoneDisabled,
    isInputDisabled,
    OfferingIncomeCreationSubType,
    OfferingIncomeCreationType,
    offeringIncomeUpdateForm: form,
    setIsDropZoneDisabled,
    setIsMessageErrorDisabled,
    setIsSubmitButtonDisabled,
  });

  const {
    zonesQuery,
    churchesQuery,
    pastorsQuery,
    copastorsQuery,
    supervisorsQuery,
    preachersQuery,
    disciplesQuery,
    familyGroupsQuery,
  } = useModuleQueries(memberType);

  const { onDrop, removeFile, removeCloudFile, removeRejected } = useOfferingIncomeFileDropZone({
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

  const offeringIncomeUpdateMutation = useOfferingIncomeUpdateMutation({
    onSubmit,
    onScroll,
    setIsInputDisabled,
    setIsSubmitButtonDisabled,
    setIsDeleteFileButtonDisabled,
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
    if (data?.recordStatus === RecordStatus.Inactive) {
      setIsInputDisabled(true);
      setIsDropZoneDisabled(true);
      setIsDeleteFileButtonDisabled(true);
    }
  }, []);

  //* Form handler
  const handleSubmit = async (
    formData: z.infer<typeof offeringIncomeFormSchema>
  ): Promise<void> => {
    const filesOnly = files.filter((item) => item instanceof File);

    let imageUrls;

    try {
      if (filesOnly.length >= 1) {
        const uploadResult = await uploadImagesMutation.mutateAsync({
          files: filesOnly as any,
          fileType: OfferingFileType.Income,
          offeringType: formData.type,
          offeringSubType: formData.subType ?? null,
        });

        imageUrls = uploadResult.imageUrls;
      }
    } catch (error) {
      toast.warning(
        '¡Opps! fallo en subida de imágenes, por favor actualize y vuelve a intentarlo',
        {
          position: 'top-center',
          className: 'justify-center',
        }
      );

      setTimeout(() => {
        setIsInputDisabled(false);
        setIsSubmitButtonDisabled(false);
      }, 1500);

      return;
    }

    await offeringIncomeUpdateMutation.mutateAsync({
      id,
      formData: {
        type: formData.type,
        subType: !formData.subType ? undefined : formData.subType,
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
        imageUrls: imageUrls ?? [],
      },
    });
  };

  return (
    <Tabs
      defaultValue='general-info'
      className='w-auto sm:w-[520px] md:w-[680px] lg:w-[990px] xl:w-[1100px]'
    >
      <div className='text-center'>
        <h2 className='text-orange-500  font-bold text-[20px] sm:text-[22px] md:text-[24px]'>
          Actualizar información del registro
        </h2>
      </div>

      <TabsContent value='general-info'>
        <Card className='w-full'>
          {isLoadingData && <OfferingIncomeFormSkeleton />}

          {!isLoadingData && (
            <CardContent className='py-3 px-4'>
              <div className='flex flex-col mb-4 pl-0 md:pl-4'>
                <span className='dark:text-amber-400 font-bold text-[16px] md:text-[18px] text-amber-500'>
                  Tipo de registro:{' '}
                  {`${OfferingIncomeCreationTypeNames[data?.type as OfferingIncomeCreationType]} ${data?.subType ? '-' : ''} ${OfferingIncomeCreationSubTypeNames[data?.subType as OfferingIncomeCreationSubType] ?? ''}`}
                </span>
                <span className='dark:text-slate-300 text-slate-500 font-bold text-[15px] md:text-[17px] ml-1'>
                  Pertenencia:{' '}
                  {`${
                    data?.type === OfferingIncomeCreationType.IncomeAdjustment ||
                    data?.subType === OfferingIncomeCreationSubType.SundaySchool ||
                    data?.subType === OfferingIncomeCreationSubType.SundayWorship ||
                    data?.subType === OfferingIncomeCreationSubType.GeneralFasting ||
                    data?.subType === OfferingIncomeCreationSubType.GeneralVigil ||
                    data?.subType === OfferingIncomeCreationSubType.YouthWorship ||
                    data?.subType === OfferingIncomeCreationSubType.Activities
                      ? data?.church?.churchName
                      : data?.subType === OfferingIncomeCreationSubType.FamilyGroup
                        ? `${data?.familyGroup?.familyGroupCode} - ${data?.familyGroup?.familyGroupName}`
                        : data?.subType === OfferingIncomeCreationSubType.ZonalFasting ||
                            data?.subType === OfferingIncomeCreationSubType.ZonalVigil
                          ? `${data?.zone?.zoneName} - ${data?.zone?.district}`
                          : data?.memberType === MemberType.Disciple
                            ? `${data?.disciple?.firstName} ${data?.disciple?.lastName}`
                            : data?.memberType === MemberType.Preacher
                              ? `${data?.preacher?.firstName} ${data?.preacher?.lastName}`
                              : data?.memberType === MemberType.Supervisor
                                ? `${data?.supervisor?.firstName} ${data?.supervisor?.lastName}`
                                : data?.memberType === MemberType.Copastor
                                  ? `${data?.copastor?.firstName} ${data?.copastor?.lastName}`
                                  : `${data?.pastor?.firstName} ${data?.pastor?.lastName}`
                  }`}
                </span>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='w-full flex flex-col px-2 sm:px-8 md:grid md:grid-cols-2 gap-x-8 gap-y-4'
                >
                  <div className='md:col-start-1 md:col-end-2'>
                    <FormField
                      control={form.control}
                      name='type'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Tipo
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Asignar un tipo de ofrenda al registro.
                            </FormDescription>
                            <Select disabled value={field.value} onValueChange={field.onChange}>
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
                                {Object.entries(OfferingIncomeCreationTypeNames).map(
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
                                Asignar un sub-tipo de ofrenda al registro.
                              </FormDescription>
                              <Select disabled value={field.value} onValueChange={field.onChange}>
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

                    {((type === OfferingIncomeCreationType.Offering &&
                      subType === OfferingIncomeCreationSubType.Special) ||
                      (type === OfferingIncomeCreationType.Offering &&
                        subType === OfferingIncomeCreationSubType.ChurchGround)) && (
                      <FormField
                        control={form.control}
                        name='memberType'
                        render={({ field }) => {
                          return (
                            <FormItem className='mt-3'>
                              <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                                Tipo de Miembro
                              </FormLabel>
                              <Select disabled onValueChange={field.onChange} value={field.value}>
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
                      subType === OfferingIncomeCreationSubType.Special) ||
                      (type === OfferingIncomeCreationType.Offering &&
                        subType === OfferingIncomeCreationSubType.ChurchGround)) && (
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
                                      disabled
                                      variant='outline'
                                      role='combobox'
                                      className={cn(
                                        'w-full justify-between ',
                                        !field.value && 'font-normal'
                                      )}
                                    >
                                      {field.value
                                        ? `${queryData?.find((member) => member.id === field.value)?.firstName} ${queryData?.find((member) => member.id === field.value)?.lastName}`
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
                                          {queryData?.map((member) => (
                                            <CommandItem
                                              className='text-[14px]'
                                              value={getFullNames({
                                                firstNames: member.firstName,
                                                lastNames: member.lastName,
                                              })}
                                              key={member.id}
                                              onSelect={() => {
                                                form.setValue('memberId', member.id);
                                                setIsInputMemberOpen(false);
                                              }}
                                            >
                                              {`${member?.firstName} ${member?.lastName}`}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  member.id === field.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
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
                      subType === OfferingIncomeCreationSubType.FamilyGroup && (
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
                                open={isInputRelationOpen}
                                onOpenChange={setIsInputRelationOpen}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      disabled
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
                                                setIsInputRelationOpen(false);
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

                    {(type === OfferingIncomeCreationType.IncomeAdjustment ||
                      (type === OfferingIncomeCreationType.Offering &&
                        (subType === OfferingIncomeCreationSubType.SundaySchool ||
                          subType === OfferingIncomeCreationSubType.SundayWorship ||
                          subType === OfferingIncomeCreationSubType.Activities ||
                          subType === OfferingIncomeCreationSubType.GeneralFasting ||
                          subType === OfferingIncomeCreationSubType.GeneralVigil ||
                          subType === OfferingIncomeCreationSubType.WorshipUnited ||
                          subType === OfferingIncomeCreationSubType.YouthWorship))) && (
                      <FormField
                        control={form.control}
                        name='churchId'
                        render={({ field }) => (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Iglesia
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Seleccione una iglesia para asignarla al registro.
                            </FormDescription>
                            <Popover
                              open={isInputRelationOpen}
                              onOpenChange={setIsInputRelationOpen}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    disabled
                                    variant='outline'
                                    role='combobox'
                                    className={cn(
                                      'w-full justify-between',
                                      !field.value && 'text-slate-500 font-normal'
                                    )}
                                  >
                                    {field.value
                                      ? churchesQuery?.data?.find((zone) => zone.id === field.value)
                                          ?.churchName
                                      : 'Busque y seleccione una iglesia'}
                                    <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-5' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent align='center' className='w-auto px-4 py-2'>
                                <Command>
                                  {churchesQuery?.data?.length &&
                                  churchesQuery?.data?.length > 0 ? (
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
                                            value={church.churchName}
                                            key={church.id}
                                            onSelect={() => {
                                              form.setValue('churchId', church.id);
                                              setIsInputRelationOpen(false);
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
                    )}

                    {((type === OfferingIncomeCreationType.Offering &&
                      subType === OfferingIncomeCreationSubType.ZonalFasting) ||
                      (type === OfferingIncomeCreationType.Offering &&
                        subType === OfferingIncomeCreationSubType.ZonalVigil)) && (
                      <FormField
                        control={form.control}
                        name='zoneId'
                        render={({ field }) => (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Zona
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Seleccione una zona para asignarlo al registro.
                            </FormDescription>
                            <Popover
                              open={isInputRelationOpen}
                              onOpenChange={setIsInputRelationOpen}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    disabled
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
                                              setIsInputRelationOpen(false);
                                            }}
                                          >
                                            {zone.zoneName}
                                            <CheckIcon
                                              className={cn(
                                                'ml-auto h-4 w-4',
                                                zone.id === field.value
                                                  ? 'opacity-100'
                                                  : 'opacity-0'
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

                    {(subType === OfferingIncomeCreationSubType.SundayWorship ||
                      subType === OfferingIncomeCreationSubType.SundaySchool) && (
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
                              <Select disabled value={field.value} onValueChange={field.onChange}>
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

                    <div className='md:flex md:gap-5'>
                      <FormField
                        control={form.control}
                        name='amount'
                        render={({ field }) => {
                          return (
                            <FormItem className='mt-3 w-full'>
                              <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                                Monto
                              </FormLabel>
                              <FormDescription className='text-[14px]'>
                                Digita el monto de la ofrenda.
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
                            <FormItem className='mt-3 w-full'>
                              <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                                Divisa / Moneda
                              </FormLabel>
                              <FormDescription className='text-[14px]'>
                                Asignar un tipo de divisa al registro.
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
                    </div>

                    <div
                      className={cn(
                        'md:flex md:gap-5',
                        type === OfferingIncomeCreationType.IncomeAdjustment &&
                          'md:flex-col md:gap-0'
                      )}
                    >
                      <FormField
                        control={form.control}
                        name='date'
                        render={({ field }) => (
                          <FormItem className='mt-3 w-full'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                              Fecha
                            </FormLabel>
                            <FormDescription className='text-[14px]'>
                              Selecciona la fecha de deposito.
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
                                    subType !== OfferingIncomeCreationSubType.SundayWorship &&
                                    subType !== OfferingIncomeCreationSubType.SundaySchool &&
                                    subType !== OfferingIncomeCreationSubType.FamilyGroup
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

                      {data?.recordStatus === RecordStatus.Active && (
                        <FormField
                          control={form.control}
                          name='recordStatus'
                          render={({ field }) => {
                            return (
                              <FormItem className='mt-3 w-full'>
                                <FormLabel className='text-[14px] md:text-[14.5px] font-bold'>
                                  Estado
                                </FormLabel>
                                <FormDescription className='text-[14px]'>
                                  Selecciona el estado del registro.
                                </FormDescription>
                                <Select
                                  disabled={isInputDisabled}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <FormControl className='text-[13px] md:text-[14px]'>
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
                                {form.getValues('recordStatus') === 'active' && (
                                  <FormDescription className='pl-2 text-[12px] xl:text-[13px] font-bold'>
                                    *El registro esta <span className='text-green-500'>Activo</span>
                                    , para colocarlo como{' '}
                                    <span className='text-red-500'>Inactivo</span> debe eliminar el
                                    registro desde la pestaña{' '}
                                    <span className='font-bold text-red-500'>
                                      Eliminar Ingreso de Ofrenda.{' '}
                                    </span>
                                  </FormDescription>
                                )}
                                {form.getValues('recordStatus') === 'inactive' && (
                                  <FormDescription className='pl-2 text-[12px] xl:text-[13px] font-bold'>
                                    * El registro esta{' '}
                                    <span className='text-red-500 '>Inactivo</span>, puede modificar
                                    el estado eligiendo otra opción.
                                  </FormDescription>
                                )}
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name='comments'
                      render={({ field }) => {
                        return (
                          <FormItem className='mt-3'>
                            <FormLabel className='text-[14px] md:text-[14.5px] font-bold flex items-center'>
                              Comentarios
                              <span className='ml-3 inline-block bg-orange-200 text-orange-600 border text-[10px] font-bold uppercase px-2 py-[2px] rounded-full mr-1'>
                                Requerido
                              </span>
                            </FormLabel>
                            {type === OfferingIncomeCreationType.IncomeAdjustment && (
                              <FormDescription>
                                Escribe una breve descripción sobre el ajuste.
                              </FormDescription>
                            )}
                            <FormControl>
                              <Textarea
                                className={cn(comments && 'h-full')}
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
                          <FormItem className='mt-4 md:mt-0'>
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
                                    Arrastre y suelte sus archivos aquí, o haga clic para
                                    seleccionar.
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
                              <span className='font-bold text-[11.5px] md:text-[12.5px] pl-1 md:pl-5 mt-1 flex flex-col'>
                                <span>✅ Máximo 3 archivos.</span>
                                <span>
                                  ✅ El campo se bloqueara al llegar o pasar los 3 archivos.
                                </span>
                              </span>
                            )}
                          </FormItem>
                        );
                      }}
                    />

                    <section className='mt-10'>
                      <div className='flex gap-4 items-center justify-between'>
                        <h2 className='text-[16px] md:text-[18px] font-bold'>Pre-visualización</h2>
                      </div>

                      {/* Accepted files */}
                      <h3 className='text-[14.5px] lg:text-[16px] font-semibold mt-5 border-b pb-3'>
                        Archivos Aceptados
                      </h3>
                      <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 gap-x-5 gap-y-20'>
                        {files.map((file, index) => (
                          <li
                            key={file.name ?? file}
                            className='py-2 flex flex-col relative h-32 rounded-md shadow-md shadow-gray-400 dark:shadow-slate-900 bg-white dark:bg-slate-900 text-slate-900 dark:text-gray-100'
                          >
                            <img
                              src={file.preview ?? file}
                              alt={file.name ?? file}
                              width={100}
                              height={100}
                              onLoad={() => {
                                URL.revokeObjectURL(file.preview ?? file);
                              }}
                              className='h-full w-full object-contain rounded-md'
                            />
                            {file?.name ? (
                              <button
                                type='button'
                                disabled={isDeleteFileButtonDisabled}
                                className='border-none p-0 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 dark:hover:bg-slate-950 hover:bg-white'
                                onClick={() => {
                                  removeFile(file.name);
                                }}
                              >
                                <TiDeleteOutline className='w-8 h-8 p-0  rounded-full fill-red-500 dark:hover:bg-white hover:bg-slate-200' />
                              </button>
                            ) : (
                              <DestroyImageButton
                                fileType={OfferingFileType.Income}
                                isDeleteFileButtonDisabled={isDeleteFileButtonDisabled}
                                secureUrl={file as any}
                                removeCloudFile={removeCloudFile}
                              />
                            )}

                            <p className='mt-4 text-center text-slate-500 text-[11px] md:text-[12px] font-medium'>
                              <a href={file as any} target='_blank' rel='noreferrer'>
                                {file.name ??
                                  (file as any)
                                    .split('/')
                                    .slice(0, 3)
                                    .join('/')
                                    .replace('cloudinary.com', `cloudinary-image-${index + 1}.com`)}
                              </a>
                            </p>
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
                              <p className='mt-2 text-neutral-500 text-sm font-medium'>
                                {file.name}
                              </p>
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
                            setIsDeleteFileButtonDisabled(true);
                            setIsSubmitButtonDisabled(true);
                          }
                        }, 100);
                      }}
                    >
                      {uploadImagesMutation?.isPending ? 'Procesando...' : 'Guardar Cambios'}
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
