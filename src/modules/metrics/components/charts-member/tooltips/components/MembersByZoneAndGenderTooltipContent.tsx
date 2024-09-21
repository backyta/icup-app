import { getPercent } from '@/modules/metrics/helpers';
import { type MembersByZoneAndGenderTooltipConfig } from '@/modules/metrics/components/charts-member/tooltips/interfaces';

export const MembersByZoneAndGenderTooltipContent = (
  props: MembersByZoneAndGenderTooltipConfig
): JSX.Element => {
  const { payload, label } = props;
  const total = payload.reduce((result, entry) => result + entry.value, 0);

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <div className='flex gap-1'>
        <span className='font-medium text-[12px] sm:text-[14px]'>{label}</span>
      </div>
      <ul className='list grid gap-1.5'>
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            className='font-medium text-[14px]'
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
      <p className='font-medium text-[11.5px] sm:text-[13.5px] dark:text-slate-400 text-slate-500'>
        Miembros totales: {total}
      </p>
      <p className='font-medium text-[10.5px] sm:text-[12.5px] dark:text-amber-400 text-amber-500'>
        Porcentaje total general: {`${payload[0]?.payload?.totalPercentage}%`}
      </p>
      <p className='font-medium text-[10.5px] sm:text-[12.5px] dark:text-teal-400 text-teal-500'>
        Supervisor: {payload[0]?.payload?.supervisor}
      </p>
    </div>
  );
};
