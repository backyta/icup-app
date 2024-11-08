/* eslint-disable @typescript-eslint/strict-boolean-expressions */
interface Options {
  firstNames: string;
  lastNames: string;
}

interface AbbreviatedFullNamesOptions {
  fullNames: string;
}

export const getInitialFullNames = ( {firstNames, lastNames}: Options): string => {
  const firstName = firstNames.split(" ");
  const lastName = lastNames.split(" ");

  return lastName[0]
    ? `${firstName[0]} ${lastName[0]}`
    : `${firstName[0]}${lastName[0]}`;
}

export const getFullNames = ( {firstNames, lastNames}: Options): string => {
  const firstName = firstNames.split(" ");
  const lastName = lastNames.split(" ");

  return `${firstName[0]} ${firstName[1]} ${lastName[0]} ${lastName[1]}` 
}

export const getAbbreviatedFullNames = ( {fullNames}: AbbreviatedFullNamesOptions): string => {
  const names = fullNames.split(' ').filter((name: string) => name !== '');
  const firstNames = names[0];
  const lastNames = names[1]?.charAt(0) + '.' + names[2]?.charAt(0);

  return `${firstNames} ${lastNames}`;
}
