/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';
import { Gender, MaritalStatus, MemberRoles, Status } from '@/shared/enums';

export const formMemberSchema = z
  .object({
    firstName: z.string()
      .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
      .max(40, {message: 'El campo debe contener máximo 40 caracteres'}),

    lastName: z.string()
      .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
      .max(40, {message: 'El campo debe contener máximo 40 caracteres'}),
      
    gender: z.string(z.nativeEnum(Gender, {
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),

    originCountry: z.string()
      .min(1, {message: 'El campo debe contener al menos 1 carácter.'})
      .max(20, {message: 'El campo debe contener máximo 20 caracteres.'}),

    dateBirth: z.date({
      required_error: "Por favor selecciona una fecha.",
    }),

    maritalStatus: z.string( z.nativeEnum(MaritalStatus,{
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),

    numberChildren: z.string().refine(number => {
      return /^\d+$/.test(number);
    }, {
      message: 'El campo debe contener un numero positivo'
    }).refine(number => {
      const parsedNumber = parseInt(number);
      return !isNaN(parsedNumber) && parsedNumber >= 0;
    }, {
      message: 'El campo debe contener un numero positivo'
    }),
    
    conversionDate: z.date({
      required_error: "Por favor selecciona una fecha.",
    }),
    
    emailAddress: z.string().email({ message: "Email invalido." }),

    phoneNumber: z.string().refine(limit => {
      return /^\d+$/.test(limit);
    }, {
      message: 'El campo debe contener un numero'
    }).refine(limit => {
      const parsedLimit = parseInt(limit);
      return !isNaN(parsedLimit) && parsedLimit >= 0;
    }, {
      message: 'El campo debe contener un numero'
    }),
     
    country: z.string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(20, { message: 'El campo debe contener máximo 20 caracteres.' }),

    department: z.string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(20, { message: 'El campo debe contener máximo 20 caracteres.' }),

    province: z.string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(20, { message: 'El campo debe contener máximo 20 caracteres.' }),

    district: z.string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(20, { message: 'El campo debe contener máximo 20 caracteres.' }),
      
    address: z.string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(50, { message: 'El campo debe contener máximo 50 caracteres.' }),

    roles: z.array(z.nativeEnum(MemberRoles),{
      required_error: "Debes seleccionar al menos un rol.",
    }).refine((value) => value.some((item) => item), {
      message: "Debes seleccionar al menos un rol.",
    }),

    theirPastor: z.string().optional(),
    theirCopastor: z.string().optional(),
    theirSupervisor: z.string().optional(),
    theirFamilyHouse: z.string().optional(),

    status: z.string(z.nativeEnum(Status, {
      required_error: "Por favor seleccione una opción.",
    })).optional(),
    
  })
  .refine(
    (data) => {
      if (data.roles.includes(MemberRoles.Copastor) && data.roles.includes(MemberRoles.Disciple)) {
        return !!data.theirPastor; 
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
      if (data.roles.includes(MemberRoles.Supervisor) && data.roles.includes(MemberRoles.Disciple) ) {
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
      if ((data.roles.includes(MemberRoles.Preacher) && data.roles.includes(MemberRoles.Disciple))|| (data.roles.includes(MemberRoles.Preacher) && data.roles.includes(MemberRoles.Disciple) && data.roles.includes(MemberRoles.Treasurer))) {
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
      if (data.roles.includes(MemberRoles.Disciple) && !data.roles.includes(MemberRoles.Pastor) && !data.roles.includes(MemberRoles.Copastor) && !data.roles.includes(MemberRoles.Supervisor)  && !data.roles.includes(MemberRoles.Preacher)){
        return !!data.theirFamilyHouse; 
      }
      return true;
    },
    {
      message: 'Es necesario asignar una Casa Familiar',
      path: ['theirFamilyHouse'],
    }
  )

