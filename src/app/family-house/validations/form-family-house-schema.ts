import * as z from 'zod';

// TODO : bloquear el botón de submit si no existe zona y predicador para evitar este error
// NOTE : solo activar el botón cuando se tenga nombre y los demás que si desparecen su error
// NOTE : replicar esto para todos los demás que usan combox como los their.
export const formFamilyHouseSchema = z
  .object({
    zoneName: z.string({required_error: 
      'Por favor asigne un Zona.'}),

    houseName: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(25, { message: 'El campo debe contener máximo 25 caracteres.'}),
      
    country: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(20, { message: 'El campo debe contener máximo 20 caracteres.'}), 

    department: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(20, { message: 'El campo debe contener máximo20 caracteres.'}),

    province: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
    .max(20, { message: 'El campo debe contener máximo 20 caracteres.'}),
        
    district: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(20, { message: 'El campo debe contener máximo 20 caracteres.'}),

    address: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(50, { message: 'El campo debe contener máximo 50 caracteres.'}),

    theirPreacher: z.string({required_error: 
      'Por favor asigne un Predicador.'}),

  })


// * Cambiar el opcional a requerido cuando pasemos a componentes propios
export const formZoneSchema = z
  .object({
    zoneName: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(20, { message: 'El campo debe contener máximo 20 caracteres.'}),

    country: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(30, { message: 'El campo debe contener máximo 30 caracteres.'}),

    department: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(30, { message: 'El campo debe contener máximo 30 caracteres.'}),

    province: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(30, { message: 'El campo debe contener máximo 30 caracteres.'}),

    district: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.'})
    .max(30, {message: 'El campo debe contener máximo 30 caracteres.'}),

    theirSupervisor: z.string({required_error: 
      'Por favor asigne un Supervisor.'})
  
  })

export const formSearchZoneSchema = z
  .object({
    zoneName: z.string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter. '})
    .max(8, { message: 'El campo debe contener máximo 8 caracteres. '}),
  })



  

