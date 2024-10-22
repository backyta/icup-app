import { addDays } from 'date-fns';

import { CurrencyType } from '@/modules/offering/shared/enums';

import { type TooltipConfig } from '@/shared/interfaces';
import { dateFormatterToDDMMYY } from '@/shared/helpers';

import { type OfferingExpenseChartPayload } from '@/modules/metrics/components/offering-expense/tooltips/interfaces';

export const OfferingExpenseChartTooltipContent = (
  props: TooltipConfig<OfferingExpenseChartPayload>
): JSX.Element => {
  const { payload, label } = props;

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <p>
        <span className='font-medium text-[13px] sm:text-[14px]'>{`${label}`}</span>
        <span className='font-medium text-[13px] sm:text-[14px] text-slate-500 md:text-slate-400'>{` (${payload[0]?.payload?.totalPercentage}%)`}</span>
      </p>
      <span className='font-semibold text-gray-500 dark:text-gray-400 text-[12.5px] md:text-[13.5px]'>
        Lista de Ofrendas
      </span>
      {payload?.[0]?.payload?.allOfferings.map((off, index) => (
        <>
          <div>
            <span
              className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
              style={{
                backgroundColor:
                  off.currency === CurrencyType.PEN
                    ? 'var(--color-accumulatedOfferingPEN)'
                    : off.currency === CurrencyType.USD
                      ? 'var(--color-accumulatedOfferingUSD)'
                      : 'var(--color-accumulatedOfferingEUR)',
                border:
                  off.currency === CurrencyType.PEN
                    ? '1px var(--color-accumulatedOfferingPEN)'
                    : off.currency === CurrencyType.USD
                      ? '1px var(--color-accumulatedOfferingUSD)'
                      : '1px var(--color-accumulatedOfferingEUR)',
              }}
            ></span>
            <span className='font-medium text-[11.5px] md:text-[13.5px]'>{`${index + 1}° Ofrenda:`}</span>
            <span
              className='pl-1 dark:text-white text-black font-normal [11.5px] md:text-[13.5px]'
              key={`item-${index}`}
            >
              {`${off.offering} ${off.currency} - ${dateFormatterToDDMMYY(addDays(off.date, 1))}`}
            </span>
          </div>
        </>
      ))}

      <li className={'pl-1 font-medium text-[11.5px] sm:text-[13.5px]'}>
        <span className='-ml-2'>{`Iglesia: ${payload[0]?.payload?.church?.churchName}`}</span>
      </li>

      {(payload[0]?.payload?.accumulatedOfferingPEN > 0 &&
        payload[0]?.payload?.accumulatedOfferingUSD > 0) ||
      (payload[0]?.payload?.accumulatedOfferingPEN > 0 &&
        payload[0]?.payload?.accumulatedOfferingEUR > 0) ? (
        <p className='font-medium text-[11.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
          Totales acumulados:
        </p>
      ) : (
        <p className='font-medium text-[11.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
          Total acumulado:
        </p>
      )}

      {payload[0]?.payload?.accumulatedOfferingPEN > 0 && (
        <li className='pl-1 font-medium text-[11.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
          <span className='-ml-2'>{`Soles: ${payload[0]?.payload?.accumulatedOfferingPEN} PEN`}</span>
        </li>
      )}

      {payload[0]?.payload?.accumulatedOfferingUSD > 0 && (
        <li className='pl-1 font-medium text-[11.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
          <span className='-ml-2'>{`Dolares: ${payload[0]?.payload?.accumulatedOfferingUSD} USD`}</span>
        </li>
      )}

      {payload[0]?.payload?.accumulatedOfferingEUR > 0 && (
        <li className='pl-1 font-medium text-[11.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
          <span className='-ml-2'>{`Euros: ${payload[0]?.payload?.accumulatedOfferingEUR} EUR`}</span>
        </li>
      )}
    </div>
  );
};
