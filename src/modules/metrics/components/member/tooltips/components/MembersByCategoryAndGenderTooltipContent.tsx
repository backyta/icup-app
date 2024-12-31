import { getPercent } from '@/modules/metrics/helpers/get-percent.helper';

import { type TooltipConfig } from '@/shared/interfaces/tooltip-config.interface';
import { type MembersByCategoryAndGenderPayload } from '@/modules/metrics/components/member/tooltips/interfaces/members-by-category-and-gender-tooltip-payload.interface';

export const MembersByCategoryAndGenderTooltipContent = (
  props: TooltipConfig<MembersByCategoryAndGenderPayload>
): JSX.Element => {
  const { payload, label } = props;
  const total = payload.reduce((result, entry) => result + entry.value, 0);

  return (
    <div className='grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'>
      <div className='flex gap-1'>
        <span className='font-medium text-[14px] sm:text-[14px]'>{label}</span>
        <span className='font-medium text-[14px] sm:text-[14px]'>
          {`${
            label === 'Niño'
              ? `(0-12)`
              : label === 'Adolescente'
                ? '(13-17)'
                : label === 'Joven'
                  ? '(18-29)'
                  : label === 'Adulto'
                    ? '(30-59)'
                    : label === 'Adulto Mayor'
                      ? '(60-74)'
                      : '(+75)'
          }`}
        </span>
      </div>
      <ul className='list grid gap-1.5'>
        {payload.map((entry, _) => (
          <li
            key={`${entry.dataKey}-${entry?.payload?.category}`}
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

      <ul className='list-disc pl-3 sm:pl-4 flex flex-col gap-1'>
        <li className='font-medium italic text-[13.5px] sm:text-[13.5px] dark:text-emerald-500 text-emerald-500'>
          <span className='sm:-ml-1'>Miembros totales: {total}</span>
        </li>

        <li
          className={
            'italic font-medium text-[13.5px] sm:text-[13.5px] dark:text-slate-300 text-slate-500'
          }
        >
          <span className='sm:-ml-1'>{`Iglesia: ${payload[0]?.payload?.church?.abbreviatedChurchName} ${payload[0]?.payload?.church?.isAnexe ? ' - (Anexo)' : ''}`}</span>
        </li>
      </ul>

      <p className='font-medium text-[13.5px] sm:text-[13.5px] dark:text-yellow-500 text-amber-500'>
        Porcentaje total general:{' '}
        {`${isNaN(+payload[0]?.payload?.totalPercentage) ? '0' : payload[0]?.payload?.totalPercentage}%`}
      </p>
    </div>
  );
};
