/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { addDays } from 'date-fns';
import { cn } from '@/shared/lib/utils';

import { dateFormatterToDDMMYY } from '@/shared/helpers/date-formatter-to-ddmmyyyy.helper';
import { type TooltipConfig } from '@/shared/interfaces/tooltip-config.interface';

import {
  OfferingIncomeCreationCategory,
  OfferingIncomeCreationCategoryNames,
} from '@/modules/offering/income/enums/offering-income-creation-category.enum';
import { CurrencyType } from '@/modules/offering/shared/enums/currency-type.enum';
import { type MemberType, MemberTypeNames } from '@/modules/offering/income/enums/member-type.enum';

import { type OfferingIncomePayloadBySpecialOffering } from '@/modules/metrics/components/offering-income/tooltips/interfaces/offering-income-by-special-offering-tooltip-payload.interface';

export const OfferingIncomeBySpecialOfferingTooltipContent = (
  props: TooltipConfig<OfferingIncomePayloadBySpecialOffering>
): JSX.Element => {
  const { payload, label } = props;

  console.log(payload);
  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <p>
        <span className='font-semibold text-[14px] sm:text-[14px]'>{`${label}`}</span>
        {payload?.[0]?.payload?.memberType && (
          <span className='font-semibold text-[14px] sm:text-[14px]'>{` ~ ${MemberTypeNames[payload?.[0]?.payload?.memberType as MemberType]}`}</span>
        )}
      </p>

      {payload.map(
        (entry, _) =>
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
            <div key={`${entry.dataKey}-${entry?.payload?.category}`}>
              <li className={cn('flex items-center font-medium text-[13.5px] md:text-[13.5px]')}>
                <span
                  className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
                  style={{
                    backgroundColor: entry.color,
                    border: `1px solid ${entry.color}`,
                  }}
                ></span>
                <span className='font-semibold text-[13.5px] md:text-[13.5px]'>{`Ultima Ofrenda:`}</span>
                <span className='pl-1 font-normal dark:text-white text-black'>
                  {`${
                    entry?.name === 'accumulatedOfferingPEN'
                      ? entry?.payload?.allOfferings?.at(-1)?.offering
                      : entry?.name === 'accumulatedOfferingUSD'
                        ? entry?.payload?.allOfferings?.at(-1)?.offering
                        : entry?.payload?.allOfferings?.at(-1)?.offering
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
                       addDays(entry?.payload?.allOfferings?.at(-1)?.date as string, 1)
                     )
                   : entry?.name === 'accumulatedOfferingUSD'
                     ? dateFormatterToDDMMYY(
                         addDays(entry?.payload?.allOfferings?.at(-1)?.date as string, 1)
                       )
                     : dateFormatterToDDMMYY(
                         addDays(entry?.payload?.allOfferings?.at(-1)?.date as string, 1)
                       )
               }`}
                </span>
              </li>

              {entry.payload.category === OfferingIncomeCreationCategory.ExternalDonation && (
                <div className='text-left text-[13.5px] mt-[2px]'>
                  <span
                    className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
                    style={{
                      backgroundColor: entry.color,
                      border: `1px solid ${entry.color}`,
                    }}
                  ></span>
                  <span className='font-medium'>Donante:</span>{' '}
                  <span className='font-normal'>
                    {entry?.name === 'accumulatedOfferingPEN'
                      ? entry?.payload?.allOfferings?.at(-1)?.lastDonor
                      : entry?.name === 'accumulatedOfferingUSD'
                        ? entry?.payload?.allOfferings?.at(-1)?.lastDonor
                        : entry?.payload?.allOfferings?.at(-1)?.lastDonor}
                  </span>
                </div>
              )}

              {entry.payload.category === OfferingIncomeCreationCategory.ExternalDonation && (
                <div className='text-left text-[13.5px] mt-[2px]'>
                  <span
                    className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
                    style={{
                      backgroundColor: entry.color,
                      border: `1px solid ${entry.color}`,
                    }}
                  ></span>
                  <span className='font-medium'>País remitente:</span>{' '}
                  <span className='font-normal'>
                    {entry?.name === 'accumulatedOfferingPEN'
                      ? entry?.payload?.allOfferings?.at(-1)?.sendingCountry
                      : entry?.name === 'accumulatedOfferingUSD'
                        ? entry?.payload?.allOfferings?.at(-1)?.sendingCountry
                        : entry?.payload?.allOfferings?.at(-1)?.sendingCountry}
                  </span>
                </div>
              )}
            </div>
          )
      )}

      <ul className='list-disc pl-3 sm:pl-4 flex flex-col gap-1'>
        <li className={'font-medium italic text-[13.5px] sm:text-[13.5px]'}>
          <span className='sm:-ml-1'>{`Categoría: ${OfferingIncomeCreationCategoryNames[payload[0]?.payload?.category as OfferingIncomeCreationCategory]}`}</span>
        </li>
        <li className={'font-medium italic text-[13.5px] sm:text-[13.5px]'}>
          <span className='sm:-ml-1'>{`Iglesia: ${payload[0]?.payload?.church?.abbreviatedChurchName} ${payload[0]?.payload?.church?.isAnexe ? ' - (Anexo)' : ''}`}</span>
        </li>
      </ul>

      {(payload[0]?.payload?.accumulatedOfferingPEN > 0 &&
        payload[0]?.payload?.accumulatedOfferingUSD > 0) ||
      (payload[0]?.payload?.accumulatedOfferingPEN > 0 &&
        payload[0]?.payload?.accumulatedOfferingEUR > 0) ? (
        <p className='font-medium text-[13.5px] sm:text-[13.5px] dark:text-yellow-500 text-amber-500'>
          Totales acumulados:
        </p>
      ) : (
        <p className='font-medium text-[13.5px] sm:text-[13.5px] dark:text-yellow-500 text-amber-500'>
          Total acumulado:
        </p>
      )}

      <ul className='list-disc pl-3 sm:pl-4 flex flex-col gap-1'>
        {payload[0]?.payload?.accumulatedOfferingPEN > 0 && (
          <li className='font-medium text-[13.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
            <span className='sm:-ml-1'>{`Soles: ${payload[0]?.payload?.accumulatedOfferingPEN} PEN`}</span>
          </li>
        )}

        {payload[0]?.payload?.accumulatedOfferingUSD > 0 && (
          <li className='font-medium text-[13.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
            <span className='sm:-ml-1'>{`Dolares: ${payload[0]?.payload?.accumulatedOfferingUSD} USD`}</span>
          </li>
        )}

        {payload[0]?.payload?.accumulatedOfferingEUR > 0 && (
          <li className='font-medium text-[13.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
            <span className='sm:-ml-1'>{`Euros: ${payload[0]?.payload?.accumulatedOfferingEUR} EUR`}</span>
          </li>
        )}
      </ul>
    </div>
  );
};
