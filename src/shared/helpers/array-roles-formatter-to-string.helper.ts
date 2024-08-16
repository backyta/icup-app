
export const arrayRolesFormatterToString = (
   roles: string[] | undefined 
): string | undefined =>  {
   return roles?.map(rol => rol).join('+')
}

