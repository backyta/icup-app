/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { addDays, format } from 'date-fns';

import { cn } from '@/shared/lib/utils';

import { type DiscipleResponse } from '@/modules/disciple/interfaces';

import {
  type Gender,
  GenderNames,
  RecordStatus,
  type MemberRole,
  MemberRoleNames,
} from '@/shared/enums';
import { getInitialFullNames } from '@/shared/helpers';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

interface DiscipleTabsCardProps {
  id: string;
  data: DiscipleResponse | undefined;
}

export const DiscipleTabsCard = ({ data, id }: DiscipleTabsCardProps): JSX.Element => {
  //* Effects
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);

      if (url.pathname === '/disciples/general-search')
        url.pathname = `/disciples/general-search/${id}/view`;

      if (url.pathname === '/disciples/search-by-term')
        url.pathname = `/disciples/search-by-term/${id}/view`;

      if (url.pathname === '/disciples/update') url.pathname = `/disciples/update/${id}/view`;

      if (url.pathname === '/disciples/delete') url.pathname = `/disciples/delete/${id}/view`;

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
        <TabsTrigger value='ecclesiastical-info' className='text-[13.5px] md:text-[15px]'>
          Info. Eclesiástica
        </TabsTrigger>
        <TabsTrigger value='contact-info' className='text-[14px] md:text-[15px]'>
          Contacto
        </TabsTrigger>
      </TabsList>

      <TabsContent value='general-info'>
        <Card className='w-full '>
          <CardHeader className='text-center pb-4 pt-2'>
            <CardTitle className='text-blue-500 text-[23px] md:text-[28px] font-bold -mb-2'>
              Información General
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información general y personal.
            </CardDescription>
          </CardHeader>

          <CardContent className='grid grid-cols-3 gap-x-4 gap-y-2.5 px-4 md:gap-x-6 md:gap-y-5 md:pl-[4.3rem] md:pr-[2.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Nombres</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.firstName ?? '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Apellidos</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.lastName ?? '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>País de Origen</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.originCountry ?? '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de Nacimiento</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.birthDate
                  ? format(new Date(addDays(data?.member?.birthDate, 1)), 'dd/MM/yyyy')
                  : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Edad</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.age ?? '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Género</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {GenderNames[data?.member?.gender as Gender] ?? '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de Conversion</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.conversionDate
                  ? format(new Date(addDays(data?.member?.conversionDate, 1)), 'dd/MM/yyyy')
                  : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Estado Civil</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.maritalStatus === 'married'
                  ? 'Casado(a)'
                  : data?.member?.maritalStatus === 'single'
                    ? 'Soltero(a)'
                    : data?.member?.maritalStatus === 'widowed'
                      ? 'Viudo(a)'
                      : data?.member?.maritalStatus === 'divorced'
                        ? 'Divorciado(a)'
                        : 'Estado Civil Desconocido'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Número de hijos</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.numberChildren ?? '-'}
              </CardDescription>
            </div>

            <span className='pt-2 md:pt-0 col-start-1 col-end-4 row-start-4 row-end-5 md:row-start-auto md:row-end-auto text-[15px] md:text-[16px] font-bold text-yellow-500'>
              Información de registro
            </span>

            <div className='space-y-1 flex justify-between items-center row-start-5 row-end-7 col-start-1 col-end-4 md:grid md:col-auto md:row-auto'>
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

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-7 row-end-8 md:grid  md:row-start-5 md:row-end-6 md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de creación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.createdAt ? format(new Date(data?.createdAt), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-8 row-end-9 md:grid md:row-auto  md:col-start-1 md:col-end-2'>
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

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-9 row-end-10 md:grid  md:row-auto md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Ultima fecha de actualización</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.updatedAt
                  ? `${format(new Date(data?.updatedAt), 'dd/MM/yyyy')} - ${`${format(new Date(data?.updatedAt), 'hh:mm a')}`}`
                  : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-10 row-end-11 md:grid md:row-start-5 md:row-end-6 md:col-start-3 md:col-end-4'>
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
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='ecclesiastical-info'>
        <Card>
          <CardHeader className='text-center pb-6 pt-2'>
            <CardTitle className='text-yellow-500 text-[23px] md:text-[28px] font-bold -mb-2'>
              Información Eclesiástica
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información eclesiástica y relaciones ministeriales.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid  grid-cols-2 pl-[3.5rem] gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-8 md:pl-[8rem] md:pr-[3.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Roles / Cargos</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.roles.map((rol) => MemberRoleNames[rol as MemberRole]).join(' - ')}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Iglesia</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirChurch?.id
                  ? `${data?.theirChurch?.abbreviatedChurchName}`
                  : 'Este discípulo no tiene una iglesia asignada.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Pastor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {(data?.theirPastor?.id &&
                  `${data?.theirPastor?.firstName} ${data?.theirPastor?.lastName}`) ??
                  'Este discípulo no tiene un pastor asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Co-Pastor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirCopastor?.id
                  ? `${data?.theirCopastor?.firstName} ${data?.theirCopastor?.lastName}`
                  : 'Este discípulo no tiene un co-pastor asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Supervisor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirSupervisor?.id
                  ? `${data?.theirSupervisor?.firstName} ${data?.theirSupervisor?.lastName}`
                  : 'Este discípulo no tiene un supervisor asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Zona</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirZone?.id
                  ? `${data?.theirZone?.zoneName} - ${data?.theirZone?.district}`
                  : 'Este discípulo no tiene una zona asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Predicador</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirPreacher?.id
                  ? `${data?.theirPreacher?.firstName} ${data?.theirPreacher?.lastName}`
                  : 'Este discípulo no tiene un predicador asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Grupo Familiar</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirFamilyGroup?.id
                  ? `${data?.theirFamilyGroup?.familyGroupName} - ${data?.theirFamilyGroup?.urbanSector}`
                  : 'Este discípulo no tiene un grupo familiar asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
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
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='contact-info'>
        <Card>
          <CardHeader className='text-center pb-6 pt-2'>
            <CardTitle className='text-orange-500 text-[23px] md:text-[28px] font-bold -mb-2'>
              Información de Contacto
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información de contacto y ubicación.
            </CardDescription>
          </CardHeader>

          <CardContent className='grid grid-cols-2 pl-[3rem] sm:pl-[6rem] gap-x-8 gap-y-4  md:gap-x-16 md:gap-y-6 md:pl-[5.5rem] md:pr-[3rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Correo Electrónico</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.email ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Teléfono / Celular</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.phoneNumber ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>País</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.country ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Departamento</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.department ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Provincia</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.province ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Distrito</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.district ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Sector Urbano</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.urbanSector ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Dirección</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.address ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Referencia de ubicación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.member?.referenceAddress ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
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
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
