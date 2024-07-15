/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { format } from 'date-fns';

import { type PastorResponse } from '@/app/pastor/interfaces';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

import { getFullName } from '@/shared/helpers';
import { PopoverDataTabs } from '@/shared/components';

interface PastorTabsCardProps {
  data: PastorResponse | undefined;
}

export const PastorTabsCard = ({ data }: PastorTabsCardProps): JSX.Element => {
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

          <CardContent className='grid grid-cols-3 gap-x-4 gap-y-4 px-4 md:gap-x-6 md:gap-y-5 md:pl-[4.3rem] md:pr-[2.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Nombres</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.firstName}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Apellidos</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.lastName}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>País de Origen</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.originCountry}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de Nacimiento</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.birthDate ? format(new Date(data?.birthDate), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Edad</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.age}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Genero</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.gender}
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de Conversion</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.conversionDate ? format(new Date(data?.conversionDate), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Estado Civil</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.maritalStatus === 'married'
                  ? 'Casado(a)'
                  : data?.maritalStatus === 'single'
                    ? 'Soltero(a)'
                    : data?.maritalStatus === 'widowed'
                      ? 'Viudo(a)'
                      : data?.maritalStatus === 'divorced'
                        ? 'Divorciado(a)'
                        : 'Estado Civil Desconocido'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Numero de hijos</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.numberChildren}
              </CardDescription>
            </div>

            {/* Relaciones */}
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Co-Pastores</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.copastors?.length}
              </CardDescription>
              <PopoverDataTabs
                data={data?.copastors}
                title={'Co-Pastores'}
                nameModule={'Pastor'}
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
                nameModule={'Pastor'}
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
                nameModule={'Pastor'}
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
                nameModule={'Pastor'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Grupos Familiares</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.familyGroups?.length}
              </CardDescription>
              <PopoverDataTabs
                data={data?.familyGroups}
                title={'Grupos'}
                nameModule={'Pastor'}
                firstValue={'familyGroupCode'}
                secondValue={'familyGroupName'}
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
                nameModule={'Pastor'}
                firstValue={'firstName'}
                secondValue={'lastName'}
              />
            </div>

            <span className='col-start-1 col-end-4 row-start-6 row-end-7 md:row-start-auto md:row-end-auto text-[15px] md:text-[16px] font-bold text-yellow-500'>
              Información de registro
            </span>

            <div className='space-y-1 flex justify-between items-center row-start-7 row-end-8 col-start-1 col-end-4 md:grid md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Creado por</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.createdBy
                  ? getFullName({
                      firstNames: data?.createdBy?.firstName ?? '-',
                      lastNames: data?.createdBy?.lastName ?? '-',
                    })
                  : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-8 row-end-9 md:grid  md:row-start-7 md:row-end-8 md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de creación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.createdAt
                  ? format(new Date(data?.createdAt), 'dd/MM/yyyy')
                  : 'Fecha no disponible'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-9 row-end-10 md:grid md:row-auto  md:col-start-1 md:col-end-2'>
              <Label className='text-[14px] md:text-[15px]'>Actualizado por</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.updatedBy
                  ? getFullName({
                      firstNames: data?.updatedBy?.firstName ?? '-',
                      lastNames: data?.updatedBy?.lastName ?? '-',
                    })
                  : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-10 row-end-11 md:grid  md:row-auto md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Ultima fecha de actualización</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.updatedAt ? format(new Date(data?.updatedAt), 'dd/MM/yyyy') : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-11 row-end-12 md:grid md:row-start-7 md:row-end-8 md:col-start-3 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Estado</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px] text-green-600 font-bold'>
                {data?.status === 'active' ? 'Activo' : 'Inactivo'}
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
          <CardContent className='grid  grid-cols-2 pl-[3.5rem] gap-x-6 gap-y-4 md:gap-x-4 md:gap-y-8 md:pl-[8rem] md:pr-[3.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Roles / Cargos</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.roles.map((rol) => rol.charAt(0).toUpperCase() + rol.slice(1)).join(' - ')}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Iglesia</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.theirChurch
                  ? `${data?.theirChurch?.churchName}`
                  : 'Este pastor no tiene una iglesia asignada.'}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Pastor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'> - </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Copastor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'> - </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Supervisor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'> - </CardDescription>
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
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>-</CardDescription>
            </div>

            <div className='space-y-1'>
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
              Información de Contacto
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información de contacto y ubicación.
            </CardDescription>
          </CardHeader>

          <CardContent className='grid grid-cols-2 pl-[3rem] sm:pl-[6rem] gap-x-8 gap-y-4  md:gap-x-16 md:gap-y-6 md:pl-[6.5rem] md:pr-[2.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Correo Electrónico</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.email}
              </CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Teléfono / Celular</Label>
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
              <CardDescription className='px-2 text-[14px] md:text-[14.5px] text-green-600 font-bold'>
                Activo
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
