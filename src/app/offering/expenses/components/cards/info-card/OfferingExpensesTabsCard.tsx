import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

// NOTE : ENVIAR la búsqueda del fetch como hijo en objeto y colocar aquí (completo)
// NOTE : borrar la pertenencia en blanco si es diezmo solo el miembro, si es ayuno zonal el copastor y su letra de zona.

// NOTE : se puede anidir otra pestaña con archivos multimedia
export const OfferingExpensesTabsCard = (): JSX.Element => {
  return (
    <Tabs defaultValue='general-info' className='w-[650px] md:w-[630px]'>
      <TabsList className='grid w-full px-auto grid-cols-1'>
        <TabsTrigger value='general-info' className='text-[14px] md:text-[15px]'>
          Información General
        </TabsTrigger>
      </TabsList>
      <TabsContent value='general-info'>
        <Card className='w-full'>
          <CardHeader className='text-center pb-4 pt-2'>
            <CardTitle className='text-blue-500 text-[23px] md:text-[28px] font-bold -mb-2'>
              Información General
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información general del registro de la salida de ofrenda.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-3 pl-[2rem] sm:pl-[4rem] sm:pr-[5rem] gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5 md:pl-[4.2rem] md:pr-[2.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Tipo</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Diezmo
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Sub-tipo</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'> - </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Monto</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>50</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Divisa</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>Soles</CardDescription>
            </div>
            <div className='space-y-1 col-start-2 col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Comentarios</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Comentarios acerca de la ofrenda son ....
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Archivos multimedia</Label>
              <CardDescription className='px-2 text-green-600'>
                http://image1.jpg - http://image2.jpg - http://image3.jpg
              </CardDescription>
            </div>

            <Label className='row-start-4 row-end-5 md:row-auto col-start-1 col-end-4 text-[15px] md:text-[16px] font-bold text-amber-500'>
              Información del registro
            </Label>

            <div className='space-y-1 flex justify-between items-center row-start-5 row-end-6 col-start-1 col-end-4 md:grid md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Creado por</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Rogelio Ramirez Carranza
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-6 row-end-7 md:grid md:row-start-5 md:row-end-6 md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Fecha de creación</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                12/12/2023
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-7 row-end-8 md:grid md:row-auto  md:col-start-1 md:col-end-2'>
              <Label className='text-[14px] md:text-[15px]'>Actualizado por</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Kevin Jorge Perez Loza
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-8 row-end-9 md:grid  md:row-auto md:col-start-2 md:col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Ultima fecha de actualización</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                20/12/2023
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4 flex justify-between items-center row-start-9 row-end-10 md:grid md:row-start-5 md:row-end-6 md:col-start-3 md:col-end-4'>
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
