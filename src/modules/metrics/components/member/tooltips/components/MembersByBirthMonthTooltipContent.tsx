import { type TooltipConfig } from '@/shared/interfaces/tooltip-config.interface';
import { type MembersByBirthMonthPayload } from '@/modules/metrics/components/member/tooltips/interfaces/members-by-birth-month-payload.interface';

export const MembersByBirthMonthTooltipContent = (
  props: TooltipConfig<MembersByBirthMonthPayload>
): JSX.Element => {
  const { payload, label } = props;

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <div className='flex gap-1'>
        <span className='font-medium text-[14px] sm:text-[14px]'>{label}</span>
      </div>
      <ul className='list grid gap-1.5'>
        {payload.map((entry, _) => (
          <li
            key={`${entry.dataKey}-${entry?.payload?.month?.toLowerCase()}`}
            className='font-medium text-[13.5px] md:text-[13.5px]'
            style={{ color: entry.color }}
          >
            <span
              className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
              style={{
                backgroundColor: entry.color,
                border: `1px solid ${entry.color}`,
              }}
            ></span>
            {`${entry.name === 'membersCount' ? 'N° miembros' : 'Edad promedio'}: ${entry.value} ${entry.name === 'averageAge' ? 'años' : ''}`}
          </li>
        ))}
      </ul>

      <ul className='list-disc pl-3 sm:pl-4 flex flex-col gap-1.5'>
        <li
          className={
            'italic font-medium text-[13.5px] sm:text-[13.5px] dark:text-slate-300 text-slate-500'
          }
        >
          <span className='sm:-ml-1'>{`Iglesia: ${payload[0]?.payload?.church?.abbreviatedChurchName} ${payload[0]?.payload?.church?.isAnexe ? ' - (Anexo)' : ''}`}</span>
        </li>
      </ul>
    </div>
  );
};
