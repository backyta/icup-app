/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordOrder } from '@/shared/enums';
import { OfferingExpenseSearchSubType, OfferingExpenseSearchType } from '@/modules/offering/expense/enums';

export const offeringExpenseSearchByTermFormSchema = z
  .object({
    searchType: z.nativeEnum(OfferingExpenseSearchType,{
      required_error: "Por favor seleccione un tipo.",
    }),

    searchSubType: z.union([
      z.nativeEnum(OfferingExpenseSearchSubType),
      z.string().optional().refine(value => value === "", {
        message: 'Debe ser un string vacío o un valor del enum.',
      })
    ]).optional(),
    
    selectTerm: z.string().max(40).optional(),

    dateTerm: z.object({from: z.date(), to: z.date().optional()}, {
      required_error: "Por favor seleccione una fecha.",
    }).optional(),

    limit: z.string().refine(limit => {
      return /^\d+$/.test(limit);
    }, {
      message: 'El límite debe ser un número positivo'
    }).refine(limit => {
      const parsedLimit = parseInt(limit);
      return !isNaN(parsedLimit) && parsedLimit > 0;
    }, {
      message: 'El límite debe ser un número mayor a 0'
    }).optional(),

    order: z.string(z.nativeEnum(RecordOrder, {
      required_error: "Seleccione un orden para al consulta.",
    })),

    all: z.boolean().optional(),
   
  })
  .refine(
    (data) => {
      if (
        data.searchType === OfferingExpenseSearchType.ActivitiesAndEventsExpense || 
        data.searchType === OfferingExpenseSearchType.DecorationExpense || 
        data.searchType === OfferingExpenseSearchType.EquipmentAndTechnologyExpense || 
        data.searchType === OfferingExpenseSearchType.MaintenanceAndRepairExpense || 
        data.searchType === OfferingExpenseSearchType.OperationalExpense || 
        data.searchType === OfferingExpenseSearchType.SuppliesExpense ||
        data.searchType === OfferingExpenseSearchType.ExpenseAdjustment
      ) {
        return !!data.selectTerm;
      }
      return true;
    },
    {
      message: 'Por favor seleccione una opción.',
      path: ['selectTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        data.searchType === OfferingExpenseSearchType.ActivitiesAndEventsExpense || 
        data.searchType === OfferingExpenseSearchType.DecorationExpense || 
        data.searchType === OfferingExpenseSearchType.EquipmentAndTechnologyExpense || 
        data.searchType === OfferingExpenseSearchType.MaintenanceAndRepairExpense || 
        data.searchType === OfferingExpenseSearchType.OperationalExpense || 
        data.searchType === OfferingExpenseSearchType.SuppliesExpense ||
        data.searchType === OfferingExpenseSearchType.ExpenseAdjustment
      ) {
        return !!data.dateTerm; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una fecha.',
      path: ['dateTerm'],
    }
  )
 

  

  

