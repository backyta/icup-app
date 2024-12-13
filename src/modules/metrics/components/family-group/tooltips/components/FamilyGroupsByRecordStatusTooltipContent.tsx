import { type TooltipConfig } from '@/shared/interfaces/tooltip-config.interface';
import { type FamilyGroupsByRecordStatusPayload } from '@/modules/metrics/components/family-group/tooltips/interfaces/family-groups-by-record-status-tooltip-config.interface';

export const FamilyGroupsByRecordStatusTooltipContent = (
  props: TooltipConfig<FamilyGroupsByRecordStatusPayload>
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
            className='font-medium text-[12px] md:text-[14px]'
            style={{ color: entry.color }}
          >
            <span
              className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
              style={{
                backgroundColor: entry.color,
                border: `1px solid ${entry.color}`,
              }}
            ></span>
            {`${payload[0]?.dataKey === 'active' ? 'Activos' : 'Inactivos'}: ${entry.value}`}
          </li>
        ))}
      </ul>
      <p className='font-medium text-[11.5px] sm:text-[13px] dark:text-slate-400 text-slate-500'>
        Supervisor: {`${payload[0]?.payload?.supervisor}`}
      </p>

      <li className={'pl-[2px] font-medium text-[11.5px] sm:text-[13px]'}>
        <span className='-ml-2'>{`Iglesia: ${payload[0]?.payload?.church?.abbreviatedChurchName} ${payload[0]?.payload?.church?.isAnexe ? ' - (Anexo)' : ''}`}</span>
      </li>
    </div>
  );
};
