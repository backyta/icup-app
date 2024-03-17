import * as z from 'zod';

export const formFamilyHouseSchema = z
  .object({
    zone: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(20),
    houseName: z.string().min(1, { message: 
      'El campo debe contener al menos 1 carácter.'}).max(25),
      
    country: z.string().min(1, { message: 
        'El campo debe contener al menos 1 carácter.'}).max(20), 
    department: z.string().min(1, { message: 
        'El campo debe contener al menos 1 carácter.'}).max(20),
    province: z.string().min(1, { message: 
        'El campo debe contener al menos 1 carácter.'}).max(20),
    district: z.string().min(1, { message: 
        'El campo debe contener al menos 1 carácter.'}).max(20),
    address: z.string().min(1, { message: 
        'El campo debe contener al menos 1 carácter.'}).max(50),

    theirPreacher: z.string({required_error: 
      'Por favor asigne un Predicador.'}),

  })

  
export const formZoneSchema = z
  .object({
    zoneName: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(20).optional(),
    country: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(30).optional(),
    department: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(30).optional(),
    province: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(30).optional(),
    district: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(30).optional(),
    theirSupervisor: z.string({required_error: 
      'Por favor asigne un Supervisor.'}).optional(),

  })

export const formSearchZoneSchema = z
  .object({
    zoneName: z.string().min(1,{ message: 
      'El campo debe contener al menos 1 carácter.'}).max(8),
  })



  

