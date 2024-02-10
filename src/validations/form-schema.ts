/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MaritalStatus } from '@/enums/marital-status.enum';
import { ValidMemberRoles } from '@/enums/valid-member-roles.enum';
import * as z from 'zod';


export const formSchema = z
  .object({
    firstName: z.string().min(1).max(40),
    lastName: z.string().min(1).max(40),
    dateBirth: z.date(),
    emailAddress: z.string().email(),
    gender: z.enum(['male', 'female']),
    maritalStatus: z.nativeEnum(MaritalStatus),
    numberChildren: z.number(),
    phone: z.string(),
    dateJoining: z.date(),
    originCountry: z.string().min(1).max(20),
    roles: z.nativeEnum(ValidMemberRoles),
    accountType: z.enum(['personal', 'company']),
    companyName: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.accountType === 'company') {
        return !!data.companyName; /* //true */
      }
      return true;
    },
    {
      message: 'Company name is required',
      path: ['companyName'],
    }
  );

  // {
  //   "first_name": "John Martin",
  //   "last_name": "Rojas Castro",
  //   "date_birth": "1990/12/23",
  //   "email": "example@example.com",
  //   "is_active": true,
  //   "gender": "male",
  //   "marital_status": "single",
  //   "number_children": 2,
  //   "phone": "999333555",
  //   "date_joining": "2001/12/23",
  //   "origin_country": "Colombia",
  //   "roles": [
  //     "member",
  //     "preacher"
  //   ],
  //   "residence_country": "Peru",
  //   "department": "Lima",
  //   "province": "Lima",
  //   "district": "Comas",
  //   "address": "Av.example 1234",
  //   "their_family_home": "cf5a9ee3-cad7-4b73-a331-a5f3f76f6661",
  //   "their_pastor": "cf5a9ee3-cad7-4b73-a331-a5f3f76f6661",
  //   "their_copastor": "cf5a9ee3-cad7-4b73-a331-a5f3f76f6661",
  //   "their_preacher": "cf5a9ee3-cad7-4b73-a331-a5f3f76f6661"
  // }

  // TODO : crear todas las validaciones y formularios de todos los módulos.
  // TODO : agregar el path al router de loas demas paginas form
  // NOTE : no creo que sea necesario hacer un componente de formilario poorque todos varian, usar los componentes de shadcn no mas
  // NOTE: pordria reutilizar el componente de los titulos 