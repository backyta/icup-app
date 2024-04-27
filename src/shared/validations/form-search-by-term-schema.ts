/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';
import { SubTypesSearch, TypesSearch, UserRoles, RecordOrder } from '@/shared/enums';


export const formSearchByTermSchema = z
  .object({
    type: z.nativeEnum(TypesSearch,{
      required_error: "Por favor seleccione un tipo.",
    }),
    
    subType: z.string(z.nativeEnum(SubTypesSearch ,{
      required_error: "Por favor seleccione una opción.",
    })).optional(),

    termInput: z.string().max(30).optional(),
    termSelect: z.string().max(30).optional(),

    termMultiSelect: z.array(z.nativeEnum(UserRoles),{
      required_error: "Tienes que seleccionar al menos un rol.",
    }).refine((value) => value.some((item) => item), {
      message: "Tienes que seleccionar al menos un rol.",
    }).optional(),

    termDate: z.object({from: z.date(), to: z.date().optional()}, {
      required_error: "Por favor seleccione una fecha.",
    }).optional(),

    termNames: z.string().max(30).optional(),
    termLastNames: z.string().max(30).optional(),

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

    limitAll: z.boolean().optional(),
   
  })
  .refine(
    (data) => {
      if (
        data.type === TypesSearch.FirstName || 
        data.type === TypesSearch.LastName || 
        data.type === TypesSearch.FullName ||
        data.type === TypesSearch.Tithe || 
        data.type === TypesSearch.SundayWorship || 
        data.type === TypesSearch.FamilyHouse || 
        data.type === TypesSearch.ZonalFasting || 
        data.type === TypesSearch.GeneralFasting || 
        data.type === TypesSearch.GeneralVigil ||
        data.type === TypesSearch.ZonalVigil ||
        data.type === TypesSearch.SundaySchool ||
        data.type === TypesSearch.YouthWorship ||
        data.type === TypesSearch.Activities ||
        data.type === TypesSearch.ChurchGround ||
        data.type === TypesSearch.Special 
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
        data.type === TypesSearch.FirstName || 
        data.subType === SubTypesSearch.TitheByNames ||
        data.subType === SubTypesSearch.TitheByDateNames ||
        data.subType === SubTypesSearch.OfferingByPreacherNames ||
        data.subType === SubTypesSearch.OfferingBySupervisorNames ||
        data.subType === SubTypesSearch.OfferingByNames 
      ) {
        return !!data.termNames; 
      }
      return true;
    },
    {
      message: 'El nombre es requerido',
      path: ['termNames'],
    }
  )
  .refine(
    (data) => {
      if (
        data.type === TypesSearch.LastName || 
        data.subType === SubTypesSearch.TitheByLastNames ||
        data.subType === SubTypesSearch.TitheByDateLastNames ||
        data.subType === SubTypesSearch.OfferingByPreacherLastNames ||
        data.subType === SubTypesSearch.OfferingBySupervisorLastNames ||
        data.subType === SubTypesSearch.OfferingByLastNames 
      ) {
        return !!data.termLastNames;
      }
      return true;
    },
    {
      message: 'El apellido es requerido',
      path: ['termLastNames'],
    }
  )
  //* Full name
  .refine(
    (data) => {
      if (
        data.type === TypesSearch.FullName || 
        data.subType === SubTypesSearch.TitheByFullName ||
        data.subType === SubTypesSearch.TitheByDateFullName ||
        data.subType === SubTypesSearch.OfferingByPreacherFullName ||
        data.subType === SubTypesSearch.OfferingBySupervisorFullName ||
        data.subType === SubTypesSearch.OfferingByFullName
      ) {
        return !!data.termLastNames; 
      }
      return true;
    },
    {
      message: 'El nombre es requerido',
      path: ['termLastNames'],
    }
  )
  .refine(
    (data) => {
      if (
        data.type === TypesSearch.FullName || 
        data.subType === SubTypesSearch.TitheByFullName ||
        data.subType === SubTypesSearch.TitheByDateFullName ||
        data.subType === SubTypesSearch.OfferingByPreacherFullName ||  
        data.subType === SubTypesSearch.OfferingBySupervisorFullName ||
        data.subType === SubTypesSearch.OfferingByFullName
      ) {
        return !!data.termNames; 
      }
      return true;
    },
    {
      message: 'El apellido es requerido',
      path: ['termNames'],
    }
  )
  .refine(
    (data) => {
      if (data.type !== TypesSearch.LastName && 
          data.type !== TypesSearch.FirstName && 
          data.type !== TypesSearch.FullName && 
          data.type !== TypesSearch.MonthBirth &&   
          data.type !== TypesSearch.Gender && 
          data.type !== TypesSearch.MaritalStatus && 
          data.type !== TypesSearch.Status && 
          data.type !== TypesSearch.DateBirth && 
          data.type !== TypesSearch.Tithe && 
          data.type !== TypesSearch.SundayWorship && 
          data.type !== TypesSearch.FamilyHouse && 
          data.type !== TypesSearch.ZonalFasting &&
          data.type !== TypesSearch.GeneralFasting && 
          data.type !== TypesSearch.GeneralVigil && 
          data.type !== TypesSearch.ZonalVigil && 
          data.type !== TypesSearch.YouthWorship && 
          data.type !== TypesSearch.SundaySchool && 
          data.type !== TypesSearch.Activities && 
          data.type !== TypesSearch.ChurchGround && 
          data.type !== TypesSearch.Special  && 
          data.type !== TypesSearch.Roles && 
          data.type !== TypesSearch.OperationalExpenses &&
          data.type !== TypesSearch.MaintenanceAndRepairExpenses &&
          data.type !== TypesSearch.DecorationExpenses &&
          data.type !== TypesSearch.EquipmentAndTechnologyExpenses &&
          data.type !== TypesSearch.SuppliesExpenses &&
          data.type !== TypesSearch.ActivitiesAndEventsExpenses || 
          (
            data.subType === SubTypesSearch.OfferingByZone ||
            data.subType === SubTypesSearch.OfferingByDateZone ||
            data.subType === SubTypesSearch.OfferingByCodeHouse ||
            data.subType === SubTypesSearch.OfferingByDateCodeHouse
          )
          ) {
        return !!data.termInput; 
      }
      return true;
    },
    {
      message: 'El termino es requerido',
      path: ['termInput'],
    }
  )
  .refine(
    (data) => {
      if (
        data.type === TypesSearch.MonthBirth ||
        data.type === TypesSearch.Gender ||
          data.type === TypesSearch.MaritalStatus || 
          data.type === TypesSearch.Status ||
          data.subType === SubTypesSearch.OfferingByShift ||
          data.subType === SubTypesSearch.OfferingByDateShift
        ) {
        return !!data.termSelect; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una opción',
      path: ['termSelect'],
    }
  )
  .refine(
    (data) => {
      if ( 
        data.type === TypesSearch.DateBirth || 
        data.subType === SubTypesSearch.TitheByDate ||
        data.subType === SubTypesSearch.TitheByDateNames || 
        data.subType === SubTypesSearch.TitheByDateLastNames || 
        data.subType === SubTypesSearch.TitheByDateFullName ||
        data.subType === SubTypesSearch.OfferingByDate ||
        data.subType === SubTypesSearch.OfferingByDateShift ||
        data.subType === SubTypesSearch.OfferingByZone ||
        data.subType === SubTypesSearch.OfferingByDateZone ||
        data.subType === SubTypesSearch.OfferingByDateCodeHouse ||
        data.type === TypesSearch.OperationalExpenses ||
        data.type === TypesSearch.MaintenanceAndRepairExpenses ||
        data.type === TypesSearch.DecorationExpenses ||
        data.type === TypesSearch.EquipmentAndTechnologyExpenses ||
        data.type === TypesSearch.SuppliesExpenses ||
        data.type === TypesSearch.ActivitiesAndEventsExpenses
        
      ) {
        return !!data.termDate; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una fecha',
      path: ['termDate'],
    }
  )
  .refine(
    (data) => {
      if ( data.type === TypesSearch.Roles) {
        return !!data.termMultiSelect; 
      }
      return true;
    },
    {
      message: 'Por favor seleccione una opción',
      path: ['termMultiSelect'],
    }
  )

  

