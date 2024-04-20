import { Label } from '@/shared/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export const UserTabsCard = (): JSX.Element => {
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
          <CardContent className='grid grid-cols-3 pl-[2rem] sm:pl-[4rem] sm:pr-[5rem] gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5 md:pl-[4.2rem] md:pr-[2.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Nombres</Label>
              <CardDescription className='px-2'>Ana Pula</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Apellidos</Label>
              <CardDescription className='px-2'>Carranza Meza</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Correo Electrónico</Label>
              <CardDescription className='px-2'>ana@google.com</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Contraseña</Label>
              <CardDescription className='px-2'>********</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Roles</Label>
              <CardDescription className='px-2'>Super-User</CardDescription>
            </div>

            <Label className='row-start-3 row-end-4 md:row-auto col-start-1 col-end-4 text-[15px] md:text-[16px] font-bold text-yellow-500'>
              Información del registro
            </Label>

            <div className='space-y-1 flex justify-between items-center row-start-4 row-end-5 col-start-1 col-end-4 md:grid md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Creado por</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Rogelio Ramirez Carranza
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-5 row-end-6 md:grid md:row-start-4 md:row-end-5 md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de creación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                12/12/2023
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-6 row-end-7 md:grid md:row-auto  md:col-start-1 md:col-end-2'>
              <Label className='text-[14px] md:text-[15px]'>Actualizado por</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Kevin Jorge Perez Loza
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-7 row-end-8 md:grid  md:row-auto md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Ultima fecha de actualización</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                20/12/2023
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-8 row-end-9 md:grid md:row-start-4 md:row-end-5 md:col-start-3 md:col-end-4'>
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
