import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Label } from '@/shared/components/ui/label';

// NOTE : ENVIAR la búsqueda del fetch como hijo en objeto y colocar aquí (completo)
// NOTE : borrar la pertenencia en blanco si es diezmo solo el miembro, si es ayuno zonal el copastor y su letra de zona.

export const OfferingTabsCard = (): JSX.Element => {
  return (
    <Tabs defaultValue='general-info' className='w-[440px] md:w-[510px]'>
      <TabsList className='grid w-full grid-cols-1 px-auto'>
        <TabsTrigger value='general-info' className='text-[13px] md:text-sm'>
          Información General
        </TabsTrigger>
      </TabsList>
      <TabsContent value='general-info'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
            <CardDescription>Información general del registro de la ofrenda.</CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-3 gap-y-4 gap-x-6'>
            <div className='space-y-1'>
              <Label>Tipo de ofrenda</Label>
              <CardDescription className='px-2'>Diezmo</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Sub-tipo de ofrenda</Label>
              <CardDescription className='px-2'> - </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Cantidad / Monto</Label>
              <CardDescription className='px-2'>50</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Divisa / Moneda</Label>
              <CardDescription className='px-2'>Soles</CardDescription>
            </div>
            <div className='space-y-1 col-start-2 col-end-4'>
              <Label>Comentarios</Label>
              <CardDescription className='px-2'>
                Comentarios acerca de la ofrenda son ....
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4'>
              <Label>Archivos</Label>
              <CardDescription className='px-2 text-green-600'>
                http://image1.jpg / http://image2.jpg / http://image3.jpg
              </CardDescription>
            </div>
            <Label className='col-start-1 col-end-4 text-[14.5px]'>
              Pertenecía de ofrenda o diezmo
            </Label>
            <div className='space-y-1'>
              <Label>Miembro</Label>
              <CardDescription className='px-2'>Pedro Luis Lopez Carranza</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Copastor</Label>
              <CardDescription className='px-2'> - </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label>Casa Familiar</Label>
              <CardDescription className='px-2'>-</CardDescription>
            </div>

            <div className='space-y-1'>
              <Label>Fecha de creación</Label>
              <CardDescription className='px-2'>12/12/2023</CardDescription>
            </div>
            <div className='space-y-1 col-start-2 col-end-4'>
              <Label>Creado por</Label>
              <CardDescription className='px-2'>Rogelio Ramirez Carranza</CardDescription>
            </div>

            <div className='space-y-1'>
              <Label>Ultima fecha de actualización</Label>
              <CardDescription className='px-2'>20/12/2023</CardDescription>
            </div>
            <div className='space-y-1 col-start-2 col-end-4'>
              <Label>Actualizado por</Label>
              <CardDescription className='px-2'>Kevin Jorge Perez Loza</CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
