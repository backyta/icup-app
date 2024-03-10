import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// TODO : pasar la data de la consulta aca y que se renderize.
export const TabsCardMember = (): JSX.Element => {
  return (
    <Tabs defaultValue='general-info' className='w-[440px] md:w-[510px] '>
      <TabsList className='grid w-full grid-cols-3 px-auto'>
        <TabsTrigger value='general-info' className='text-[13px] md:text-sm'>
          Info. General
        </TabsTrigger>
        <TabsTrigger
          value='ecclesiastical-info'
          className='text-[13px] md:text-sm'
        >
          Info. Eclesiástica
        </TabsTrigger>
        <TabsTrigger value='contact-info' className='text-[13px] md:text-sm'>
          Contacto
        </TabsTrigger>
      </TabsList>
      <TabsContent value='general-info'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
            <CardDescription>
              Información general y personal del miembro.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-3 gap-x-4 gap-y-5'>
            <div className='space-y-1'>
              <Label>Nombres</Label>
              <CardDescription className='px-2'>Kevin Michael</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Apellidos</Label>
              <CardDescription className='px-2'>Baca Angeles</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>País de Origen</Label>
              <CardDescription className='px-2'>Peru</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Fecha de Nacimiento</Label>
              <CardDescription className='px-2'>25/11/1995</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Edad</Label>
              <CardDescription className='px-2'>28</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Genero</Label>
              <CardDescription className='px-2'>Masculino</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Estado Civil</Label>
              <CardDescription className='px-2'>Soltero</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Numero de hijos</Label>
              <CardDescription className='px-2'>0</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Fecha de Conversion</Label>
              <CardDescription className='px-2'>13/03/2015</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Creado por</Label>
              <CardDescription className='px-2'>
                Rogelio Ramirez Carranza
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Fecha de creación</Label>
              <CardDescription className='px-2'>12/12/2023</CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-2'>
              <Label>Actualizado por</Label>
              <CardDescription className='px-2'>
                Kevin Jorge Perez Loza
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Ultima fecha de actualización</Label>
              <CardDescription className='px-2'>20/12/2023</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Estado</Label>
              <CardDescription className='px-2 text-green-600'>
                Activo
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='ecclesiastical-info'>
        <Card>
          <CardHeader>
            <CardTitle>Info. Eclesiástica</CardTitle>
            <CardDescription>
              Información eclesiástica del miembro.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-6'>
            <div className='space-y-1'>
              <Label>Roles / Cargos</Label>
              <CardDescription className='px-2'>
                Miembro - Predicador
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Pastor</Label>
              <CardDescription className='px-2'>
                Rogelio Carlos Valderrama Tolentino
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Copastor</Label>
              <CardDescription className='px-2'>
                Mercedes Julia Aparcano Saavedra
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Supervisor</Label>
              <CardDescription className='px-2'>
                Pamela Grecia Chillon Perez
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Predicador</Label>
              <CardDescription className='px-2'> - </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Casa Familiar</Label>
              <CardDescription className='px-2'>
                C-2 - Guerreros de Dios
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Estado</Label>
              <CardDescription className='px-2 text-green-600'>
                Activo
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='contact-info'>
        <Card>
          <CardHeader>
            <CardTitle>Contacto</CardTitle>
            <CardDescription>
              Información de contacto del miembro.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-6'>
            <div className='space-y-1'>
              <Label>Correo Electrónico</Label>
              <CardDescription className='px-2'>
                kevin@google.com
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Teléfono / Celular</Label>
              <CardDescription className='px-2'>
                +51 999-999-999
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>País</Label>
              <CardDescription className='px-2'>Peru</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Departamento</Label>
              <CardDescription className='px-2'>Lima</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Provincia</Label>
              <CardDescription className='px-2'>Lima</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Distrito</Label>
              <CardDescription className='px-2'>Independencia</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Dirección</Label>
              <CardDescription className='px-2'>
                Jr.Flores 123 - Payet 90 (Cerca al Parque Manco Capac)
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Estado</Label>
              <CardDescription className='px-2 text-green-600'>
                Activo
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
