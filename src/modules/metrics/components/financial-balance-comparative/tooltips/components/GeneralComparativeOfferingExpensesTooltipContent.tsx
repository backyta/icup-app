import { type TooltipConfig } from '@/shared/interfaces/tooltip-config.interface';
import { type GeneralComparativeOfferingExpensesPayload } from '@/modules/metrics/components/financial-balance-comparative/tooltips/interfaces/general-comparative-offering-expenses-tooltip-payload.interface';

export const GeneralComparativeOfferingExpensesTooltipContent = (
  props: TooltipConfig<GeneralComparativeOfferingExpensesPayload>
): JSX.Element => {
  const { payload } = props;

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <p>
        <span className='font-medium text-[14px] sm:text-[14px]'>{`${payload[0]?.payload?.type}`}</span>

        <span className='font-medium text-[14px] sm:text-[14px] text-slate-500 md:text-slate-400'>{` (${payload[0]?.payload?.totalPercentage}%)`}</span>
      </p>

      {(payload[0]?.payload?.accumulatedOfferingPEN > 0 &&
        payload[0]?.payload?.accumulatedOfferingUSD > 0) ||
      (payload[0]?.payload?.accumulatedOfferingPEN > 0 &&
        payload[0]?.payload?.accumulatedOfferingEUR > 0) ? (
        <p className='font-medium text-[13.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
          Totales acumulados:
        </p>
      ) : (
        <p className='font-medium text-[13.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
          Total acumulado:
        </p>
      )}

      {payload[0]?.payload?.accumulatedOfferingPEN > 0 && (
        <div className='flex items-center'>
          <span
            className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
            style={{
              backgroundColor: '#ed5846',
              border: `1px solid #ed5846`,
            }}
          ></span>
          <p className='-mt-[2px] font-medium text-[13.5px] sm:text-[13.5px] text-[#ed5846]'>
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
              backgroundColor: '#399df8',
              border: `1px solid #399df8`,
            }}
          ></span>
          <p className='-mt-[2px] font-medium text-[13.5px] sm:text-[13.5px] text-[#399df8]'>
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
              backgroundColor: '#FFD700',
              border: `1px solid #FFD700`,
            }}
          ></span>
          <p className='-mt-[2px] font-medium text-[13.5px] sm:text-[13.5px] text-[#FFD700]'>
            Euros:
            <span className='text-foreground pl-1'>{`${payload[0]?.payload?.accumulatedOfferingEUR} EUR`}</span>
          </p>
        </div>
      )}

      <li className={'font-medium text-[13.5px] sm:text-[13.5px]'}>
        <span className='-ml-2'>{`Iglesia: ${payload[0]?.payload?.church?.abbreviatedChurchName} ${payload[0]?.payload?.church?.isAnexe ? ' - (Anexo)' : ''}`}</span>
      </li>
    </div>
  );
};
