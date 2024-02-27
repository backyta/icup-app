/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MemberSubTypeSearch } from '@/enums/search-sub-types.enum';
import { MemberTypeSearch } from '@/enums/search-types.enum';
import * as z from 'zod';

// NOTE: quías se hacen varios esquemas por term Member, pastor, etc
export const formSearchByTermSchema = z
  .object({
    type: z.nativeEnum(MemberTypeSearch,{
      required_error: "Por favor seleccione un tipo.",
    }),
    subType: z.nativeEnum(MemberSubTypeSearch,{
      required_error: "Por favor seleccione una opción.",
    }).optional(),
    term: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(20).optional(),

    termNames: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(20).optional(),
    termLastNames: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(20).optional(),

    limit: z.string().refine(limit => !isNaN(parseInt(limit)),{
      message: 'Limite debe ser un numero.'
    }).optional(),
    offset:z.string().refine(offset => !isNaN(parseInt(offset)),{
      message: 'Desplaz. debe ser un numero.'
    }).optional(),
    order: z.enum(['ASC', 'DESC'], {
      required_error: "Seleccione un orden para al consulta.",
    }),
   
  })
  .refine(
    (data) => {
      if (data.type === MemberTypeSearch.firstName || data.type === MemberTypeSearch.lastName || data.type === MemberTypeSearch.fullName ) {
        return !!data.subType; /* //true */
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
      if (data.type === MemberTypeSearch.firstName ) {
        return !!data.termNames; /* //true */
      }
      return true;
    },
    {
      message: 'El termino es requerido',
      path: ['termNames'],
    }
  )
  .refine(
    (data) => {
      if (data.type === MemberTypeSearch.lastName) {
        return !!data.termLastNames; /* //true */
      }
      return true;
    },
    {
      message: 'El termino de  es requerido',
      path: ['termLastNames'],
    }
  )
  .refine(
    (data) => {
      if (data.type === MemberTypeSearch.fullName  ) {
        return !!data.termLastNames && !!data.termNames; /* //true */
      }
      return true;
    },
    {
      message: 'El termino de  es requerido',
      path: ['termLastNames','termNames'],
    }
  )
  .refine(
    (data) => {
      if (data.type !== MemberTypeSearch.lastName && data.type !== MemberTypeSearch.firstName && data.type !== MemberTypeSearch.fullName) {
        return !!data.term; /* //true */
      }
      return true;
    },
    {
      message: 'El termino es requerido',
      path: ['term'],
    }
  )

  
//* Basic (members, pastor, copastor, leaders)
// id = 'id', // no usar, solo para botones
//! Si el tipo es algo que requiere subtipo habilitar ese input
// ? Tipos directos
// gender = 'gender',
// maritalStatus = 'marital_status',
// isActive = 'is_active',
// roles = 'roles',
// por código de casa (solo members, preachers, supervisor)
// por zona (members preacher supervisors )
// origin_country
// departamento
// provincia
// distrito
//! date birth podría trabajarse, para filtrar por mes de cumpleaños (usaríamos las mismas cols)

// ? Con sub_tipos
// firstName = 'first_name',
// lastName = 'last_name',
// fullName = 'full_name',




// TODO : agregar indices a todos los filtros en el backend

//* Casa Familiares
// address = 'address',
// zone = 'zone', 
// code = 'code',