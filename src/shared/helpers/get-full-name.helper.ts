export interface Options {
  firstNames: string;
  lastNames: string;
}

export const getFullName = ( {firstNames, lastNames}: Options): string => {

  const firstName = firstNames.split(" ");
  const lastName = lastNames.split(" ");

  return `${ firstName[0] } ${lastName[0]}` 
}
