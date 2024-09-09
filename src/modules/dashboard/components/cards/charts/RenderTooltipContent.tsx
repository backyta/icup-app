/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { cn } from '@/shared/lib/utils';

import { CurrencyType } from '@/modules/offering/shared/enums';
import { type TooltipConfig } from '@/modules/dashboard/interfaces';

export const RenderTooltipContent = (props: TooltipConfig): JSX.Element => {
  const { payload, label } = props;

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <p>
        <span className='font-medium text-[12.5px] sm:text-[14.5px]'>{`${payload[0]?.payload?.familyGroup?.familyGroupName}`}</span>
        <span className='font-medium text-[11px] sm:text-[12.5px]'>{` ~ ${label}`}</span>
      </p>
      <ul className={'list flex flex-col justify-center gap-1.5'}>
        {payload.map((entry, index: any) => (
          <li
            key={`item-${index}`}
            className={cn('flex items-center font-medium text-[12.5px] sm:text-[14px]')}
          >
            {((entry?.name === 'accumulatedOfferingEUR' &&
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
              <div>
                <span
                  className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
                  style={{
                    backgroundColor: entry.color,
                    border: `1px solid ${entry.color}`,
                  }}
                ></span>
                <span className='font-semibold'>{`Ultima Ofrenda:`}</span>
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
                  ? entry?.payload?.allOfferings?.find(
                      (item: any) => item.currency === CurrencyType.PEN
                    )?.date
                  : entry?.name === 'accumulatedOfferingUSD'
                    ? entry?.payload?.allOfferings?.find(
                        (item: any) => item.currency === CurrencyType.USD
                      )?.date
                    : entry?.payload?.allOfferings?.find(
                        (item: any) => item.currency === CurrencyType.EUR
                      )?.date
              }`}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>

      <li
        className={cn(
          'pl-1 font-medium text-[12px] sm:text-[13.5px] -mt-[0.4rem]',
          payload[0]?.payload?.allOfferings?.some(
            (item: any) => item.currency === CurrencyType.PEN
          ) && 'pl-1 font-medium text-[12px] sm:text-[13.5px] -mt-3',
          payload[0]?.payload?.allOfferings?.some(
            (item: any) => item.currency === CurrencyType.USD
          ) && 'pl-1 font-medium text-[12px] sm:text-[13.5px] -mt-1',
          payload[0]?.payload?.allOfferings?.some(
            (item: any) => item.currency === CurrencyType.USD
          ) &&
            payload[0]?.payload?.allOfferings?.find(
              (item: any) => item.currency === CurrencyType.PEN
            ) &&
            payload[0]?.payload?.allOfferings?.find(
              (item: any) => item.currency === CurrencyType.EUR
            ) &&
            'pl-1 font-medium text-[12px] sm:text-[13.5px] mt-0'
        )}
      >
        <span className='-ml-2'>{`Pred: ${payload[0]?.payload?.familyGroup?.theirPreacher?.firstName} ${payload[0]?.payload?.familyGroup?.theirPreacher?.lastName}`}</span>
      </li>
      <li className='pl-1 font-medium text-[12px] sm:text-[13.5px]'>
        <span className='-ml-2'>{`Miembros: ${payload[0]?.payload?.familyGroup?.disciples.length}`}</span>
      </li>

      {/* <p className='font-medium text-[12.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
        Ofrendas y fechas:
        <ul>
          {payload[0]?.payload?.allOfferings?.map((offering: any, index: number) => (
            <li key={index}>{`${offering.date}: ${offering.offering} soles`}</li>
          ))}
        </ul>
      </p> */}
      <p className='font-medium text-[12.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
        Totales Acumulados
      </p>
      <li className='pl-1 font-medium text-[12px] sm:text-[13px] dark:text-slate-400 text-slate-500'>
        <span className='-ml-2'>{`Soles: ${payload[0]?.payload?.accumulatedOfferingPEN} PEN`}</span>
      </li>
      <li className='pl-1 font-medium text-[12.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
        <span className='-ml-2'>{`Dolares: ${payload[0]?.payload?.accumulatedOfferingUSD} USD`}</span>
      </li>
      <li className='pl-1 font-medium text-[12.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
        <span className='-ml-2'>{`Euros: ${payload[0]?.payload?.accumulatedOfferingEUR} EUR`}</span>
      </li>
    </div>
  );
};
