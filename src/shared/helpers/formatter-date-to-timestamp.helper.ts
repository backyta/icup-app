/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

export const formatDateTermToTimestamp = (dateTerm: {from: Date | undefined, to: Date | undefined} ): string =>  {

  const fromTimestamp = new Date(dateTerm?.from as any).getTime();
  const toTimestamp = new Date(dateTerm?.to as any).getTime();

  return `${fromTimestamp}+${toTimestamp}`;
}
