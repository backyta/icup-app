import * as z from 'zod';

export const familyGroupPreacherUpdateFormSchema = z.object({
  currentFamilyGroup: z.string().optional(),
  currentTheirPreacher: z.string().optional(),
  newTheirPreacher: z.string(),
  newFamilyGroup: z.string().optional(),
});
