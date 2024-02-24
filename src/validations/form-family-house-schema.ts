import * as z from 'zod';

export const formFamilyHouseSchema = z
  .object({
    zone: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(8),
    nameHouse: z.string().min(1, { message: 
      'El campo debe contener al menos 1 carácter.'}).max(25),
      
    country: z.string().min(1, { message: 
        'El campo debe contener al menos 1 carácter.'}).max(20), 
    province: z.string().min(1, { message: 
        'El campo debe contener al menos 1 carácter.'}).max(20),
    department: z.string().min(1, { message: 
        'El campo debe contener al menos 1 carácter.'}).max(20),
    district: z.string().min(1, { message: 
        'El campo debe contener al menos 1 carácter.'}).max(20),
    address: z.string().min(1, { message: 
        'El campo debe contener al menos 1 carácter.'}).max(50),

    theirPreacher: z.string().optional(),

  })

  

