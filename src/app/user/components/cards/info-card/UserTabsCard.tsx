import { Label } from '@/shared/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

// TODO : ENVIAR la búsqueda del fetch como hijo en objeto y colocar aquí (completo)

export const UserTabsCard = (): JSX.Element => {
  return (
    <Tabs defaultValue='general-info' className='w-[440px] md:w-[510px]'>
      <TabsList className='grid w-full grid-cols-1 px-auto'>
        <TabsTrigger value='general-info' className='text-[13px] md:text-sm'>
          Info. General
        </TabsTrigger>
      </TabsList>
      <TabsContent value='general-info'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
            <CardDescription>Información general del usuario.</CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-y-4 gap-x-10'>
            <div className='space-y-1'>
              <Label>Nombres</Label>
              <CardDescription className='px-2'>Ana Pula</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Apellidos</Label>
              <CardDescription className='px-2'>Carranza Meza</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Correo Electrónico</Label>
              <CardDescription className='px-2'>ana@google.com</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Contraseña</Label>
              <CardDescription className='px-2'>********</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Roles</Label>
              <CardDescription className='px-2'>Super-User</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Estado</Label>
              <CardDescription className='px-2 text-green-600'>Activo</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Creado por</Label>
              <CardDescription className='px-2'>Rogelio Ramirez Carranza</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Fecha de creación</Label>
              <CardDescription className='px-2'>12/12/2023</CardDescription>
            </div>

            <div className='space-y-1 col-start-1 col-end-2'>
              <Label>Actualizado por</Label>
              <CardDescription className='px-2'>Kevin Jorge Perez Loza</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Ultima fecha de actualización</Label>
              <CardDescription className='px-2'>20/12/2023</CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
