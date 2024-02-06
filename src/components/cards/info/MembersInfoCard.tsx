import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { MemberInfoItem } from './MemberInfoItem';

export function MembersInfoCard(): JSX.Element {
  return (
    <Card className='w-aut md:row-start-3 md:row-end-4 lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-2 xl:col-start-1 xl:col-end-4 xl:row-start-2 xl:row-end-3 custom2-lg:h-[40rem] custom-lg:h-[48rem] lg:h-[52rem] xl:h-[38rem] 2xl:h-[38rem] lg:mt-5 xl:mt-0 md:mt-5'>
      <CardHeader className='p-5'>
        <CardTitle className='text-3xl font-bold'>Miembros Nuevos</CardTitle>
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
