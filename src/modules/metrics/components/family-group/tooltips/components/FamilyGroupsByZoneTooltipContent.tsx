import { type TooltipConfig } from '@/shared/interfaces';

import { type FamilyGroupByZonePayload } from '@/modules/metrics/components/family-group/tooltips/interfaces';

export const FamilyGroupsByZoneTooltipContent = (
  props: TooltipConfig<FamilyGroupByZonePayload>
): JSX.Element => {
  const { payload, label } = props;

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
            {`Grupos familiares: ${entry.value}`}
          </li>
        ))}
      </ul>

      <p className='font-medium text-[11px] sm:text-[13px] dark:text-amber-400 text-amber-500'>
        Porcentaje: {`${payload[0]?.payload?.totalPercentage}%`}
      </p>
      <p className='font-medium text-[11px] sm:text-[13px] dark:text-teal-400 text-teal-500'>
        Supervisor: {payload[0]?.payload?.supervisor}
      </p>
    </div>
  );
};
