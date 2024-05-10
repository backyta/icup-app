/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { UserRoles } from '@/app/user/enums';
import { SearchSubType, SearchType, RecordOrder } from '@/shared/enums';

export const formSearchByTermSchema = z
  .object({
    type: z.nativeEnum(SearchType,{
      required_error: "Por favor seleccione un tipo.",
    }),
    
    subType: z.string(z.nativeEnum(SearchSubType ,{
      required_error: "Por favor seleccione una opción.",
    })).optional(),

    inputTerm: z.string().max(30).optional(),
    selectTerm: z.string().max(30).optional(),

    multiSelectTerm: z.array(z.nativeEnum(UserRoles),{
      required_error: "Tienes que seleccionar al menos un rol.",
    }).refine((value) => value.some((item) => item), {
      message: "Tienes que seleccionar al menos un rol.",
    }).optional(),

    dateTerm: z.object({from: z.date(), to: z.date().optional()}, {
      required_error: "Por favor seleccione una fecha.",
    }).optional(),

    namesTerm: z.string().max(30).optional(),

    lastNamesTerm: z.string().max(30).optional(),

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

    orderRecord: z.string(z.nativeEnum(RecordOrder, {
      required_error: "Seleccione un orden para al consulta.",
    })),

    all: z.boolean().optional(),
   
  })
  .refine(
    (data) => {
      if (
        data.type === SearchType.FirstName || 
        data.type === SearchType.LastName || 
        data.type === SearchType.FullName ||
        data.type === SearchType.Tithe || 
        data.type === SearchType.SundayWorship || 
        data.type === SearchType.FamilyHouse || 
        data.type === SearchType.ZonalFasting || 
        data.type === SearchType.GeneralFasting || 
        data.type === SearchType.GeneralVigil ||
        data.type === SearchType.ZonalVigil ||
        data.type === SearchType.SundaySchool ||
        data.type === SearchType.YouthWorship ||
        data.type === SearchType.UnitedWorship ||
        data.type === SearchType.Activities ||
        data.type === SearchType.ChurchGround ||
        data.type === SearchType.Special ||
        data.type === SearchType.IncomeAdjustment ||
        data.type === SearchType.ExpensesAdjustment
      ) {
        return !!data.subType; 
      }
      return true;
    },
    {
      message: 'El sub-tipo es requerido',
      path: ['subType'],
    }
  )
  .refine(
    (data) => {
      if (
        data.type === SearchType.FirstName || 
        data.subType === SearchSubType.TitheByNames ||
        data.subType === SearchSubType.TitheByDateNames ||
        data.subType === SearchSubType.OfferingByPreacherNames ||
        data.subType === SearchSubType.OfferingBySupervisorNames ||
        data.subType === SearchSubType.OfferingByNames 
      ) {
        return !!data.namesTerm; 
      }
      return true;
    },
    {
      message: 'El nombre es requerido',
      path: ['namesTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        data.type === SearchType.LastName || 
        data.subType === SearchSubType.TitheByLastNames ||
        data.subType === SearchSubType.TitheByDateLastNames ||
        data.subType === SearchSubType.OfferingByPreacherLastNames ||
        data.subType === SearchSubType.OfferingBySupervisorLastNames ||
        data.subType === SearchSubType.OfferingByLastNames 
      ) {
        return !!data.lastNamesTerm;
      }
      return true;
    },
    {
      message: 'El apellido es requerido',
      path: ['lastNamesTerm'],
    }
  )
  //* Full name
  .refine(
    (data) => {
      if (
        data.type === SearchType.FullName || 
        data.subType === SearchSubType.TitheByFullName ||
        data.subType === SearchSubType.TitheByDateFullName ||
        data.subType === SearchSubType.OfferingByPreacherFullName ||
        data.subType === SearchSubType.OfferingBySupervisorFullName ||
        data.subType === SearchSubType.OfferingByFullName
      ) {
        return !!data.lastNamesTerm; 
      }
      return true;
    },
    {
      message: 'El nombre es requerido',
      path: ['lastNamesTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        data.type === SearchType.FullName || 
        data.subType === SearchSubType.TitheByFullName ||
        data.subType === SearchSubType.TitheByDateFullName ||
        data.subType === SearchSubType.OfferingByPreacherFullName ||  
        data.subType === SearchSubType.OfferingBySupervisorFullName ||
        data.subType === SearchSubType.OfferingByFullName
      ) {
        return !!data.namesTerm; 
      }
      return true;
    },
    {
      message: 'El apellido es requerido',
      path: ['namesTerm'],
    }
  )
  .refine(
    (data) => {
      if (data.type !== SearchType.LastName && 
          data.type !== SearchType.FirstName && 
          data.type !== SearchType.FullName && 
          data.type !== SearchType.MonthBirth &&   
          data.type !== SearchType.Gender && 
          data.type !== SearchType.MaritalStatus && 
          data.type !== SearchType.Status && 
          data.type !== SearchType.DateBirth && 
          data.type !== SearchType.Tithe && 
          data.type !== SearchType.SundayWorship && 
          data.type !== SearchType.FamilyHouse && 
          data.type !== SearchType.ZonalFasting &&
          data.type !== SearchType.GeneralFasting && 
          data.type !== SearchType.GeneralVigil && 
          data.type !== SearchType.ZonalVigil && 
          data.type !== SearchType.YouthWorship && 
          data.type !== SearchType.UnitedWorship && 
          data.type !== SearchType.SundaySchool && 
          data.type !== SearchType.Activities && 
          data.type !== SearchType.ChurchGround && 
          data.type !== SearchType.Special  && 
          data.type !== SearchType.IncomeAdjustment  && 
          data.type !== SearchType.Roles && 
          data.type !== SearchType.OperationalExpenses &&
          data.type !== SearchType.MaintenanceAndRepairExpenses &&
          data.type !== SearchType.DecorationExpenses &&
          data.type !== SearchType.EquipmentAndTechnologyExpenses &&
          data.type !== SearchType.SuppliesExpenses &&
          data.type !== SearchType.ActivitiesAndEventsExpenses &&
          data.type !== SearchType.ExpensesAdjustment || 
          (
            data.subType === SearchSubType.OfferingByZone ||
            data.subType === SearchSubType.OfferingByDateZone ||
            data.subType === SearchSubType.OfferingByCodeHouse ||
            data.subType === SearchSubType.OfferingByDateCodeHouse
          )
          ) {
        return !!data.inputTerm; 
      }
      return true;
    },
    {
      message: 'El termino es requerido',
      path: ['inputTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        data.type === SearchType.MonthBirth ||
        data.type === SearchType.Gender ||
          data.type === SearchType.MaritalStatus || 
          data.type === SearchType.Status ||
          data.subType === SearchSubType.OfferingByShift ||
          data.subType === SearchSubType.OfferingByDateShift
        ) {
        return !!data.selectTerm; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una opción',
      path: ['selectTerm'],
    }
  )
  .refine(
    (data) => {
      if ( 
        data.type === SearchType.DateBirth || 
        data.subType === SearchSubType.TitheByDate ||
        data.subType === SearchSubType.TitheByDateNames || 
        data.subType === SearchSubType.TitheByDateLastNames || 
        data.subType === SearchSubType.TitheByDateFullName ||
        data.subType === SearchSubType.OfferingByDate ||
        data.subType === SearchSubType.OfferingByDateShift ||
        data.subType === SearchSubType.OfferingByDateZone ||
        data.subType === SearchSubType.OfferingByDateCodeHouse ||
        data.type === SearchType.OperationalExpenses ||
        data.type === SearchType.MaintenanceAndRepairExpenses ||
        data.type === SearchType.DecorationExpenses ||
        data.type === SearchType.EquipmentAndTechnologyExpenses ||
        data.type === SearchType.SuppliesExpenses ||
        data.type === SearchType.ActivitiesAndEventsExpenses
        
      ) {
        return !!data.dateTerm; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una fecha',
      path: ['dateTerm'],
    }
  )
  .refine(
    (data) => {
      if ( data.type === SearchType.Roles) {
        return !!data.multiSelectTerm; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una opción',
      path: ['multiSelectTerm'],
    }
  )

  

