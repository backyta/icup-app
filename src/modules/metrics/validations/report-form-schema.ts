import * as z from 'zod';
import { 
  MetricMemberSearchType, 
  MetricFamilyGroupSearchType, 
  MetricOfferingIncomeSearchType, 
  MetricOfferingExpenseSearchType,
  MetricFinancialBalanceComparisonSearchType
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

  year: z.string({required_error: 
    'Por favor elige un año.'}).optional(),
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
  
  year: z.string({required_error: 
    'Por favor elige un año.'}).optional(),
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

  year: z.string({required_error: 
    'Por favor elige un año.'}).optional(),

  startMonth: z.string({required_error: 
    'Por favor elige el mes de inicio.'}).optional(),

  endMonth: z.string({required_error: 
    'Por favor elige el mes de fin.'}).optional(),
})

export const offeringExpenseReportFormSchema = z
.object({
  types: z.array(z.nativeEnum(MetricOfferingExpenseSearchType),{
    required_error: "Debes seleccionar al menos una opción.",
  }).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos una opción.",
  }),

  church: z.string({required_error: 
  'Por favor asigna una Iglesia.'}),

  year: z.string({required_error: 
    'Por favor elige un año.'}).optional(),

  startMonth: z.string({required_error: 
    'Por favor elige el mes de inicio.'}).optional(),

  endMonth: z.string({required_error: 
    'Por favor elige el mes de fin.'}).optional(),
})

export const FinancialBalanceComparativeReportFormSchema = z
.object({
  types: z.array(z.nativeEnum(MetricFinancialBalanceComparisonSearchType),{
    required_error: "Debes seleccionar al menos una opción.",
  }).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos una opción.",
  }),

  church: z.string({required_error: 
  'Por favor asigna una Iglesia.'}),

  currency: z.string({required_error: 
  'Por favor asigna una divisa.'}),

  year: z.string({required_error: 
    'Por favor elige un año.'}).optional(),

  startMonth: z.string({required_error: 
    'Por favor elige el mes de inicio.'}).optional(),

  endMonth: z.string({required_error: 
    'Por favor elige el mes de fin.'}).optional(),
})

