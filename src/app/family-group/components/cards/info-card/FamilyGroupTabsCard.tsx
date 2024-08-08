/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { format, addDays } from 'date-fns';

import { getInitialFullNames } from '@/shared/helpers';
import { type FamilyGroupResponse } from '@/app/family-group/interfaces';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

interface FamilyGroupTabsCardProps {
  id: string;
  data: FamilyGroupResponse | undefined;
}

export const FamilyGroupTabsCard = ({ data, id }: FamilyGroupTabsCardProps): JSX.Element => {
  //* Effects
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);

      if (url.pathname === '/family-groups/search-family-groups')
        url.pathname = `/family-groups/search-family-groups/${id}/view`;

      if (url.pathname === '/family-groups/search-family-groups-by-term')
        url.pathname = `/family-groups/search-family-groups-by-term/${id}/view`;

      if (url.pathname === '/family-groups/update-family-group')
        url.pathname = `/family-groups/update-family-group/${id}/view`;

      if (url.pathname === '/family-groups/delete-family-group')
        url.pathname = `/family-groups/delete-family-group/${id}/view`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);

  return (
    <Tabs defaultValue='general-info' className='w-[650px] md:w-[630px]'>
      <TabsList className='grid w-full grid-cols-3 px-auto'>
        <TabsTrigger value='general-info' className='text-[14px] md:text-[15px]'>
          Info. General
        </TabsTrigger>
        <TabsTrigger value='ecclesiastical-info' className='text-[14px] md:text-[15px]'>
          Info. Eclesiástica
        </TabsTrigger>
        <TabsTrigger value='contact-info' className='text-[14px] md:text-[15px]'>
          Contacto
        </TabsTrigger>
      </TabsList>
      <TabsContent value='general-info'>
        <Card className='w-full'>
          <CardHeader className='text-center pb-4 pt-2'>
            <CardTitle className='text-blue-500 text-[23px] md:text-[28px] font-bold -mb-2'>
              Información General
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información general y discípulos.
            </CardDescription>
          </CardHeader>

          <CardContent className='grid grid-cols-3 pl-[2rem] sm:pl-[4rem] sm:pr-[5rem] gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5 md:pl-[6rem] md:pr-[2rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Nombre</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.familyGroupName ?? '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Zona</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirZone?.zoneName ?? '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Código</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.familyGroupCode ?? '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Número</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.familyGroupNumber ?? '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Nro. discípulos</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.disciples?.length ?? '-'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Discípulos</Label>
              <CardDescription className='px-2 pt-2 text-[14px] md:text-[14.5px]'>
                <ul className='pl-5 flex flex-wrap gap-x-10 gap-y-2 list-disc'>
                  {data?.disciples?.length !== undefined && data?.disciples?.length > 0 ? (
                    data?.disciples?.map((disciple) => (
                      <li key={disciple.id}>
                        {getInitialFullNames({
                          firstNames: disciple?.firstName ?? '-',
                          lastNames: disciple?.lastName ?? '-',
                        })}
                      </li>
                    ))
                  ) : (
                    <li className='text-red-500'>No hay miembros en este grupo familiar</li>
                  )}
                </ul>
              </CardDescription>
            </div>

            <span className='col-start-1 col-end-4 text-[15px] md:text-[16px] font-bold text-yellow-500'>
              Información de registro
            </span>

            <div className='space-y-1 flex justify-between items-center col-start-1 col-end-4 md:grid md:col-auto md:row-auto'>
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
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-6 row-end-7 md:grid md:row-start-5 md:row-end-6 md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de creación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.createdAt ? format(new Date(data?.createdAt), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-7 row-end-8 md:grid md:row-auto  md:col-start-1 md:col-end-2'>
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
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-8 row-end-9 md:grid  md:row-auto md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Ultima fecha de actualización</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.updatedAt ? format(new Date(data?.updatedAt), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-9 row-end-10 md:grid md:row-start-5 md:row-end-6 md:col-start-3 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Estado</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px] text-green-600 font-bold'>
                {data?.recordStatus === 'active' ? 'Activo' : 'Inactivo'}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='ecclesiastical-info'>
        <Card>
          <CardHeader className='text-center pb-6 pt-2'>
            <CardTitle className='text-yellow-500 text-[23px] md:text-[28px] font-bold -mb-2'>
              Info. Eclesiástica
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información eclesiástica y relaciones ministeriales.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-2  pl-[2.5rem] sm:pl-[6rem] gap-x-6 gap-y-4 md:gap-x-4 md:gap-y-8 md:pl-[6.5rem] md:pr-[3.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Iglesia</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirChurch
                  ? `${data?.theirChurch?.churchName}`
                  : 'Este grupo familiar no tiene una iglesia asignada.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Pastor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirPastor
                  ? `${data?.theirPastor?.firstName} ${data?.theirPastor?.lastName}`
                  : 'Este grupo familiar no tiene un pastor asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Co-Pastor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirCopastor
                  ? `${data?.theirCopastor?.firstName} ${data?.theirCopastor?.lastName}`
                  : 'Este grupo familiar no tiene un co-pastor asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Supervisor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirSupervisor
                  ? `${data?.theirSupervisor?.firstName} ${data?.theirSupervisor?.lastName}`
                  : 'Este grupo familiar no tiene un supervisor asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Zona</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirZone
                  ? `${data?.theirZone?.zoneName} - ${data?.theirZone?.district}`
                  : 'Este grupo familiar no tiene una zona asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Predicador</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirPreacher
                  ? `${data?.theirPreacher?.firstName} ${data?.theirPreacher?.lastName}`
                  : 'Este grupo familiar no tiene un predicador asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Estado</Label>
              <CardDescription className='px-2 text-green-600 font-bold'>
                {data?.recordStatus === 'active' ? 'Activo' : 'Inactivo'}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='contact-info'>
        <Card>
          <CardHeader className='text-center pb-6 pt-2'>
            <CardTitle className='text-orange-500 text-[23px] md:text-[28px] font-bold -mb-2'>
              Contacto
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información de contacto y ubicación.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-2 pl-[3rem] sm:pl-[7rem] gap-x-8 gap-y-5 md:gap-x-16 md:gap-y-6 md:pl-[7.5rem] md:pr-[1rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>País</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.country ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Departamento</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.province ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Provincia</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.department ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Distrito</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.district ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Sector Urbano</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.urbanSector ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Dirección</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.address ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Referencia</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.referenceAddress ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Estado</Label>
              <CardDescription className='px-2 text-green-600 font-bold'>
                {data?.recordStatus === 'active' ? 'Activo' : 'Inactivo'}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
