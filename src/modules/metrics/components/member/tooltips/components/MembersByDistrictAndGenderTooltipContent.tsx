import { getPercent } from '@/modules/metrics/helpers/get-percent.helper';
import { type TooltipConfig } from '@/shared/interfaces/tooltip-config.interface';
import { type MembersByDistrictAndGenderPayload } from '@/modules/metrics/components/member/tooltips/interfaces/members-by-district-and-gender-tooltip-payload.interface';

export const MembersByDistrictAndGenderTooltipContent = (
  props: TooltipConfig<MembersByDistrictAndGenderPayload>
): JSX.Element => {
  const { payload, label } = props;
  const total = payload.reduce((result, entry) => result + entry.value, 0);

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <div className='flex gap-1'>
        <span className='font-medium text-[14px] sm:text-[14px]'>{label}</span>
      </div>
      <ul className='list grid gap-1.5'>
        {payload.map((entry, _) => (
          <li
            key={`${entry?.dataKey}-${entry?.payload?.district}`}
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
            {`${entry.name === 'men' ? 'Varones' : 'Mujeres'}: ${entry.value} (${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>

      <li className='font-medium italic text-[13.5px] sm:text-[13.5px] dark:text-emerald-500 text-emerald-500'>
        <span className='-ml-2'> Miembros totales: {total}</span>
      </li>

      <li
        className={
          'italic font-medium text-[13.5px] sm:text-[13.5px] dark:text-slate-300 text-slate-500'
        }
      >
        <span className='-ml-2'>{`Iglesia: ${payload[0]?.payload?.church?.abbreviatedChurchName} ${payload[0]?.payload?.church?.isAnexe ? ' - (Anexo)' : ''}`}</span>
      </li>

      <p className='font-medium text-[13.5px] sm:text-[13.5px] dark:text-yellow-500 text-amber-500'>
        Porcentaje total general: {`${payload[0]?.payload?.totalPercentage}%`}
      </p>
    </div>
  );
};
