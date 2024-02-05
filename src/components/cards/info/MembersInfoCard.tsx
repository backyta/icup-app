import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { MemberInfoItem } from './MemberInfoItem';

export function MembersInfoCard(): JSX.Element {
  return (
    <Card className='w-auto h-full'>
      <CardHeader>
        <CardTitle>Miembros Nuevos</CardTitle>
        <CardDescription>Últimos miembros registrados.</CardDescription>
      </CardHeader>
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
