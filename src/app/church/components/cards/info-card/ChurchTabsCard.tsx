/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect } from 'react';

import { format, addDays } from 'date-fns';

import { type ChurchResponse } from '@/app/church/interfaces';
import { type ChurchWorshipTime, ChurchWorshipTimeNames } from '@/app/church/enums';

import { getInitialFullNames } from '@/shared/helpers';
import { PopoverDataCardTabs } from '@/shared/components';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

interface ChurchTabsCardProps {
  id: string;
  data: ChurchResponse | undefined;
}

// TODO : ver los popovers tamanios y el scroll
export const ChurchTabsCard = ({ data, id }: ChurchTabsCardProps): JSX.Element => {
  //* Effects
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);

      if (url.pathname === '/churches/search-churches')
        url.pathname = `/churches/search-churches/${id}/view`;

      if (url.pathname === '/churches/search-churches-by-term')
        url.pathname = `/churches/search-churches-by-term/${id}/view`;

      if (url.pathname === '/churches/update-church')
        url.pathname = `/churches/update-church/${id}/view`;

      if (url.pathname === '/churches/delete-church')
        url.pathname = `/churches/delete-church/${id}/view`;

      window.history.replaceState({}, '', url);
    }

    return () => {
      window.history.replaceState({}, '', originalUrl);
    };
  }, [id]);

  console.log(data?.theirMainChurch);

  return (
    <Tabs defaultValue='general-info' className='w-[650px] md:w-[630px]'>
      <TabsList className='grid w-full grid-cols-2 px-auto'>
        <TabsTrigger value='general-info' className='text-[14px] md:text-[15px]'>
          Info. General
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
              Información general de la iglesia.
            </CardDescription>
          </CardHeader>

          <CardContent className='grid grid-cols-3 pl-[2rem] sm:pl-[4rem] sm:pr-[5rem] gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5 md:pl-[4.2rem] md:pr-[2.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Nombre</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.churchName ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de Fundación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.foundingDate
                  ? format(new Date(addDays(data.foundingDate, 1)), 'dd/MM/yyyy')
                  : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Anexo</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.isAnexe ? 'Si' : 'No' ?? '-'}
              </CardDescription>
            </div>

            {/* Relaciones */}
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Anexos</Label>
              <div>
                <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                  {data?.anexes?.length ?? '-'}
                </CardDescription>
                <PopoverDataCardTabs
                  data={data?.anexes}
                  title={'Anexos'}
                  nameModule={'Iglesia'}
                  firstValue={'churchName'}
                  secondValue={'urbanSector'}
                />
              </div>
            </div>

            <div className='space-y-1 '>
              <Label className='text-[14px] md:text-[15px]'>Pastores</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.pastors?.length ?? '-'}
              </CardDescription>
              <PopoverDataCardTabs
                data={data?.pastors}
                title={'Pastores'}
                nameModule={'Iglesia'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Co-Pastores</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.copastors?.length ?? '-'}
              </CardDescription>
              <PopoverDataCardTabs
                data={data?.copastors}
                title={'Co-Pastores'}
                nameModule={'Iglesia'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Supervisores</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.supervisors?.length ?? '-'}
              </CardDescription>
              <PopoverDataCardTabs
                data={data?.supervisors}
                title={'Supervisores'}
                nameModule={'Iglesia'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Zonas</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.zones?.length ?? '-'}
              </CardDescription>
              <PopoverDataCardTabs
                data={data?.zones}
                title={'Zonas'}
                nameModule={'Iglesia'}
                firstValue={'zoneName'}
                secondValue={'urbanSector'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Predicadores</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.preachers?.length ?? '-'}
              </CardDescription>
              <PopoverDataCardTabs
                data={data?.preachers}
                title={'Predicadores'}
                nameModule={'Iglesia'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Grupos Familiares</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.familyGroups?.length ?? '-'}
              </CardDescription>
              <PopoverDataCardTabs
                data={data?.familyGroups}
                title={'Grupos'}
                nameModule={'Iglesia'}
                firstValue={'familyGroupCode'}
                secondValue={'familyGroupName'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Discípulos</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.disciples?.length ?? '-'}
              </CardDescription>
              <PopoverDataCardTabs
                data={data?.disciples}
                title={'Discípulos'}
                nameModule={'Iglesia'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <div className='space-y-1 col-start-1 col-end-3'>
              <Label className='text-[14px] md:text-[15px]'>Horarios de Culto</Label>
              <div className='px-2 pt-2 text-[14px] md:text-[14.5px]'>
                <ul className='pl-5 flex flex-wrap gap-x-10 gap-y-2 list-disc'>
                  {data?.worshipTimes !== undefined && data?.worshipTimes.length > 0 ? (
                    data?.worshipTimes.map((worshipTime) =>
                      Object.keys(ChurchWorshipTimeNames).map(
                        (worshipTimeName) =>
                          worshipTime === worshipTimeName && (
                            <li key={worshipTime}>
                              {ChurchWorshipTimeNames[worshipTime as ChurchWorshipTime]}
                            </li>
                          )
                      )
                    )
                  ) : (
                    <li className='text-red-500'>No hay horarios de culto disponibles.</li>
                  )}
                </ul>
              </div>
            </div>

            <div className='space-y-1 row-start-5 row-end-6 col-start-3 col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Iglesia Principal</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirMainChurch && data?.isAnexe
                  ? `${data?.theirMainChurch?.churchName ?? 'No tiene'} ${data?.theirMainChurch?.district ?? 'una iglesia principal asignada.'}`
                  : !data?.isAnexe
                    ? `Esta es la iglesia central.`
                    : `Esta iglesia anexo no tiene una iglesia principal asignada.`}
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

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center md:grid md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Ultima fecha de actualización</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.updatedAt ? format(new Date(data?.updatedAt), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center md:grid md:col-start-3 md:col-end-4 md:row-start-7 md:row-end-8'>
              <Label className='text-[14px] md:text-[15px]'>Estado</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px] text-green-600 font-bold'>
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
          <CardContent className='grid grid-cols-2 pl-[3rem] sm:pl-[7rem] gap-x-8 gap-y-5 md:gap-x-16 md:gap-y-6 md:pl-[7rem] md:pr-[1rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>E-mail</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.email ?? '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Numero Teléfono</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.phoneNumber ?? '-'}
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
              <Label className='text-[14px] md:text-[15px]'>Referencia de ubicación</Label>
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
