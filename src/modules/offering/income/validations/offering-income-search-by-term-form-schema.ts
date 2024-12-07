/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordOrder } from '@/shared/enums';
import { OfferingIncomeSearchSubType, OfferingIncomeSearchType } from '@/modules/offering/income/enums';

export const offeringIncomeSearchByTermFormSchema = z
  .object({
    searchType: z.nativeEnum(OfferingIncomeSearchType,{
      required_error: "Por favor seleccione un tipo.",
    }),

    searchSubType: z.nativeEnum(OfferingIncomeSearchSubType ,{
      message: 'Por favor seleccione una opción.',
      required_error: "Por favor seleccione una opción.",
    }).optional(),
    
    inputTerm: z.string().max(30).optional(),
    selectTerm: z.string().max(40).optional(),

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

    order: z.string(z.nativeEnum(RecordOrder, {
      required_error: "Seleccione un orden para al consulta.",
    })),

    churchId: z.string().max(40).optional(),

    all: z.boolean().optional(),
   
  })
  .refine(
    (data) => {
      if (
        data.searchType === OfferingIncomeSearchType.Activities || 
        data.searchType === OfferingIncomeSearchType.ChurchGround || 
        data.searchType === OfferingIncomeSearchType.FamilyGroup || 
        data.searchType === OfferingIncomeSearchType.GeneralFasting || 
        data.searchType === OfferingIncomeSearchType.GeneralVigil || 
        data.searchType === OfferingIncomeSearchType.IncomeAdjustment || 
        data.searchType === OfferingIncomeSearchType.Special || 
        data.searchType === OfferingIncomeSearchType.SundaySchool || 
        data.searchType === OfferingIncomeSearchType.SundayService || 
        data.searchType === OfferingIncomeSearchType.UnitedService ||
        data.searchType === OfferingIncomeSearchType.YouthService ||
        data.searchType === OfferingIncomeSearchType.ZonalFasting ||
        data.searchType === OfferingIncomeSearchType.ZonalVigil
      ) {
        return !!data.searchSubType; 
      }
      return true;
    },
    {
      message: 'El sub-tipo es requerido.',
      path: ['searchSubType'],
    }
  )
  .refine(
    (data) => {
      if (
        (data.searchType === OfferingIncomeSearchType.ChurchGround ||
          data.searchType === OfferingIncomeSearchType.FamilyGroup ||
          data.searchType === OfferingIncomeSearchType.Special ||
          data.searchType === OfferingIncomeSearchType.ZonalFasting ||
          data.searchType === OfferingIncomeSearchType.ZonalVigil) &&
          (
            // data.searchSubType === OfferingIncomeSearchSubType.OfferingByContributorNames ||
            // data.searchSubType === OfferingIncomeSearchSubType.OfferingByContributorFullName ||
            data.searchSubType === OfferingIncomeSearchSubType.OfferingByPreacherNames ||
            data.searchSubType === OfferingIncomeSearchSubType.OfferingByPreacherFullName ||
            data.searchSubType === OfferingIncomeSearchSubType.OfferingBySupervisorNames ||
            data.searchSubType === OfferingIncomeSearchSubType.OfferingBySupervisorFullName)
      ) {
        return !!data.namesTerm; 
      }
      return true;
    },
    {
      message: 'El nombre es requerido.',
      path: ['namesTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        (data.searchType === OfferingIncomeSearchType.ChurchGround ||
          data.searchType === OfferingIncomeSearchType.FamilyGroup ||
          data.searchType === OfferingIncomeSearchType.Special ||
          data.searchType === OfferingIncomeSearchType.ZonalFasting ||
          data.searchType === OfferingIncomeSearchType.ZonalVigil) &&
          (
            // data.searchSubType === OfferingIncomeSearchSubType.OfferingByContributorLastNames ||
            // data.searchSubType === OfferingIncomeSearchSubType.OfferingByContributorFullName ||
            data.searchSubType === OfferingIncomeSearchSubType.OfferingByPreacherLastNames ||
            data.searchSubType === OfferingIncomeSearchSubType.OfferingByPreacherFullName ||
            data.searchSubType === OfferingIncomeSearchSubType.OfferingBySupervisorLastNames ||
            data.searchSubType === OfferingIncomeSearchSubType.OfferingBySupervisorFullName)
      ) {
        return !!data.lastNamesTerm;
      }
      return true;
    },
    {
      message: 'El apellido es requerido.',
      path: ['lastNamesTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        (data.searchType === OfferingIncomeSearchType.FamilyGroup ||
           data.searchType === OfferingIncomeSearchType.ZonalFasting ||
           data.searchType === OfferingIncomeSearchType.ZonalVigil) &&
          (data.searchSubType === OfferingIncomeSearchSubType.OfferingByGroupCode ||
             data.searchSubType === OfferingIncomeSearchSubType.OfferingByGroupCodeDate ||
             data.searchSubType === OfferingIncomeSearchSubType.OfferingByZone ||
             data.searchSubType === OfferingIncomeSearchSubType.OfferingByZoneDate)
          ) {
        return !!data.inputTerm; 
      }
      return true;
    },
    {
      message: 'El Término es requerido.',
      path: ['inputTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        (data.searchType === OfferingIncomeSearchType.RecordStatus ||
          ((data.searchType === OfferingIncomeSearchType.SundaySchool ||
            data.searchType === OfferingIncomeSearchType.SundayService ||
            data.searchType === OfferingIncomeSearchType.GeneralFasting ||
            data.searchType === OfferingIncomeSearchType.GeneralVigil ||
            data.searchType === OfferingIncomeSearchType.Activities ||
            data.searchType === OfferingIncomeSearchType.UnitedService ||
            data.searchType === OfferingIncomeSearchType.YouthService ||
            data.searchType === OfferingIncomeSearchType.IncomeAdjustment ||
            data.searchType === OfferingIncomeSearchType.Special ||
            data.searchType === OfferingIncomeSearchType.ChurchGround) &&
            (data.searchSubType === OfferingIncomeSearchSubType.OfferingByShift ||
              data.searchSubType === OfferingIncomeSearchSubType.OfferingByShiftDate ||
              data.searchSubType === OfferingIncomeSearchSubType.OfferingByContributorNames ||
              data.searchSubType === OfferingIncomeSearchSubType.OfferingByContributorLastNames ||
              data.searchSubType ===
                OfferingIncomeSearchSubType.OfferingByContributorFullName)))
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
        (data.searchType === OfferingIncomeSearchType.Activities ||
          data.searchType === OfferingIncomeSearchType.ChurchGround ||
          data.searchType === OfferingIncomeSearchType.FamilyGroup ||
          data.searchType === OfferingIncomeSearchType.GeneralFasting ||
          data.searchType === OfferingIncomeSearchType.GeneralVigil ||
          data.searchType === OfferingIncomeSearchType.IncomeAdjustment ||
          data.searchType === OfferingIncomeSearchType.Special ||
          data.searchType === OfferingIncomeSearchType.SundaySchool ||
          data.searchType === OfferingIncomeSearchType.SundayService ||
          data.searchType === OfferingIncomeSearchType.UnitedService ||
          data.searchType === OfferingIncomeSearchType.YouthService ||
          data.searchType === OfferingIncomeSearchType.ZonalFasting ||
          data.searchType === OfferingIncomeSearchType.ZonalVigil) &&
          (data.searchSubType === OfferingIncomeSearchSubType.OfferingByDate ||
            data.searchSubType === OfferingIncomeSearchSubType.OfferingByGroupCodeDate ||
            data.searchSubType === OfferingIncomeSearchSubType.OfferingByShiftDate ||
            data.searchSubType === OfferingIncomeSearchSubType.OfferingByZoneDate) 
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
 

  

  

