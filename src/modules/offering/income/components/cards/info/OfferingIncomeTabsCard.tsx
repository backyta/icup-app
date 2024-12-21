/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { addDays, format } from 'date-fns';

import { cn } from '@/shared/lib/utils';

import {
  type OfferingIncomeCreationShiftType,
  OfferingIncomeCreationShiftTypeNames,
} from '@/modules/offering/income/enums/offering-income-creation-shift-type.enum';
import { MemberType, MemberTypeNames } from '@/modules/offering/income/enums/member-type.enum';
import { OfferingIncomeCreationTypeNames } from '@/modules/offering/income/enums/offering-income-creation-type.enum';
import { OfferingIncomeCreationSubTypeNames } from '@/modules/offering/income/enums/offering-income-creation-sub-type.enum';
import { OfferingIncomeCreationCategoryNames } from '@/modules/offering/income/enums/offering-income-creation-category.enum';

import { RecordStatus } from '@/shared/enums/record-status.enum';
import { getInitialFullNames } from '@/shared/helpers/get-full-names.helper';
import { type OfferingIncomeResponse } from '@/modules/offering/income/interfaces/offering-income-response.interface';

import { CurrencyTypeNames } from '@/modules/offering/shared/enums/currency-type.enum';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

interface OfferingIncomeTabsCardProps {
  id: string;
  data: OfferingIncomeResponse | undefined;
}

