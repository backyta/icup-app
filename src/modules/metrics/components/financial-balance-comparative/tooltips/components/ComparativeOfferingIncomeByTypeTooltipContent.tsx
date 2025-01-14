import { type TooltipConfig } from '@/shared/interfaces/tooltip-config.interface';
import { type ComparativeOfferingIncomePayloadByType } from '@/modules/metrics/components/financial-balance-comparative/tooltips/interfaces/comparative-offering-income-by-type-tooltip-payload.interface';

export const ComparativeOfferingIncomeByTypeTooltipContent = (
  props: TooltipConfig<ComparativeOfferingIncomePayloadByType>
): JSX.Element => {
  const { payload } = props;

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <p>
        <span className='font-medium text-[14px] sm:text-[14px]'>{`${payload[0]?.payload?.type}`}</span>
        {payload[0]?.payload?.subType !== 'Ajuste por Ingreso' && (
          <span className='font-medium text-[14px] sm:text-[14px]'>{` ~ ${payload[0]?.payload?.subType}`}</span>
        )}

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
              backgroundColor: '#029012',
              border: `1px solid #029012`,
            }}
          ></span>
          <p className='-mt-[2px] font-medium text-[13.5px] sm:text-[13.5px] text-[#029012]'>
            Soles:
            <span className='text-foreground pl-1'>{`${payload[0]?.payload?.accumulatedOfferingPEN.toFixed(2)} PEN`}</span>
          </p>
        </div>
      )}

      {payload[0]?.payload?.accumulatedOfferingUSD > 0 && (
        <div className='flex items-center'>
          <span
            className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
            style={{
              backgroundColor: '#813cb4',
              border: `1px solid #813cb4`,
            }}
          ></span>
          <p className='-mt-[2px] font-medium text-[13.5px] sm:text-[13.5px] text-[#813cb4]'>
            Dolares:
            <span className='text-foreground pl-1'>{`${payload[0]?.payload?.accumulatedOfferingUSD.toFixed(2)} USD`}</span>
          </p>
        </div>
      )}

      {payload[0]?.payload?.accumulatedOfferingEUR > 0 && (
        <div className='flex items-center'>
          <span
            className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
            style={{
              backgroundColor: '#279fb3',
              border: `1px solid #279fb3`,
            }}
          ></span>
          <p className='-mt-[2px] font-medium text-[13.5px] sm:text-[13.5px] text-[#279fb3]'>
            Euros:
            <span className='text-foreground pl-1'>{`${payload[0]?.payload?.accumulatedOfferingEUR.toFixed(2)} EUR`}</span>
          </p>
        </div>
      )}

      <ul className='list-disc pl-3 sm:pl-4 flex flex-col gap-1.5'>
        <li className={'font-medium text-[13.5px] sm:text-[13.5px]'}>
          <span className='sm:-ml-1'>{`Iglesia: ${payload[0]?.payload?.church?.abbreviatedChurchName} ${payload[0]?.payload?.church?.isAnexe ? ' - (Anexo)' : ''}`}</span>
        </li>
      </ul>
    </div>
  );
};
