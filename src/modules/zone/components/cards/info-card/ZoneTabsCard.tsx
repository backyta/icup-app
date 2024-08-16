/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { format } from 'date-fns';

import { type ZoneResponse } from '@/modules/zone/interfaces';

import { getInitialFullNames } from '@/shared/helpers';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { PopoverDataCard } from '@/shared/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

interface ZoneTabsCardProps {
  id: string;
  data: ZoneResponse | undefined;
}

export const ZoneTabsCard = ({ data, id }: ZoneTabsCardProps): JSX.Element => {
  //* Effects
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);

      if (url.pathname === '/zones/search-zones') url.pathname = `/zones/search-zones/${id}/view`;

      if (url.pathname === '/zones/search-zones-by-term')
        url.pathname = `/zones/search-zones-by-term/${id}/view`;

      if (url.pathname === '/zones/update-zone') url.pathname = `/zones/update-zone/${id}/view`;

      if (url.pathname === '/zones/delete-zone') url.pathname = `/zones/delete-zone/${id}/view`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);

  return (
    <Tabs defaultValue='general-info' className='w-[650px] md:w-[630px]'>
      <TabsList className='grid w-full grid-cols-2 px-auto'>
        <TabsTrigger value='general-info' className='text-[14px] md:text-[15px]'>
          Info. General
        </TabsTrigger>
        <TabsTrigger value='ecclesiastical-info' className='text-[13.5px] md:text-[15px]'>
          Info. Eclesiástica
        </TabsTrigger>
      </TabsList>

      <TabsContent value='general-info'>
        <Card className='w-full'>
          <CardHeader className='text-center pb-4 pt-2'>
            <CardTitle className='text-blue-500 text-[23px] md:text-[28px] font-bold -mb-2'>
              Información General
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información general de la zona.
            </CardDescription>
          </CardHeader>

          <CardContent className='grid grid-cols-3 pl-[2rem] sm:pl-[4rem] sm:pr-[5rem] gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5 md:pl-[4.2rem] md:pr-[2.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Nombre</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.zoneName ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>País</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.country ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Departamento</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.department ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Provincia</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.province ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Distrito</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.district ?? '-'}
              </CardDescription>
            </div>

            {/* Relaciones */}

            <div className='space-y-1 col-start-1 col-end-2'>
              <Label className='text-[14px] md:text-[15px]'>Predicadores</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.preachers?.length ?? '-'}
              </CardDescription>
              <PopoverDataCard
                data={data?.preachers}
                title={'Predicadores'}
                nameModule={'Supervisor'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Grupos Familiares</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.familyGroups?.length ?? '-'}
              </CardDescription>
              <PopoverDataCard
                data={data?.familyGroups}
                title={'Grupos'}
                nameModule={'Supervisor'}
                firstValue={'familyGroupCode'}
                secondValue={'familyGroupHouse'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Discípulos</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.disciples?.length ?? '-'}
              </CardDescription>
              <PopoverDataCard
                data={data?.disciples}
                title={'Discípulos'}
                nameModule={'Supervisor'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
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

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center md:grid md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de creación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.createdAt ? format(new Date(data?.createdAt), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center md:grid md:col-auto md:row-auto'>
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

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center md:grid  md:col-start-2 md:col-end-4 md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Ultima fecha de actualización</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.updatedAt ? format(new Date(data?.updatedAt), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center md:grid md:col-start-3 md:col-end-4 md:row-start-5 md:row-end-6'>
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
              Información Eclesiástica
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información eclesiástica y relaciones ministeriales.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid  grid-cols-2 pl-[3.5rem] gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-8 md:pl-[5.5rem] md:pr-[2.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Iglesia</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirChurch?.id
                  ? `${data?.theirChurch?.churchName}`
                  : 'Esta zona no tiene una iglesia asignada.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Pastor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirPastor?.id
                  ? `${data?.theirPastor?.firstName} ${data?.theirPastor?.lastName}`
                  : 'Esta zona no tiene un pastor asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Copastor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirCopastor?.id
                  ? `${data?.theirCopastor?.firstName} ${data?.theirCopastor?.lastName}`
                  : 'Esta zona no tiene un co-pastor asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Supervisor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirSupervisor?.id
                  ? `${data?.theirSupervisor?.firstName} ${data?.theirSupervisor?.lastName}`
                  : 'La zona no tiene un supervisor asignado.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Zona</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'> - </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Predicador</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'> - </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Grupo Familiar</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'> - </CardDescription>
            </div>

            <div className='space-y-1'>
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
