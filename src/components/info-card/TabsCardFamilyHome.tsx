import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// TODO : ENVIAR la busqueda del fetch como hijo en objeto y colocar aqui (completo)
export const TabsCardFamilyHome = (): JSX.Element => {
  return (
    <Tabs defaultValue='general-info' className='w-[400px] md:w-[415px] '>
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
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
            <CardDescription>
              Información general de la casa familiar.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-y-5 gap-x-10'>
            <div className='space-y-1'>
              <Label>Nombre de la casa</Label>
              <CardDescription className='px-2'>
                Guerreros de Dios
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Zona</Label>
              <CardDescription className='px-2'>A</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Numero de casa</Label>
              <CardDescription className='px-2'>1</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Código</Label>
              <CardDescription className='px-2'>A-1</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Cantidad de miembros</Label>
              <CardDescription className='px-2'>6</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Estado</Label>
              <CardDescription className='px-2 text-green-600'>
                Activo
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-3'>
              <Label>Miembros</Label>
              <CardDescription className='px-2 pt-2'>
                <ul className='flex flex-wrap gap-x-10 gap-y-2 list-disc'>
                  <li>Kevin Baca</li>
                  <li>Alberto Baca</li>
                  <li>Roxana Bernal</li>
                  <li>Marleny Chillon</li>
                  <li>Yesica Bernal</li>
                  <li>Shandy Ayala</li>
                  <li>Ashlie Ayala</li>
                  <li>Linda Chillon</li>
                  <li>Pamela Chillon</li>
                </ul>
              </CardDescription>
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
              <CardDescription className='px-2'>
                Marleny Topa Chillon Perez
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
              Información de contacto de la casa familiar.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <Label>País</Label>
              <CardDescription className='px-2'>Peru</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Provincia</Label>
              <CardDescription className='px-2'>Lima</CardDescription>
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
                Jr.Condor 333 - Tahuantinsuyo 4ta zona (Cerca al paradero final)
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
