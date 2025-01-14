/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { addDays } from 'date-fns';

import { type TooltipConfig } from '@/shared/interfaces/tooltip-config.interface';
import { dateFormatterToDDMMYY } from '@/shared/helpers/date-formatter-to-ddmmyyyy.helper';

import {
  type OfferingIncomeCreationCategory,
  OfferingIncomeCreationCategoryNames,
} from '@/modules/offering/income/enums/offering-income-creation-category.enum';
import { CurrencyType } from '@/modules/offering/shared/enums/currency-type.enum';

import { type OfferingIncomePayloadByUnitedService } from '@/modules/metrics/components/offering-income/tooltips/interfaces/offering-income-by-united-service-tooltip-payload.interface';

export const OfferingIncomeByUnitedServiceTooltipContent = (
  props: TooltipConfig<OfferingIncomePayloadByUnitedService>
): JSX.Element => {
  const { payload, label } = props;

  const getStyle = (currency: string) => ({
    backgroundColor:
      currency === CurrencyType.PEN
        ? 'var(--color-accumulatedOfferingPEN)'
        : currency === CurrencyType.USD
          ? 'var(--color-accumulatedOfferingUSD)'
          : 'var(--color-accumulatedOfferingEUR)',
    border:
      currency === CurrencyType.PEN
        ? '1px var(--color-accumulatedOfferingPEN)'
        : currency === CurrencyType.USD
          ? '1px var(--color-accumulatedOfferingUSD)'
          : '1px var(--color-accumulatedOfferingEUR)',
  });

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <p>
        <span className='font-semibold text-[14px] sm:text-[14px]'>{`${dateFormatterToDDMMYY(addDays(label, 1))}`}</span>
      </p>
      {payload?.[0]?.payload?.allOfferings.length > 1 && (
        <span className='font-medium text-[13.5px] md:text-[13.5px]'>Lista de Ofrendas</span>
      )}

      {payload?.[0]?.payload?.allOfferings.map((off, index) => (
        <div key={`${String(off.date)}-${off.currency}`}>
          <span
            className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
            style={getStyle(off.currency)}
          ></span>
          <span className='font-medium text-[13.5px] md:text-[13.5px]'>
            {payload?.[0]?.payload?.allOfferings.length > 1 ? `${index + 1}° Ofrenda:` : `Ofrenda:`}
          </span>
          <span className='pl-1 dark:text-white text-black font-normal text-[13.5px] md:text-[13.5px]'>
            {`${off.offering.toFixed(2)} ${off.currency}`}
          </span>
        </div>
      ))}

      <ul className='list-disc pl-3 sm:pl-4 flex flex-col gap-1.5'>
        <li
          className={
            'font-medium italic text-[13.5px] sm:text-[13.5px] dark:text-slate-300 text-slate-500'
          }
        >
          <span className='sm:-ml-1'>{`Categoría: ${OfferingIncomeCreationCategoryNames[payload[0]?.payload?.category as OfferingIncomeCreationCategory]}`}</span>
        </li>
        <li
          className={
            'font-medium italic text-[13.5px] sm:text-[13.5px] dark:text-slate-300 text-slate-500'
          }
        >
          <span className='sm:-ml-1'>{`Iglesia: ${payload[0]?.payload?.church?.abbreviatedChurchName} ${payload[0]?.payload?.church?.isAnexe ? ' - (Anexo)' : ''}`}</span>
        </li>
      </ul>
    </div>
  );
};
