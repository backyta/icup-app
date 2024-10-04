/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

export const namesFormatter = (names: string | undefined ): string | undefined =>  {

  if (names && names.includes(' ')) {
    const trimmedNamesTerm = names.trimStart();
    const newNamesTerm = trimmedNamesTerm.replace(/([a-zA-Z])\s+(?=[a-zA-Z])/g, '$1+');
    return newNamesTerm.replace(/\s+(?=[^a-zA-Z]|$)/g, '');
  }

  return names;
}

export const lastNamesFormatter = (lastNames: string | undefined ): string | undefined =>  {

  if (lastNames && lastNames.includes(' ')) {
    const trimmedLastNamesTerm = lastNames.trimStart();
    const newLastNamesTerm = trimmedLastNamesTerm.replace(/([a-zA-Z])\s+(?=[a-zA-Z])/g, '$1+');
    return newLastNamesTerm.replace(/\s+(?=[^a-zA-Z]|$)/g, '');
  }

  return lastNames;
}
