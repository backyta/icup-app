/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { format } from 'date-fns';

import { cn } from '@/shared/lib/utils';

import { type UserResponse } from '@/modules/user/interfaces';

import { getInitialFullNames } from '@/shared/helpers';
import { type UserRole, UserRoleNames } from '@/modules/user/enums';
import { type Gender, GenderNames, RecordStatus } from '@/shared/enums';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { useEffect } from 'react';

interface UserTabsCardProps {
  id: string;
  data: UserResponse | undefined;
}

export const UserTabsCard = ({ id, data }: UserTabsCardProps): JSX.Element => {
  //* Effects
  useEffect(() => {
    const originalUrl = window.location.href;

    if (id) {
      const url = new URL(window.location.href);

      if (url.pathname === '/users/general-search')
        url.pathname = `/users/general-search/${id}/view`;

      if (url.pathname === '/users/search-by-term')
        url.pathname = `/users/search-by-term/${id}/view`;

      if (url.pathname === '/users/update') url.pathname = `/users/update/${id}/view`;

      if (url.pathname === '/users/delete') url.pathname = `/users/delete/${id}/view`;

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
          Info. General
        </TabsTrigger>
      </TabsList>
      <TabsContent value='general-info'>
        <Card className='w-full'>
          <CardHeader className='text-center pb-4 pt-2'>
            <CardTitle className='text-blue-500 text-[23px] md:text-[28px] font-bold -mb-2'>
              Información General
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información general del usuario.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-3 pl-[2rem] sm:pl-[4rem] sm:pr-[5rem] gap-x-4 gap-y-2.5 md:gap-x-6 md:gap-y-5 md:pl-[5rem] md:pr-[1rem]'>
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
              <Label className='text-[14px] md:text-[15px]'>Género</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.gender ? GenderNames[data?.gender as Gender] : '-'}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 cold-end-3 row-start-2 row-end-3 md:row-start-auto md:col-start-auto'>
              <Label className='text-[14px] md:text-[15px]'>Correo Electrónico</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.email}
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 row-start-3 row-end-4 md:row-start-2 md:row-end-3 md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Roles</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.roles.map((rol) => UserRoleNames[rol as UserRole]).join(' - ')}
              </CardDescription>
            </div>

            <Label className='pt-2 md:pt-0 row-start-4 row-end-5 md:row-auto col-start-1 col-end-4 text-[15px] md:text-[16px] font-bold text-yellow-500'>
              Información del registro
            </Label>

            <div className='space-y-1 flex justify-between items-center row-start-5 row-end-6 col-start-1 col-end-4 md:grid md:col-auto md:row-auto'>
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

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-6 row-end-7 md:grid md:row-start-4 md:row-end-5 md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de creación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                {data?.createdAt
                  ? format(new Date(data?.createdAt), 'dd/MM/yyyy')
                  : 'Fecha no disponible'}
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
                {data?.updatedAt
                  ? `${format(new Date(data?.updatedAt), 'dd/MM/yyyy')} - ${`${format(new Date(data?.updatedAt), 'hh:mm a')}`}`
                  : '-'}
              </CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-9 row-end-10 md:grid md:row-start-4 md:row-end-5 md:col-start-3 md:col-end-4'>
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
