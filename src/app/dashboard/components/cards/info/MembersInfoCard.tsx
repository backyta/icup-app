import { MemberInfoItem } from '@/app/dashboard/components';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

export function MembersInfoCard(): JSX.Element {
  return (
    <Card className='h-auto w-auto row-start-3 row-end-4 col-start-1 col-end-2 md:row-start-3 md:row-end-4 md:col-start-1 lg:row-start-3 lg:row-end-4 md:col-end-3 xl:col-start-1 xl:col-end-4 xl:row-start-2 xl:row-end-3 border-slate-400'>
      <CardHeader className='xl:p-3 2xl:p-5'>
        <CardTitle className='font-bold text-xl sm:text-[1.45rem] lg:text-[1.50rem] 2xl:text-3xl'>
          Miembros Nuevos
        </CardTitle>
        <CardDescription className='pl-2 text-base'>Últimos miembros registrados.</CardDescription>
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
