/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

export const firstNamesFormatter = (firstNames: string | undefined ): string | undefined =>  {

  if (firstNames && firstNames.includes(' ')) {
    const trimmedNamesTerm = firstNames.trimStart();
    const newNamesTerm = trimmedNamesTerm.replace(/([a-zA-Z])\s+(?=[a-zA-Z])/g, '$1+');
    return newNamesTerm.replace(/\s+(?=[^a-zA-Z]|$)/g, '');
  }

  return firstNames;
}

export const lastNamesFormatter = (lastNames: string | undefined ): string | undefined =>  {

  if (lastNames && lastNames.includes(' ')) {
    const trimmedLastNamesTerm = lastNames.trimStart();
    const newLastNamesTerm = trimmedLastNamesTerm.replace(/([a-zA-Z])\s+(?=[a-zA-Z])/g, '$1+');
    return newLastNamesTerm.replace(/\s+(?=[^a-zA-Z]|$)/g, '');
  }

  return lastNames;
}
