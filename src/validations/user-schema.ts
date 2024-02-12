/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import * as z from 'zod';


// export const userSchema = z
//   .object({
//     firstName: z.string().min(1),
//     lastName: z.string().min(1),
//     dateBirth: z.date(),
//     emailAddress: z.string().email(),
//     password: z.string().min(3),
//     passwordConfirm: z.string(),
//     accountType: z.enum(['personal', 'company']),
//     companyName: z.string().optional(),
//   })
//   .refine(
//     (data) => {
//       return data.password === data.passwordConfirm;
//     },
//     {
//       message: 'Passwords do not match',
//       path: ['passwordConfirm'],
//     }
//   )
//   .refine(
//     (data) => {
//       if (data.accountType === 'company') {
//         return !!data.companyName; /* //true */
//       }
//       return true;
//     },
//     {
//       message: 'Company name is required',
//       path: ['companyName'],
//     }
//   );

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