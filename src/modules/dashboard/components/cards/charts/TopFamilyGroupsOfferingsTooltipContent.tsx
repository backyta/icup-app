/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { addDays } from 'date-fns';

import { cn } from '@/shared/lib/utils';

import { type TooltipConfig } from '@/shared/interfaces';
import { dateFormatterToDDMMYY } from '@/shared/helpers';

import { CurrencyType } from '@/modules/offering/shared/enums';
import { type TopFamilyGroupOfferingsPayload } from '@/modules/dashboard/interfaces';

export const TopFamilyGroupsTooltipContent = (
  props: TooltipConfig<TopFamilyGroupOfferingsPayload>
): JSX.Element => {
  const { payload, label } = props;

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <p>
        <span className='font-medium text-[12px] sm:text-[14px]'>{`${payload[0]?.payload?.familyGroup?.familyGroupName}`}</span>
        <span className='font-medium text-[11px] sm:text-[13px]'>{` ~ ${label}`}</span>
      </p>
      <ul className={'list flex flex-col justify-center gap-1.5'}>
        {payload.map(
          (entry, index: any) =>
            ((entry?.name === 'accumulatedOfferingEUR' &&
              entry?.payload?.allOfferings?.some(
                (item: any) => item.currency === CurrencyType.EUR
              )) ||
              (entry?.name === 'accumulatedOfferingPEN' &&
                entry?.payload?.allOfferings?.some(
                  (item: any) => item.currency === CurrencyType.PEN
                )) ||
              (entry?.name === 'accumulatedOfferingUSD' &&
                entry?.payload?.allOfferings?.some(
                  (item: any) => item.currency === CurrencyType.USD
                ))) && (
              <div key={`item-${index}`}>
                <li className={cn('flex items-center font-medium [11.5px] md:text-[13.5px]')}>
                  <span
                    className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
                    style={{
                      backgroundColor: entry.color,
                      border: `1px solid ${entry.color}`,
                    }}
                  ></span>
                  <span className='font-semibold text-[11.5px] md:text-[13.5px]'>{`Ultima Ofrenda:`}</span>
                  <span className='pl-1 font-normal dark:text-white text-black'>
                    {`${
                      entry?.name === 'accumulatedOfferingPEN'
                        ? entry?.payload?.allOfferings?.find(
                            (item: any) => item.currency === CurrencyType.PEN
                          )?.offering
                        : entry?.name === 'accumulatedOfferingUSD'
                          ? entry?.payload?.allOfferings?.find(
                              (item: any) => item.currency === CurrencyType.USD
                            )?.offering
                          : entry?.payload?.allOfferings?.find(
                              (item: any) => item.currency === CurrencyType.EUR
                            )?.offering
                    } 
              ${
                entry?.name === 'accumulatedOfferingPEN'
                  ? CurrencyType.PEN
                  : entry?.name === 'accumulatedOfferingUSD'
                    ? CurrencyType.USD
                    : CurrencyType.EUR
              } - ${
                entry?.name === 'accumulatedOfferingPEN'
                  ? dateFormatterToDDMMYY(
                      addDays(
                        entry?.payload?.allOfferings?.find(
                          (item: any) => item.currency === CurrencyType.PEN
                        )?.date as string,
                        1
                      )
                    )
                  : entry?.name === 'accumulatedOfferingUSD'
                    ? dateFormatterToDDMMYY(
                        addDays(
                          entry?.payload?.allOfferings?.find(
                            (item: any) => item.currency === CurrencyType.USD
                          )?.date as string,
                          1
                        )
                      )
                    : dateFormatterToDDMMYY(
                        addDays(
                          entry?.payload?.allOfferings?.find(
                            (item: any) => item.currency === CurrencyType.EUR
                          )?.date as string,
                          1
                        )
                      )
              }`}
                  </span>
                </li>
              </div>
            )
        )}
      </ul>

      <li className={'pl-1 font-medium text-[11.5px] sm:text-[13.5px]'}>
        <span className='-ml-2'>{`Pred: ${payload[0]?.payload?.preacher?.firstName} ${payload[0]?.payload?.preacher?.lastName}`}</span>
      </li>
      <li className='pl-1 font-medium text-[11.5px] sm:text-[13.5px]'>
        <span className='-ml-2'>{`Miembros: ${payload[0]?.payload?.familyGroup?.disciples}`}</span>
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