import { type TooltipConfig } from '@/shared/interfaces/tooltip-config.interface';
import { type ComparativeOfferingExpensesPayloadBySubType } from '@/modules/metrics/components/financial-balance-comparative/tooltips/interfaces/comparative-offering-expenses-by-sub-type-tooltip-payload.interface';

export const ComparativeOfferingExpensesBySubTypeTooltipContent = (
  props: TooltipConfig<ComparativeOfferingExpensesPayloadBySubType>
): JSX.Element => {
  const { payload } = props;

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <p>
        <span className='font-medium text-[14px] sm:text-[14px]'>{`${payload[0]?.payload?.subType}`}</span>

        <span className='font-medium text-[14px] sm:text-[14px] dark:text-slate-400 text-slate-500'>{` (${payload[0]?.payload?.totalPercentage}%)`}</span>
      </p>

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

      {payload[0]?.payload?.accumulatedOfferingPEN > 0 && (
        <div className='flex items-center'>
          <span
            className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
            style={{
              backgroundColor: '#4682B4',
              border: `1px solid #4682B4`,
            }}
          ></span>
          <p className='-mt-[2px] font-medium text-[13.5px] sm:text-[13.5px] text-[#4682B4]'>
            Soles:
            <span className='text-foreground pl-1'>{`${payload[0]?.payload?.accumulatedOfferingPEN} PEN`}</span>
          </p>
        </div>
      )}

      {payload[0]?.payload?.accumulatedOfferingUSD > 0 && (
        <div className='flex items-center'>
          <span
            className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
            style={{
              backgroundColor: '#228B22',
              border: `1px solid #228B22`,
            }}
          ></span>
          <p className='-mt-[2px] font-medium text-[13.5px] sm:text-[13.5px] text-[#228B22]'>
            Dolares:
            <span className='text-foreground pl-1'>{`${payload[0]?.payload?.accumulatedOfferingUSD} USD`}</span>
          </p>
        </div>
      )}

      {payload[0]?.payload?.accumulatedOfferingEUR > 0 && (
        <div className='flex items-center'>
          <span
            className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
            style={{
              backgroundColor: '#FF69B4',
              border: `1px solid #FF69B4`,
            }}
          ></span>
          <p className='-mt-[2px] font-medium text-[13.5px] sm:text-[13.5px] text-[#FF69B4]'>
            Euros:
            <span className='text-foreground pl-1'>{`${payload[0]?.payload?.accumulatedOfferingEUR} EUR`}</span>
          </p>
        </div>
      )}

      <ul className='list-disc pl-3 sm:pl-4 flex flex-col gap-1'>
        <li className={'font-medium text-[13.5px] sm:text-[13.5px]'}>
          <span className='sm:-ml-1'>{`Iglesia: ${payload[0]?.payload?.church?.abbreviatedChurchName} ${payload[0]?.payload?.church?.isAnexe ? ' - (Anexo)' : ''}`}</span>
        </li>
      </ul>
    </div>
  );
};
