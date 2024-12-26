import { type TooltipConfig } from '@/shared/interfaces/tooltip-config.interface';
import { type FamilyGroupsByDistrictPayload } from '@/modules/metrics/components/family-group/tooltips/interfaces/family-groups-by-district-tooltip-config.interface';

export const FamilyGroupsByDistrictTooltipContent = (
  props: TooltipConfig<FamilyGroupsByDistrictPayload>
): JSX.Element => {
  const { payload, label } = props;

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <div className='flex gap-1'>
        <span className='font-medium text-[14px] sm:text-[14px]'>{label}</span>
      </div>
      <ul className='list grid gap-1.5'>
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
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
            {`Grupos Familiares: ${entry.value}`}
          </li>
        ))}
      </ul>

      <li
        className={
          ' italic font-medium text-[13.5px] sm:text-[13.5px] dark:text-slate-300 text-slate-500'
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
