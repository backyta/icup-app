/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { z } from 'zod';

import { FamilyGroupInactivationReason } from '@/modules/family-group/enums/family-group-inactivation-reason.enum';
import { FamilyGroupInactivationCategory } from '@/modules/family-group/enums/family-group-inactivation-category.enum';

export const familyGroupInactivationFormSchema = z.object({
  familyGroupInactivationCategory: z
    .string(
      z.nativeEnum(FamilyGroupInactivationCategory, {
        required_error: 'Debe seleccionar una opción.',
      })
    )
    .refine((value) => value !== undefined && value.trim() !== '', {
      message: 'Debe seleccionar una opción.',
    }),

  familyGroupInactivationReason: z
    .string(
      z.nativeEnum(FamilyGroupInactivationReason, {
        required_error: 'Debe seleccionar una opción.',
      })
    )
    .refine((value) => value !== undefined && value.trim() !== '', {
      message: 'Debe seleccionar una opción.',
    }),
});
