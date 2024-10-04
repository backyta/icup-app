/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { addDays } from 'date-fns';

import { type TooltipConfig } from '@/shared/interfaces';
import { dateFormatterToDDMMYY } from '@/shared/helpers';

import { CurrencyType } from '@/modules/offering/shared/enums';
import { type LatestSundaysOfferingsPayload } from '@/modules/dashboard/interfaces';

export const LastSundaysOfferingsTooltipContent = (
  props: TooltipConfig<LatestSundaysOfferingsPayload>
): JSX.Element => {
  const { payload, label } = props;

  const totalAccumulatedPEN = payload
    .filter((item: any) => item.dataKey === 'dayPEN' || item.dataKey === 'afternoonPEN')
    .reduce((result: any, entry: any) => result + entry.value, 0)
    .toFixed(2);

  const totalAccumulatedUSD = payload
    .filter((item: any) => item.dataKey === 'dayUSD' || item.dataKey === 'afternoonUSD')
    .reduce((result: any, entry: any) => result + entry.value, 0)
    .toFixed(2);

  const totalAccumulatedEUR = payload
    .filter((item: any) => item.dataKey === 'dayEUR' || item.dataKey === 'afternoonEUR')
    .reduce((result: any, entry: any) => result + entry.value, 0)
    .toFixed(2);

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <p className='font-medium text-[12px] sm:text-[14px]'>{`${dateFormatterToDDMMYY(addDays(label, 1))}`}</p>
      <ul className='list grid gap-1.5'>
        {payload.map((entry, index) =>
          entry.value ? (
            <div key={`item-${index}`}>
              <li
                key={`item-${index}`}
                className='flex items-center font-medium text-[12px] sm:text-[14px]'
              >
                <span
                  className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
                  style={{
                    backgroundColor: entry.color,
                    border: `1px solid ${entry.color}`,
                  }}
                ></span>
                <span className='font-semibold'>
                  {`${entry.name.charAt(0).toUpperCase() + entry.name.slice(1, -4)}:`}
                </span>
                <span className='pl-1 font-normal dark:text-white text-black'>{`${entry.value} 
            ${
              entry.dataKey === 'dayPEN' || entry.dataKey === 'afternoonPEN'
                ? CurrencyType.PEN
                : entry.dataKey === 'dayUSD' || entry.dataKey === 'afternoonUSD'
                  ? CurrencyType.USD
                  : CurrencyType.EUR
            }`}</span>
              </li>
            </div>
          ) : (
            ''
          )
        )}
      </ul>
      {(totalAccumulatedPEN > 0 && totalAccumulatedUSD > 0) ||
      (totalAccumulatedPEN > 0 && totalAccumulatedEUR > 0) ? (
        <p className='font-medium text-[11.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
          Totales acumulados:
        </p>
      ) : (
        <p className='font-medium text-[11.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
          Total acumulado:
        </p>
      )}

      {totalAccumulatedPEN > 0 && (
        <li className='pl-1 font-medium text-[11.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
          <span className='-ml-2'>{`Soles: ${totalAccumulatedPEN} ${CurrencyType.PEN}`}</span>
        </li>
      )}
      {totalAccumulatedUSD > 0 && (
        <li className='pl-1 font-medium text-[11.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
          <span className='-ml-2'> {`Dolares: ${totalAccumulatedUSD} ${CurrencyType.USD}`}</span>
        </li>
      )}
      {totalAccumulatedEUR > 0 && (
        <li className='pl-1 font-medium text-[11.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
          <span className='-ml-2'> {`Euros: ${totalAccumulatedEUR} ${CurrencyType.EUR}`}</span>
        </li>
      )}
    </div>
  );
};
