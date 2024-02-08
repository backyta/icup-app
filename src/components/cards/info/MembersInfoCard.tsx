import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { MemberInfoItem } from './MemberInfoItem';

export function MembersInfoCard(): JSX.Element {
  return (
    <Card className='w-auto row-start-3 row-end-4 lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-2 xl:col-start-1 xl:col-end-4 xl:row-start-2 xl:row-end-3 md:h-[38rem]  lg:h-[60rem] lg-lv1:h-[53.5rem] lg-lv2:h-[46rem] xl:h-[50rem] xl-lv1:h-[46rem] xl-lv2:h-[40rem] 2xl:h-[38rem] lg:mt-5 xl:mt-0 md:mt-5'>
      <CardHeader className='xl:p-3 2xl:p-5'>
        <CardTitle className='font-bold text-xl sm:text-[1.45rem] lg:text-[1.50rem] 2xl:text-3xl'>
          Miembros Nuevos
        </CardTitle>
        <CardDescription className='pl-2 text-base'>
          Últimos miembros registrados.
        </CardDescription>
      </CardHeader>
      <MemberInfoItem></MemberInfoItem>
      <MemberInfoItem></MemberInfoItem>
      <MemberInfoItem></MemberInfoItem>
      <MemberInfoItem></MemberInfoItem>
      <MemberInfoItem></MemberInfoItem>
      <MemberInfoItem></MemberInfoItem>
      <MemberInfoItem></MemberInfoItem>
    </Card>
  );
}

// TODO : Hacer if y pasar la data como props del estado o request del backend
