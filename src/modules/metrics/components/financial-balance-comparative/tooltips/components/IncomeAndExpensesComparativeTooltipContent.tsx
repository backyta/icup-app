import { type TooltipConfig } from '@/shared/interfaces/tooltip-config.interface';
import { type IncomeAndExpensesComparativePayload } from '@/modules/metrics/components/financial-balance-comparative/tooltips/interfaces/income-and-expenses-comparative-tooltip-payload.interface';

export const IncomeAndExpensesComparativeTooltipContent = (
  props: TooltipConfig<IncomeAndExpensesComparativePayload>
): JSX.Element => {
  const { payload, label } = props;

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <div className='flex gap-1'>
        <span className='font-medium text-[14px] sm:text-[14px]'>{label}</span>
      </div>

      <p className='font-medium text-[13.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
        {`${label === 'Enero' ? 'Saldo año anterior:' : 'Saldo mes anterior:'}`}{' '}
        {payload[0]?.payload?.netResultPrevious?.toFixed(2) ?? 0} {payload[0]?.payload?.currency}
      </p>

      <div className='flex items-center'>
        <span
          className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
          style={{
            backgroundColor: '#4ecb17',
            border: `1px solid #4ecb17`,
          }}
        ></span>
        <p className='font-medium text-[13.5px] md:text-[13.5px] text-[#4ecb17]'>
          Ingresos Totales:
          <span className='text-foreground pl-1'>{`${payload[0]?.payload?.totalIncome.toFixed(2)} ${payload[0]?.payload?.currency}`}</span>
        </p>
      </div>

      <div className='flex items-center'>
        <span
          className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
          style={{
            backgroundColor: '#ec564b',
            border: `1px solid #ec564b`,
          }}
        ></span>
        <p className='font-medium text-[13.5px] md:text-[13.5px] text-[#ec564b]'>
          Salidas Totales:
          <span className='text-foreground pl-1'>{`${payload[0]?.payload?.totalExpenses.toFixed(2)} ${payload[0]?.payload?.currency}`}</span>
        </p>
      </div>
      <p className='font-medium text-[13.5px] sm:text-[13.5px] dark:text-yellow-500 text-amber-500'>
        Diferencia: {payload[0]?.payload?.netResult.toFixed(2)} {payload[0]?.payload?.currency}
      </p>

      <ul className='list-disc pl-3 sm:pl-4 flex flex-col gap-1'>
        <li className={'font-medium text-[13.5px] sm:text-[13.5px]'}>
          <span className='sm:-ml-1'>{`Iglesia: ${payload[0]?.payload?.church?.abbreviatedChurchName} ${payload[0]?.payload?.church?.isAnexe ? ' - (Anexo)' : ''}`}</span>
        </li>
      </ul>
    </div>
  );
};
