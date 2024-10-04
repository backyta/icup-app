/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

export const dateFormatterTermToTimestamp = (date: {from: Date | undefined, to: Date | undefined} ): string =>  {

  const fromTimestamp = new Date(date?.from as any).getTime();
  const toTimestamp = new Date(date?.to as any).getTime();

  return `${fromTimestamp}+${toTimestamp}`;
}
