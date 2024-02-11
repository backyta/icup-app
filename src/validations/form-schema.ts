/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MaritalStatus } from '@/enums/marital-status.enum';
import { MemberRoles } from '@/enums/member-roles.enum';
import * as z from 'zod';


export const formSchema = z
  .object({
    firstName: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(40),
    lastName: z.string().min(1, { message: 
      'El campo debe contener al menos 1 carácter.'}).max(40),
    dateBirth: z.date({
      required_error: "Por favor selecciona una fecha.",
      invalid_type_error: "Eso no es una fecha!",
    }),
    emailAddress: z.string().email({ message: "Email invalido." }),
    gender: z.enum(['male', 'female'], {
      required_error: "Por favor seleccione un genero.",
      invalid_type_error: "Eso no es un genero!",
    }),
    maritalStatus: z.nativeEnum(MaritalStatus),
    numberChildren: z.number(),
    phoneNumber: z.string(),
    conversionDate: z.date(),
    originCountry: z.string().min(1).max(20),
    department: z.string().min(1).max(20),
    province: z.string().min(1).max(20),
    district: z.string().min(1).max(20),
    address: z.string().min(5).max(50),
    roles: z.array(z.nativeEnum(MemberRoles),{
      required_error: "Tienes que seleccionar al menos un elemento.",
    }).refine((value) => value.some((item) => item), {
      message: "Tienes que seleccionar al menos un elemento.",
    }),
    their_family_home: z.string().uuid({message:'UUID invalido'}).optional(),
    their_pastor: z.string().uuid({message:'UUID invalido'}).optional(),
    their_copastor: z.string().uuid({message:'UUID invalido'}).optional(),
    their_preacher: z.string().uuid({message:'UUID invalido'}).optional(),
    accountType: z.enum(['personal', 'company']),
    companyName: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.gender === 'male') {
        return !!data.gender; /* //true */
      }
      return true;
    },
    {
      message: 'Company name is required',
      path: ['companyName'],
    }
  )
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