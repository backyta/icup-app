/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { z } from 'zod';

import { MemberInactivationReason } from '@/shared/enums/member-inactivation-reason.enum';
import { MemberInactivationCategory } from '@/shared/enums/member-inactivation-category.enum';

export const memberInactivationFormSchema = z.object({
  memberInactivationCategory: z
    .string(
      z.nativeEnum(MemberInactivationCategory, {
        required_error: 'Debe seleccionar una opción.',
      })
    )
    .refine((value) => value !== undefined && value.trim() !== '', {
      message: 'Debe seleccionar una opción.',
    }),

  memberInactivationReason: z
    .string(
      z.nativeEnum(MemberInactivationReason, {
        required_error: 'Debe seleccionar una opción.',
      })
    )
    .refine((value) => value !== undefined && value.trim() !== '', {
      message: 'Debe seleccionar una opción.',
    }),
});
