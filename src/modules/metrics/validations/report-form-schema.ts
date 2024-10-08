import * as z from 'zod';
import { 
  MetricMemberSearchType, 
  MetricFamilyGroupSearchType, 
  MetricOfferingIncomeSearchType 
} from '@/modules/metrics/enums';

export const memberReportFormSchema = z
.object({
  types: z.array(z.nativeEnum(MetricMemberSearchType),{
    required_error: "Debes seleccionar al menos una opción.",
  }).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos una opción.",
  }),

  church: z.string({required_error: 
  'Por favor asigna una Iglesia.'}),
})

export const familyGroupReportFormSchema = z
.object({
  types: z.array(z.nativeEnum(MetricFamilyGroupSearchType),{
    required_error: "Debes seleccionar al menos una opción.",
  }).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos una opción.",
  }),

  church: z.string({required_error: 
  'Por favor asigna una Iglesia.'}),
})

export const offeringIncomeReportFormSchema = z
.object({
  types: z.array(z.nativeEnum(MetricOfferingIncomeSearchType),{
    required_error: "Debes seleccionar al menos una opción.",
  }).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos una opción.",
  }),

  church: z.string({required_error: 
  'Por favor asigna una Iglesia.'}),
})

