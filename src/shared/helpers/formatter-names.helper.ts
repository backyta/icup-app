/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

export const formatNames = (namesTerm: string | undefined ): string | undefined =>  {

  if (namesTerm && namesTerm.includes(' ')) {
    const trimmedNamesTerm = namesTerm.trimStart();
    const newNamesTerm = trimmedNamesTerm.replace(/([a-zA-Z])\s+(?=[a-zA-Z])/g, '$1+');
    return newNamesTerm.replace(/\s+(?=[^a-zA-Z]|$)/g, '');
  }

  return namesTerm;

}

export const formatLastNames = (lastNamesTerm: string | undefined ): string | undefined =>  {

  if (lastNamesTerm && lastNamesTerm.includes(' ')) {
    const trimmedLastNamesTerm = lastNamesTerm.trimStart();
    const newLastNamesTerm = trimmedLastNamesTerm.replace(/([a-zA-Z])\s+(?=[a-zA-Z])/g, '$1+');
    return newLastNamesTerm.replace(/\s+(?=[^a-zA-Z]|$)/g, '');
  }

  return lastNamesTerm;
}
