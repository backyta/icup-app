import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { HouseInfoItem } from './HouseInfoItem';

export function HousesInfoCard(): JSX.Element {
  return (
    <Card className='bg-slate-200 w-auto row-start-4 row-end-5 col-start-1 col-end-2 lg:row-start-3 md:row-end-4 md:col-start-1 md:col-end-3 xl:col-start-4 xl:col-end-7 xl:row-start-2 xl:row-end-3 md:h-[38rem] xl:h-auto 2xl:h-[38rem] lg:mt-0 xl-lv1:-mt-[5.5rem] xl:-mt-[10.5rem] 2xl:-mt-16 border-slate-400'>
      <CardHeader className='xl:p-3 2xl:p-5'>
        <CardTitle className='font-bold text-xl sm:text-[1.45rem] lg:text-[1.50rem] 2xl:text-3xl'>
          Top Ofrendas - Casas Familiares
        </CardTitle>
        <CardDescription className='pl-2 text-base text-slate-800'>
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
