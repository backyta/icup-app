import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { HouseInfoItem } from './HouseInfoItem';

export function HousesInfoCard(): JSX.Element {
  return (
    <Card className='w-auto'>
      <CardHeader>
        <CardTitle>Casas Familiares</CardTitle>
        <CardDescription>Resumen de casas familiares</CardDescription>
      </CardHeader>
      <HouseInfoItem></HouseInfoItem>
      <HouseInfoItem></HouseInfoItem>
      <HouseInfoItem></HouseInfoItem>
      <HouseInfoItem></HouseInfoItem>
    </Card>
  );
}

// TODO : Hacer if y pasar la data como props del estado o request del backend
