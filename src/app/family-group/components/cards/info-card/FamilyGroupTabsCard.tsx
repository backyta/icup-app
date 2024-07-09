import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

export const FamilyGroupTabsCard = (): JSX.Element => {
  return (
    <Tabs defaultValue='general-info' className='w-[650px] md:w-[630px]'>
      <TabsList className='grid w-full grid-cols-3 px-auto'>
        <TabsTrigger value='general-info' className='text-[14px] md:text-[15px]'>
          Info. General
        </TabsTrigger>
        <TabsTrigger value='ecclesiastical-info' className='text-[14px] md:text-[15px]'>
          Info. Eclesiástica
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
              Información general y discípulos.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-3 pl-[2rem] sm:pl-[4rem] sm:pr-[5rem] gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5 md:pl-[4.2rem] md:pr-[2.5rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Código</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>A-1</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Zona</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>A</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Numero</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>1</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Nro. discípulos</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>6</CardDescription>
            </div>
            <div className='space-y-1 col-start-2 col-end-4 md:col-auto md:row-auto'>
              <Label className='text-[14px] md:text-[15px]'>Nombre</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Guerreros de Dios
              </CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-4'>
              <Label className='text-[14px] md:text-[15px]'>Discípulos</Label>
              <CardDescription className='px-2 pt-2 text-[14px] md:text-[14.5px]'>
                <ul className='pl-5 flex flex-wrap gap-x-10 gap-y-2 list-disc'>
                  <li>Pedro Lopez</li>
                  <li>Pedro Lopez</li>
                  <li>Pedro Lopez</li>
                  <li>Pedro Lopez</li>
                  <li>Pedro Lopez</li>
                  <li>Pedro Lopez</li>
                  <li>Pedro Lopez</li>
                  <li>Pedro Lopez</li>
                  <li>Pedro Lopez</li>
                </ul>
              </CardDescription>
            </div>

            <span className='col-start-1 col-end-4 text-[15px] md:text-[16px] font-bold text-yellow-500'>
              Información de registro
            </span>

            <div className='space-y-1 flex justify-between items-center col-start-1 col-end-4 md:grid md:col-auto md:row-auto'>
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

      <TabsContent value='ecclesiastical-info'>
        <Card>
          <CardHeader className='text-center pb-6 pt-2'>
            <CardTitle className='text-yellow-500 text-[23px] md:text-[28px] font-bold -mb-2'>
              Info. Eclesiástica
            </CardTitle>
            <CardDescription className='text-[14px] md:text-[15px]'>
              Información eclesiástica y relaciones ministeriales.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-2  pl-[2.5rem] sm:pl-[6rem] gap-x-6 gap-y-4 md:gap-x-4 md:gap-y-8 md:pl-[5.5rem] md:pr-[4rem]'>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Pastor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Rogelio Carlos Valderrama Tolentino
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Copastor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Mercedes Julia Aparcano Saavedra
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Supervisor</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Pamela Grecia Chillon Perez
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Predicador</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Marleny Topa Chillon Perez
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Estado</Label>
              <CardDescription className='px-2 text-green-600 font-bold'>Activo</CardDescription>
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
              <Label className='text-[14px] md:text-[15px]'>País</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>Peru</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Provincia</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>Lima</CardDescription>
            </div>

            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Departamento</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>Lima</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Provincia</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>Lima</CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Distrito</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Independencia
              </CardDescription>
            </div>
            <div className='space-y-1'>
              <Label className='text-[14px] md:text-[15px]'>Estado</Label>
              <CardDescription className='px-2 text-green-600 font-bold'>Activo</CardDescription>
            </div>
            <div className='space-y-1 col-start-1 col-end-3'>
              <Label className='text-[14px] md:text-[15px]'>Dirección</Label>
              <CardDescription className='px-2 text-[14px] md:text-[14.5px]'>
                Jr.Condor 333 - Tahuantinsuyo 4ta zona (Cerca al paradero final)
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
