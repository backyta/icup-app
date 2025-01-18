/* eslint-disable @typescript-eslint/strict-boolean-expressions */
interface Options {
  firstNames: string;
  lastNames: string;
}

interface AbbreviatedFullNamesOptions {
  fullNames: string;
}

export const getInitialFullNames = ({ firstNames, lastNames }: Options): string => {
  const firstNamesValue = firstNames.split(' ');
  const lastNamesValue = lastNames.split(' ');

  return lastNames !== '' ? `${firstNamesValue[0]} ${lastNamesValue[0]}` : `${firstNamesValue[0]}`;
};

export const getFirstNameAndLastNames = ({ firstNames, lastNames }: Options): string => {
  const firstNamesValue = firstNames.split(' ');
  const lastNamesValue = lastNames.split(' ');

  return lastNames !== ''
    ? `${firstNamesValue[0]} ${lastNamesValue[0]} ${lastNamesValue[1]}`
    : `${firstNamesValue[0]}`;
};

export const getFullNames = ({ firstNames, lastNames }: Options): string => {
  const firstNamesValue = firstNames.split(' ');
  const lastNamesValues = lastNames.split(' ');

  return `${firstNamesValue[0]} ${firstNamesValue[1]} ${lastNamesValues[0]} ${lastNamesValues[1]}`;
};

export const getAbbreviatedFullNames = ({ fullNames }: AbbreviatedFullNamesOptions): string => {
  const names = fullNames.split(' ').filter((name: string) => name !== '');
  const firstNames = names[0];
  const lastNames = names[1]?.charAt(0) + '.' + names[2]?.charAt(0);

  return `${firstNames} ${lastNames}`;
};
