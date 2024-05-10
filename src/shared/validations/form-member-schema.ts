/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';
import { 
  Country, 
  Department, 
  District, 
  Gender,
  MaritalStatus, 
  MemberRole, 
  Province, 
  Status, 
  UrbanSector 
} from '@/shared/enums';

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
     
    country: z.string(z.nativeEnum(Country, {
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),

    department: z.string(z.nativeEnum(Department, {
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),

    province: z.string(z.nativeEnum(Province, {
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),

    district: z.string(z.nativeEnum(District, {
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),

    urbanSector: z.string(z.nativeEnum(UrbanSector, {
      required_error: "Por favor seleccione una opción válida.",
    })).refine((value) => value !== undefined && value.trim() !== '',
      { message: "Por favor seleccione una opción válida." }
    ),
      
    address: z.string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(50, { message: 'El campo debe contener máximo 50 caracteres.' }),

    referenceComments: z.string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(100, { message: 'El campo debe contener máximo 50 caracteres.' }),

    roles: z.array(z.nativeEnum(MemberRole),{
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
      if (data.roles.includes(MemberRole.Copastor) && data.roles.includes(MemberRole.Disciple)) {
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
      if (data.roles.includes(MemberRole.Supervisor) && data.roles.includes(MemberRole.Disciple) ) {
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
      if ((data.roles.includes(MemberRole.Preacher) && data.roles.includes(MemberRole.Disciple))|| (data.roles.includes(MemberRole.Preacher) && data.roles.includes(MemberRole.Disciple) && data.roles.includes(MemberRole.Treasurer))) {
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
      if (data.roles.includes(MemberRole.Disciple) && !data.roles.includes(MemberRole.Pastor) && !data.roles.includes(MemberRole.Copastor) && !data.roles.includes(MemberRole.Supervisor)  && !data.roles.includes(MemberRole.Preacher)){
        return !!data.theirFamilyHouse; 
      }
      return true;
    },
    {
      message: 'Es necesario asignar una Casa Familiar',
      path: ['theirFamilyHouse'],
    }
  )

