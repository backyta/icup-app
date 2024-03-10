import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { HouseInfoItem } from './HouseInfoItem';

// TODO : Hacer if y pasar la data como props del estado o request del backend
export function HousesInfoCard(): JSX.Element {
  return (
    <Card className='w-auto h-auto row-start-4 row-end-5 col-start-1 col-end-2 md:row-end-4 md:col-start-1 md:col-end-3 lg:row-start-4 lg:row-end-5  xl:col-start-4 xl:col-end-7 xl:row-start-2 xl:row-end-3  border-slate-400'>
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
