/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MaritalStatus } from '@/enums/marital-status.enum';
import { MemberRoles } from '@/enums/member-roles.enum';
import * as z from 'zod';


export const formMemberSchema = z
  .object({
    firstName: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(40),
    lastName: z.string().min(1, { message: 
      'El campo debe contener al menos 1 carácter.'}).max(40),
    dateBirth: z.date({
      required_error: "Por favor selecciona una fecha.",
    }),
    gender: z.enum(['male', 'female'], {
      required_error: "Por favor seleccione un genero.",
    }),
    maritalStatus: z.nativeEnum(MaritalStatus,{
      required_error: "Por favor seleccione una opción.",
    }),
    numberChildren: z.string().refine(numberChildren => !isNaN(parseInt(numberChildren)),{
      message: 'La cantidad no es un numero'
    }),
    conversionDate: z.date({
      required_error: "Por favor selecciona una fecha.",
    }),

    emailAddress: z.string().email({ message: "Email invalido." }),
    phoneNumber: z.string().min(1, { message: 
      'El campo debe contener al menos 1 carácter.'}).max(20),
    originCountry: z.string().min(1, { message: 
      'El campo debe contener al menos 1 carácter.'}).max(20),
    department: z.string().min(1, { message: 
      'El campo debe contener al menos 1 carácter.'}).max(20),
    province: z.string().min(1, { message: 
      'El campo debe contener al menos 1 carácter.'}).max(20),
    district: z.string().min(1, { message: 
      'El campo debe contener al menos 1 carácter.'}).max(20),
    address: z.string().min(1, { message: 
      'El campo debe contener al menos 1 carácter.'}).max(50),

    roles: z.array(z.nativeEnum(MemberRoles),{
      required_error: "Tienes que seleccionar al menos un rol.",
    }).refine((value) => value.some((item) => item), {
      message: "Tienes que seleccionar al menos un rol.",
    }),
    theirPastor: z.string().optional(),
    theirCopastor: z.string().optional(),
    theirSupervisor: z.string().optional(),
    theirPreacher: z.string().optional(),
    theirFamilyHouse: z.string().optional(),
  })

  .refine(
    (data) => {
      if (data.roles.includes(MemberRoles.copastor) && data.roles.includes(MemberRoles.member)) {
        return !!data.theirPastor; /* //verifica si hay un valor en theirPastor, y manda tru o false */
      }
      return true;
    },
    {
      message: 'Es necesario asignar un Pastor',
      path: ['theirPastor'],
    }
  )
  .refine(
    (data) => {
      if (data.roles.includes(MemberRoles.supervisor) && data.roles.includes(MemberRoles.member)) {
        return !!data.theirCopastor; 
      }
      return true;
    },
    {
      message: 'Es necesario asignar un Co-Pastor',
      path: ['theirCopastor'],
    }
  )
  .refine(
    (data) => {
      if ((data.roles.includes(MemberRoles.preacher) && data.roles.includes(MemberRoles.member))|| (data.roles.includes(MemberRoles.preacher) && data.roles.includes(MemberRoles.member) && data.roles.includes(MemberRoles.treasurer))) {
        return !!data.theirSupervisor;
      }
      return true;
    },
    {
      message: 'Es necesario asignar un Supervisor',
      path: ['theirSupervisor'],
    }
  )
  .refine(
    (data) => {
      if (data.roles.includes(MemberRoles.member) && !data.roles.includes(MemberRoles.pastor) && !data.roles.includes(MemberRoles.copastor) && !data.roles.includes(MemberRoles.supervisor)  && !data.roles.includes(MemberRoles.preacher)){
        return !!data.theirFamilyHouse; /* //true */
      }
      return true;
    },
    {
      message: 'Es necesario asignar una Casa Familiar',
      path: ['theirFamilyHouse'],
    }
  )

