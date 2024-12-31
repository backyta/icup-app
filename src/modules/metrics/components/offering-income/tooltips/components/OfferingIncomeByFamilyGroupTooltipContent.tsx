import { addDays } from 'date-fns';

import { CurrencyType } from '@/modules/offering/shared/enums/currency-type.enum';

import { type TooltipConfig } from '@/shared/interfaces/tooltip-config.interface';
import { dateFormatterToDDMMYY } from '@/shared/helpers/date-formatter-to-ddmmyyyy.helper';

import { type OfferingIncomePayloadByFamilyGroup } from '@/modules/metrics/components/offering-income/tooltips/interfaces/offering-income-by-family-group-tooltip-payload.interface';
import {
  type OfferingIncomeCreationCategory,
  OfferingIncomeCreationCategoryNames,
} from '@/modules/offering/income/enums/offering-income-creation-category.enum';

export const OfferingIncomeByFamilyGroupTooltipContent = (
  props: TooltipConfig<OfferingIncomePayloadByFamilyGroup>
): JSX.Element => {
  const { payload, label } = props;

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <p>
        <span className='font-semibold text-[14px] sm:text-[14px]'>{`${payload[0]?.payload?.familyGroup?.familyGroupName}`}</span>
        <span className='font-semibold text-[13px] sm:text-[13px]'>{` ~ ${label}`}</span>
      </p>
      <span className='font-medium text-[13.5px] md:text-[13.5px]'>Lista de Ofrendas</span>
      {payload?.[0]?.payload?.allOfferings.map((off, index) => (
        <div key={`${String(off.date)}-${off.currency}`}>
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
          <span className='font-medium text-[13.5px] md:text-[13.5px]'>{`${index + 1}° Ofrenda:`}</span>
          <span className='pl-1 dark:text-white text-black font-normal text-[13.5px] md:text-[13.5px]'>
            {`${off.offering} ${off.currency} - ${dateFormatterToDDMMYY(addDays(off.date, 1))}`}
          </span>
        </div>
      ))}

      <ul className='list-disc pl-3 sm:pl-4 flex flex-col gap-1'>
        <li className='font-medium italic text-[13.5px] sm:text-[13.5px]'>
          <span className='sm:-ml-1'>{`Miembros: ${payload[0]?.payload?.disciples}`}</span>
        </li>
        <li className={'font-medium italic text-[13.5px] sm:text-[13.5px]'}>
          <span className='sm:-ml-1'>{`Predicador: ${payload[0]?.payload?.preacher?.firstNames} ${payload[0]?.payload?.preacher?.lastNames}`}</span>
        </li>
        <li className={'font-medium italic text-[13.5px] sm:text-[13.5px]'}>
          <span className='sm:-ml-1'>{`Supervisor: ${payload[0]?.payload?.supervisor?.firstNames} ${payload[0]?.payload?.supervisor?.lastNames}`}</span>
        </li>

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
