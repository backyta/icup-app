import { addDays } from 'date-fns';

import { type TooltipConfig } from '@/shared/interfaces';
import { dateFormatterToDDMMYY } from '@/shared/helpers';

import {
  type OfferingIncomeCreationCategory,
  OfferingIncomeCreationCategoryNames,
} from '@/modules/offering/income/enums';
import { CurrencyType } from '@/modules/offering/shared/enums';
import { type OfferingIncomePayloadByActivities } from '@/modules/metrics/components/offering-income/tooltips/interfaces';

export const OfferingIncomeByActivitiesTooltipContent = (
  props: TooltipConfig<OfferingIncomePayloadByActivities>
): JSX.Element => {
  const { payload, label } = props;

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <p>
        <span className='font-semibold text-[12px] sm:text-[14px]'>{`${dateFormatterToDDMMYY(addDays(label, 1))}`}</span>
      </p>
      <span className='font-semibold text-[12px] md:text-[14px]'>Lista de Ofrendas</span>
      {payload?.[0]?.payload?.allOfferings.map((off, index) => (
        <>
          <div key={index}>
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
            <span className='font-medium text-[12px] md:text-[14px]'>{`${index + 1}° Ofrenda:`}</span>
            <span
              className='pl-1 dark:text-white text-black font-normal text-[12px] md:text-[14px]'
              key={`item-${index}`}
            >
              {`${off.offering} ${off.currency}`}
            </span>
          </div>
        </>
      ))}

      <li className={'pl-[2px] font-medium text-[11.5px] sm:text-[13px]'}>
        <span className='-ml-2'>{`Categoría: ${OfferingIncomeCreationCategoryNames[payload[0]?.payload?.category as OfferingIncomeCreationCategory]}`}</span>
      </li>

      <li className={'pl-[2px] font-medium text-[11.5px] sm:text-[13px]'}>
        <span className='-ml-2'>{`Iglesia: ${payload[0]?.payload?.church?.abbreviatedChurchName} ${payload[0]?.payload?.church?.isAnexe ? ' - (Anexo)' : ''}`}</span>
      </li>
    </div>
  );
};
