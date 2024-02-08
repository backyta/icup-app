import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { HouseInfoItem } from './HouseInfoItem';

export function HousesInfoCard(): JSX.Element {
  return (
    <Card className='w-auto row-start-4 row-end-5 lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-3 xl:col-start-4 xl:col-end-7 xl:row-start-2 xl:row-end-3 md:h-[38rem] lg:h-[60rem] lg-lv1:h-[53.5rem] lg-lv2:h-[46rem] xl:h-[50rem] xl-lv2:h-[40rem] xl-lv1:h-[46rem] 2xl:h-[38rem] lg:mt-5 xl:mt-0 md:mt-3'>
      <CardHeader className='xl:p-3 2xl:p-5'>
        <CardTitle className='font-bold text-xl sm:text-[1.45rem] lg:text-[1.50rem] 2xl:text-3xl'>
          Top Ofrendas - Casas Familiares
        </CardTitle>
        <CardDescription className='pl-2 text-base'>
          Top de casas familiares mas dadivosas. (Enero)
        </CardDescription>
      </CardHeader>
      <HouseInfoItem></HouseInfoItem>
      <HouseInfoItem></HouseInfoItem>
      <HouseInfoItem></HouseInfoItem>
      <HouseInfoItem></HouseInfoItem>
      <HouseInfoItem></HouseInfoItem>
    </Card>
  );
}

// TODO : averiguar y ver que son vistas en otro proyectos (Para crear un nuevo usuario formulario)

// TODO : Hacer if y pasar la data como props del estado o request del backend
