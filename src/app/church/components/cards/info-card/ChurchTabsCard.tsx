/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { format } from 'date-fns';

import { PopoverDataTabs } from '@/app/church/components';
import { type ChurchResponse } from '@/app/church/interfaces';
import { type WorshipTimes, WorshipTimesNames } from '@/app/church/enums';

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
  data: ChurchResponse | undefined;
}

export const ChurchTabsCard = ({ data }: ChurchTabsCardProps): JSX.Element => {
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
              Información general.
            </CardDescription>
          </CardHeader>

          <CardContent className='grid grid-cols-3 pl-[2rem] sm:pl-[4rem] sm:pr-[5rem] gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5 md:pl-[4.2rem] md:pr-[2.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Nombre</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.churchName}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de Fundación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.foundingDate
                  ? format(new Date(data.foundingDate), 'dd/MM/yyyy')
                  : 'Fecha no disponible'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Anexo</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.isAnexe ? 'Si' : 'No'}
              </CardDescription>
            </div>

            {/* Relaciones */}
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Anexos</Label>
              <div>
                <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                  {data?.anexes?.length}
                </CardDescription>
                <PopoverDataTabs
                  data={data?.anexes}
                  title={'Anexos'}
                  firstValue={'churchName'}
                  secondValue={'urbanSector'}
                />
              </div>
            </div>

            <div className='space-y-1 '>
              <Label className='text-[14px] md:text-[15px]'>Pastores</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.pastors?.length}
              </CardDescription>
              <PopoverDataTabs
                data={data?.pastors}
                title={'Pastores'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Co-Pastores</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.copastors?.length}
              </CardDescription>
              <PopoverDataTabs
                data={data?.copastors}
                title={'Co-Pastores'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Supervisores</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.supervisors?.length}
              </CardDescription>
              <PopoverDataTabs
                data={data?.supervisors}
                title={'Supervisores'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Zonas</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.zones?.length}
              </CardDescription>
              <PopoverDataTabs
                data={data?.zones}
                title={'Zonas'}
                firstValue={'zoneName'}
                secondValue={'urbanSector'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Predicadores</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.preachers?.length}
              </CardDescription>
              <PopoverDataTabs
                data={data?.preachers}
                title={'Predicadores'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Casas Familiares</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.familyHouses?.length}
              </CardDescription>
              <PopoverDataTabs
                data={data?.familyHouses}
                title={'Casas'}
                firstValue={'codeHouse'}
                secondValue={'nameHouse'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Discípulos</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.disciples?.length}
              </CardDescription>
              <PopoverDataTabs
                data={data?.disciples}
                title={'Discípulos'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <div className='space-y-1 col-start-1 col-end-3'>
              <Label className='text-[14px] md:text-[15px]'>Horarios de Culto</Label>
              <div className='px-2 pt-2 text-[14px] md:text-[14.5px]'>
                <ul className='pl-5 flex flex-wrap gap-x-10 gap-y-2 list-disc'>
                  {data?.worshipTimes.map((worshipTime) =>
                    Object.keys(WorshipTimesNames).map(
                      (worshipTimeName) =>
                        worshipTime === worshipTimeName && (
                          <li key={worshipTime}>
                            {WorshipTimesNames[worshipTime as WorshipTimes]}
                          </li>
                        )
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className='space-y-1 row-start-5 row-end-6 col-start-3 col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Iglesia Principal</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirMainChurch
                  ? `${data?.theirMainChurch?.churchName} ${data?.theirMainChurch?.district}`
                  : 'Esta iglesia es la central.'}
              </CardDescription>
            </div>

            <span className='col-start-1 col-end-4 text-[15px] md:text-[16px] font-bold text-yellow-500'>
              Información de registro
            </span>

            <div className='space-y-1 flex justify-between items-center col-start-1 col-end-4 md:grid md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Creado por</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {`${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center md:grid md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de creación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.createdAt
                  ? format(new Date(data?.createdAt), 'dd/MM/yyyy')
                  : 'Fecha no disponible'}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center md:grid md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Actualizado por</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.updatedBy
                  ? `${data?.updatedBy?.firstName} ${data?.updatedBy?.lastName}`
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
                Activo
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
              <Label className='text-[14px] md:text-[15px]'>E-mail</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.email}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Numero Teléfono</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.phoneNumber}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>País</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.country}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Departamento</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.department}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Provincia</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.province}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Distrito</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.district}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Sector Urbano</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.urbanSector}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Dirección</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.address}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Referencia de ubicación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.referenceAddress}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Estado</Label>
              <CardDescription className='px-2 text-green-600 font-bold'>Activo</CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
