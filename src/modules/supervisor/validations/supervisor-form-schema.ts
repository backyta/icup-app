/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { Gender } from '@/shared/enums/gender.enum';
import { Country } from '@/shared/enums/country.enum';
import { Province } from '@/shared/enums/province.enum';
import { District } from '@/shared/enums/district.enum';
import { Department } from '@/shared/enums/department.enum';
import { MemberRole } from '@/shared/enums/member-role.enum';
import { UrbanSector } from '@/shared/enums/urban-sector.enum';
import { RecordStatus } from '@/shared/enums/record-status.enum';
import { MaritalStatus } from '@/shared/enums/marital-status.enum';

export const supervisorFormSchema = z
  .object({
    firstNames: z
      .string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(40, { message: 'El campo debe contener máximo 40 caracteres' }),

    lastNames: z
      .string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(40, { message: 'El campo debe contener máximo 40 caracteres' }),

    gender: z
      .string(
        z.nativeEnum(Gender, {
          required_error: 'El género es requerido.',
        })
      )
      .refine((value) => value !== undefined && value.trim() !== '', {
        message: 'El género es requerido.',
      }),

    originCountry: z
      .string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(20, { message: 'El campo debe contener máximo 20 caracteres.' }),

    birthDate: z.date({
      required_error: 'La fecha de nacimiento es requerida.',
    }),

    maritalStatus: z
      .string(
        z.nativeEnum(MaritalStatus, {
          required_error: 'El estado civil es requerido.',
        })
      )
      .refine((value) => value !== undefined && value.trim() !== '', {
        message: 'El estado civil es requerido.',
      }),

    numberChildren: z
      .string()
      .refine(
        (number) => {
          return /^\d+$/.test(number);
        },
        {
          message: 'El campo debe contener un número >= 0.',
        }
      )
      .refine(
        (number) => {
          const parsedNumber = parseInt(number);
          return !isNaN(parsedNumber) && parsedNumber >= 0;
        },
        {
          message: 'El campo debe contener un número >= 0.',
        }
      ),

    conversionDate: z.date({
      required_error: 'La fecha de conversión es requerida.',
    }),

    //* Contact Info and status
    email: z.preprocess(
      (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
      z.string().email({ message: 'E-mail inválido.' }).optional()
    ),

    phoneNumber: z.preprocess(
      (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
      z
        .string()
        .min(1, { message: 'El campo debe tener al menos 1 dígito.' })
        .max(20, { message: 'El campo debe tener un máximo de 20 dígitos.' })
        .refine((value) => /^[0-9+\-\s]+$/.test(value), {
          message: 'El campo solo debe contener números, "+", "-" y espacios.',
        })
        .optional()
    ),

    residenceCountry: z
      .string(
        z.nativeEnum(Country, {
          required_error: 'El país es requerido.',
        })
      )
      .refine((value) => value !== undefined && value.trim() !== '', {
        message: 'El país es requerido.',
      }),

    residenceDepartment: z
      .string(
        z.nativeEnum(Department, {
          required_error: 'El departamento es requerido.',
        })
      )
      .refine((value) => value !== undefined && value.trim() !== '', {
        message: 'El departamento es requerido.',
      }),

    residenceProvince: z
      .string(
        z.nativeEnum(Province, {
          required_error: 'Debe seleccionar una opción.',
        })
      )
      .refine((value) => value !== undefined && value.trim() !== '', {
        message: 'Debe seleccionar una opción.',
      }),

    residenceDistrict: z
      .string(
        z.nativeEnum(District, {
          required_error: 'El distrito es requerido.',
        })
      )
      .refine((value) => value !== undefined && value.trim() !== '', {
        message: 'El distrito es requerido.',
      }),

    residenceUrbanSector: z
      .string(
        z.nativeEnum(UrbanSector, {
          required_error: 'El sector urbano es requerido.',
        })
      )
      .refine((value) => value !== undefined && value.trim() !== '', {
        message: 'El sector urbano es requerido.',
      }),

    residenceAddress: z
      .string()
      .min(5, { message: 'El campo debe contener al menos 5 caracteres.' })
      .max(80, { message: 'El campo debe contener máximo 80 caracteres.' }),

    referenceAddress: z
      .string()
      .min(5, { message: 'El campo debe contener al menos 5 carácter.' })
      .max(150, { message: 'El campo debe contener máximo 150 caracteres.' }),

    roles: z
      .array(z.nativeEnum(MemberRole), {
        required_error: 'Debe seleccionar al menos un rol.',
      })
      .refine((value) => value.some((item) => item), {
        message: 'Debe seleccionar al menos un rol.',
      }),

    recordStatus: z
      .string(
        z.nativeEnum(RecordStatus, {
          required_error: 'El estado de registro es requerido.',
        })
      )
      .optional(),

    isDirectRelationToPastor: z.boolean().optional(),

    //* Relations
    theirCopastor: z.string({ required_error: 'Debe asignar un Pastor.' }).optional(),

    theirPastor: z.string({ required_error: 'Debe asignar una Iglesia.' }).optional(),
  })
  .refine(
    (data) => {
      if (
        data.roles.includes(MemberRole.Supervisor) &&
        data.roles.includes(MemberRole.Disciple) &&
        !data.isDirectRelationToPastor
      ) {
        return !!data.theirCopastor;
      }
      return true;
    },
    {
      message: 'Debe asignar un Co-Pastor.',
      path: ['theirCopastor'],
    }
  )
  .refine(
    (data) => {
      if (
        data.roles.includes(MemberRole.Supervisor) &&
        data.roles.includes(MemberRole.Disciple) &&
        data.isDirectRelationToPastor
      ) {
        return !!data.theirPastor;
      }
      return true;
    },
    {
      message: 'Debe asignar un Pastor.',
      path: ['theirPastor'],
    }
  )
  .refine(
    (data) => {
      if (data.roles.includes(MemberRole.Copastor) && data.roles.includes(MemberRole.Disciple)) {
        return !!data.theirPastor;
      }
      return true;
    },
    {
      message: 'Debe asignar un Pastor.',
      path: ['theirPastor'],
    }
  );
