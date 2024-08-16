/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { format } from 'date-fns';

import {
  OfferingIncomeCreationSubTypeNames,
  OfferingIncomeCreationTypeNames,
} from '@/modules/offering/income/enums';
import { type OfferingIncomeResponse } from '@/modules/offering/income/interfaces';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

import { getInitialFullNames } from '@/shared/helpers';
import { CurrencyTypeNames } from '@/modules/offering/shared/enums';

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

      if (url.pathname === '/offerings/income/search-offerings-income')
        url.pathname = `/offerings/income/search-offerings-income/${id}/view`;

      if (url.pathname === '/offerings/income/search-offerings-income-by-term')
        url.pathname = `/offerings/income/search-offerings-income-by-term/${id}/view`;

      if (url.pathname === '/offerings/income/update-offering-income')
        url.pathname = `/offerings/income/update-offering-income/${id}/view`;

      if (url.pathname === '/offerings/income/delete-offering-income')
        url.pathname = `/offerings/income/delete-offering-income/${id}/view`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);

  return (
    <Tabs defaultValue='general-info' className='w-[650px] md:w-[630px]'>
      <TabsList className='grid w-full px-auto grid-cols-1'>
        <TabsTrigger value='general-info' className='text-[14px] md:text-[15px]'>
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
              Información general del registro de ingreso de la ofrenda.
            </CardDescription>
          </CardHeader>

          <CardContent className='grid grid-cols-3 pl-[3.5rem] sm:pl-[5.3rem] sm:pr-[5rem] gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5 md:pl-[5.8rem] md:pr-[2.5rem]'>
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
            <div className='space-y-1 col-start-2 col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Comentarios</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {!data?.comments ? '-' : data?.comments}
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
            <Label className='col-start-1 col-end-4 text-[15px] md:text-[16px] font-bold text-emerald-500'>
              Pertenecía de la ofrenda
            </Label>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Tipo de Miembro</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.memberType ?? '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Miembro</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.disciple?.firstName
                  ? `${data?.disciple?.firstName} ${data?.disciple?.lastName}`
                  : data?.preacher?.firstName
                    ? `${data?.preacher?.firstName} ${data?.preacher?.lastName}`
                    : data?.supervisor?.firstName
                      ? `${data?.supervisor?.firstName} ${data?.supervisor?.lastName}`
                      : data?.copastor?.firstName
                        ? `${data?.copastor?.firstName} ${data?.copastor?.lastName}`
                        : data?.pastor?.firstName
                          ? `${data?.pastor?.firstName} ${data?.pastor?.lastName}`
                          : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Zona</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.zone?.id ? `${data?.zone?.zoneName} - ${data?.zone?.district}` : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-3'>
              <Label className='text-[14px] md:text-[15px] '>Grupo Familiar</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.familyGroup?.id
                  ? `${data?.familyGroup?.familyGroupName} - ${data?.familyGroup?.urbanSector} (${data?.familyGroup?.familyGroupCode})`
                  : '-'}
              </CardDescription>
            </div>

            <Label className='row-start-7 row-end-8 md:row-auto col-start-1 col-end-4 text-[15px] md:text-[16px] font-bold text-amber-500'>
              Información del registro
            </Label>
            <div className='space-y-1 flex justify-between items-center row-start-8 row-end-9 col-start-1 col-end-4 md:grid md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Creado por</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.createdBy
                  ? getInitialFullNames({
                      firstNames: data?.createdBy?.firstName ?? '-',
                      lastNames: data?.createdBy?.lastName ?? '-',
                    })
                  : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-9 row-end-10 md:grid md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de creación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.createdAt ? format(new Date(data?.createdAt), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-10 row-end-11 md:grid md:row-auto  md:col-start-1 md:col-end-2'>
              <Label className='text-[14px] md:text-[15px]'>Actualizado por</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.updatedBy
                  ? getInitialFullNames({
                      firstNames: data?.updatedBy?.firstName ?? '-',
                      lastNames: data?.updatedBy?.lastName ?? '-',
                    })
                  : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-11 row-end-12 md:grid  md:row-auto md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Ultima fecha de actualización</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.updatedAt ? format(new Date(data?.updatedAt), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-12 row-end-13 md:grid md:row-start-8 md:row-end-9 md:col-start-3 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Estado</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px] text-green-600 font-bold'>
                {data?.recordStatus === 'active' ? 'Activo' : 'Inactivo'}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