export const OfferingIncomeTabsCard = ({ data, id }: OfferingIncomeTabsCardProps): JSX.Element => {
  //* Effects
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);

      if (url.pathname === '/offerings/income/general-search')
        url.pathname = `/offerings/income/general-search/${id}/view`;

      if (url.pathname === '/offerings/income/search-by-term')
        url.pathname = `/offerings/income/search-by-term/${id}/view`;

      if (url.pathname === '/offerings/income/update')
        url.pathname = `/offerings/income/update/${id}/view`;

      if (url.pathname === '/offerings/income/inactivate')
        url.pathname = `/offerings/income/inactivate/${id}/view`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);

  return (
    <Tabs defaultValue='general-info' className='w-[650px] md:w-[630px]'>
      <TabsList className='grid w-full px-auto grid-cols-1'>
        <TabsTrigger value='general-info' className='text-[14.5px] md:text-[15px]'>
          Información General
        </TabsTrigger>
      </TabsList>
      <TabsContent value='general-info'>
        <Card className='w-full'>
          <CardHeader className='text-center pb-4 pt-2'>
            <CardTitle className='text-blue-500 text-[23px] md:text-[28px] font-bold -mb-2'>
              Información General
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información general del registro de ingreso.
            </CardDescription>
          </CardHeader>

          <CardContent className='grid grid-cols-3 pl-[1.5rem] pr-[1.5rem] pb-5 sm:pl-[5.3rem] sm:pr-[5rem] gap-x-4 gap-y-2.5 md:gap-x-6 md:gap-y-4 md:pl-[5.8rem] md:pr-[2.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Tipo</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {Object.entries(OfferingIncomeCreationTypeNames).find(
                  ([key]) => key === data?.type
                )?.[1] ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Sub-tipo</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {Object.entries(OfferingIncomeCreationSubTypeNames).find(
                  ([key]) => key === data?.subType
                )?.[1] ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Categoría</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {Object.entries(OfferingIncomeCreationCategoryNames).find(
                  ([key]) => key === data?.category
                )?.[1] ?? '-'}
              </CardDescription>
            </div>

            {data?.shift && (
              <div className='space-y-1'>
                <Label className='text-[14px] md:text-[15px]'>Turno</Label>
                <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                  {data?.shift
                    ? OfferingIncomeCreationShiftTypeNames[
                        data?.shift as OfferingIncomeCreationShiftType
                      ]
                    : '-'}
                </CardDescription>
              </div>
            )}

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Monto</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.amount ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Divisa</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {Object.entries(CurrencyTypeNames).find(([key]) => key === data?.currency)?.[1] ??
                  '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de deposito</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.date ? format(new Date(addDays(data?.date, 1)), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 row-start-4'>
              <Label className='text-[14px] md:text-[15px]'>Detalles / Observaciones</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px] overflow-hidden text-ellipsis'>
                {!data?.comments
                  ? '-'
                  : data?.comments.split('\n').map((line, index) => (
                      <p key={index} className='whitespace-pre-wrap'>
                        {line}
                      </p>
                    ))}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Archivos multimedia</Label>
              <div className='px-2 text-green-600 w-full overflow-x-auto'>
                <ul className='pl-5 flex justify-between gap-x-10 gap-y-2 list-disc w-fit'>
                  {data?.imageUrls?.length !== undefined && data?.imageUrls?.length > 0 ? (
                    data?.imageUrls?.map((image, index) => (
                      <li key={image} className='w-full'>
                        <a
                          className='block text-green-600 max-w-[40vw] overflow-hidden text-ellipsis whitespace-nowrap'
                          href={image}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Imagen N°{index + 1}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className='text-red-500'>No hay imágenes adjuntadas.</li>
                  )}
                </ul>
              </div>
            </div>

            <Label className='md:-mb-3 -mt-2 col-start-1 col-end-4 row-start-auto row-end-auto text-[15px] md:text-[16px] font-bold text-emerald-500'>
              Pertenecía de la ofrenda
            </Label>
            {data?.church?.id && (
              <div className='row-start-auto row-end-auto col-start-1 col-end-4 space-y-1'>
                <Label className='text-[14px] md:text-[15px]'>Iglesia</Label>
                <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                  {data?.church?.id
                    ? `${data?.church?.abbreviatedChurchName} - ${data?.church?.district}`
                    : '-'}
                </CardDescription>
              </div>
            )}

            {data?.externalDonor?.id && (
              <div className='row-start-auto row-end-auto col-start-1 col-end-4 space-y-1'>
                <Label className='text-[14px] md:text-[15px]'>Datos del donante</Label>
                <CardDescription className='text-[13px] font-bold'>
                  (Nombres y apellidos, País de origen, País de residencia, Ciudad de residencia)
                </CardDescription>
                <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                  {data?.externalDonor?.id
                    ? `${data?.externalDonor?.firstNames} ${data?.externalDonor?.lastNames} ~ ${data?.externalDonor?.originCountry ?? 'S/N'} ~ ${data?.externalDonor?.residenceCountry ?? 'S/N'} ~ ${data?.externalDonor?.residenceCity ?? 'S/N'}`
                    : '-'}
                </CardDescription>
              </div>
            )}

            {data?.memberType && data?.memberType !== MemberType.ExternalDonor && (
              <>
                <div className='col-start-1 col-end-2 row-start-auto row-end-auto space-y-1'>
                  <Label className='text-[14px] md:text-[15px]'>Tipo de Miembro</Label>
                  <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                    {data?.memberType ? MemberTypeNames[data?.memberType as MemberType] : '-'}
                  </CardDescription>
                </div>
                <div className='space-y-1 row-start-auto row-end-auto col-start-2 col-end-4'>
                  <Label className='text-[14px] md:text-[15px]'>Miembro</Label>
                  <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                    {data?.disciple?.firstNames
                      ? `${data?.disciple?.firstNames} ${data?.disciple?.lastNames}`
                      : data?.preacher?.firstNames
                        ? `${data?.preacher?.firstNames} ${data?.preacher?.lastNames}`
                        : data?.supervisor?.firstNames
                          ? `${data?.supervisor?.firstNames} ${data?.supervisor?.lastNames}`
                          : data?.copastor?.firstNames
                            ? `${data?.copastor?.firstNames} ${data?.copastor?.lastNames}`
                            : data?.pastor?.firstNames
                              ? `${data?.pastor?.firstNames} ${data?.pastor?.lastNames}`
                              : '-'}
                  </CardDescription>
                </div>
              </>
            )}

            {data?.zone?.id && (
              <div className='row-start-auto row-end-auto col-start-1 col-end-4 space-y-1'>
                <Label className='text-[14px] md:text-[15px]'>Zona</Label>
                <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                  {data?.zone?.id ? `${data?.zone?.zoneName} - ${data?.zone?.district}` : '-'}
                </CardDescription>
              </div>
            )}

            {data?.familyGroup?.id && (
              <div className='row-start-auto row-end-auto col-start-1 col-end-4  space-y-1'>
                <Label className='text-[14px] md:text-[15px] '>Grupo Familiar</Label>
                <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                  {data?.familyGroup?.id
                    ? `${data?.familyGroup?.familyGroupName} - ${data?.familyGroup?.urbanSector} (${data?.familyGroup?.familyGroupCode})`
                    : '-'}
                </CardDescription>
              </div>
            )}

            <Label
              className={cn(
                'md:-mb-3 pt-1 md:pt-0 row-start-9 row-end-10 md:row-auto col-start-1 col-end-4 text-[15px] md:text-[16px] font-bold text-amber-500',
                !data?.memberType && !data?.zone?.id && !data?.familyGroup?.id && '-mt-2'
              )}
            >
              Información del registro
            </Label>
            <div className='space-y-1 flex justify-between items-center row-start-10 row-end-11 col-start-1 col-end-4 md:grid md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Creado por</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.createdBy
                  ? getInitialFullNames({
                      firstNames: data?.createdBy?.firstNames ?? '-',
                      lastNames: data?.createdBy?.lastNames ?? '-',
                    })
                  : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-11 row-end-12 md:grid md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de creación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.createdAt ? format(new Date(data?.createdAt), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-span-2  md:grid md:row-start-auto md:row-end-auto md:col-start-3 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Estado</Label>
              <CardDescription
                className={cn(
                  'px-2 text-[14px] md:text-[14.5px] text-green-600 font-bold',
                  data?.recordStatus !== RecordStatus.Active && 'text-red-600'
                )}
              >
                {data?.recordStatus === RecordStatus.Active ? 'Activo' : 'Inactivo'}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-12 row-end-13 md:grid md:row-auto  md:col-start-1 md:col-end-2'>
              <Label className='text-[14px] md:text-[15px]'>Actualizado por</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.updatedBy
                  ? getInitialFullNames({
                      firstNames: data?.updatedBy?.firstNames ?? '-',
                      lastNames: data?.updatedBy?.lastNames ?? '-',
                    })
                  : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-13 row-end-14 md:grid  md:row-auto md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Ultima fecha de actualización</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px] text-right md:text-left'>
                {data?.updatedAt
                  ? `${format(new Date(data?.updatedAt), 'dd/MM/yyyy')} - ${`${format(new Date(data?.updatedAt), 'hh:mm a')}`}`
                  : '-'}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
