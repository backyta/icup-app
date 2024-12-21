/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import * as z from 'zod';

import { RecordOrder } from '@/shared/enums/record-order.enum';
import { SupervisorSearchType } from '@/modules/supervisor/enums/supervisor-search-type.enum';
import { SupervisorSearchSubType } from '@/modules/supervisor/enums/supervisor-search-sub-type.num';

export const supervisorSearchByTermFormSchema = z
  .object({
    searchType: z.nativeEnum(SupervisorSearchType,{
      required_error: "Por favor seleccione un tipo.",
    }),

    searchSubType: z.nativeEnum(SupervisorSearchSubType ,{
      message: 'Por favor seleccione una opción.',
      required_error: "Por favor seleccione una opción.",
    }).optional(),
    
    inputTerm: z.string().max(30).optional(),
    selectTerm: z.string().max(30).optional(),

    dateTerm: z.object({from: z.date(), to: z.date().optional()}, {
      required_error: "Por favor seleccione una fecha.",
    }).optional(),

    firstNamesTerm: z.string().max(30).optional(),

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
        data.searchType === SupervisorSearchType.FirstNames || 
        data.searchType === SupervisorSearchType.LastNames || 
        data.searchType === SupervisorSearchType.FullNames 
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
        data.searchType === SupervisorSearchType.FirstNames
      ) {
        return !!data.firstNamesTerm; 
      }
      return true;
    },
    {
      message: 'El nombre es requerido.',
      path: ['firstNamesTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        data.searchType === SupervisorSearchType.LastNames
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
  //* Full name
  .refine(
    (data) => {
      if (
        data.searchType === SupervisorSearchType.FullNames
      ) {
        return !!data.lastNamesTerm; 
      }
      return true;
    },
    {
      message: 'El nombre es requerido.',
      path: ['lastNamesTerm'],
    }
  )
  .refine(
    (data) => {
      if (
        data.searchType === SupervisorSearchType.FullNames
      ) {
        return !!data.firstNamesTerm; 
      }
      return true;
    },
    {
      message: 'El apellido es requerido.',
      path: ['firstNamesTerm'],
    }
  )
  .refine(
    (data) => {
      if (data.searchType === SupervisorSearchType.OriginCountry ||
          data.searchType === SupervisorSearchType.ZoneName ||
          data.searchType === SupervisorSearchType.ResidenceCountry ||
          data.searchType === SupervisorSearchType.ResidenceDepartment || 
          data.searchType === SupervisorSearchType.ResidenceProvince || 
          data.searchType === SupervisorSearchType.ResidenceDistrict || 
          data.searchType === SupervisorSearchType.ResidenceUrbanSector || 
          data.searchType === SupervisorSearchType.ResidenceAddress
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
          data.searchType === SupervisorSearchType.BirthMonth ||
          data.searchType === SupervisorSearchType.Gender ||
          data.searchType === SupervisorSearchType.MaritalStatus ||
          data.searchType === SupervisorSearchType.RecordStatus
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
        data.searchType === SupervisorSearchType.BirthDate
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
 

  

  

