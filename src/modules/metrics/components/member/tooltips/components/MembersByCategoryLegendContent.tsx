/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { type MembersByCategoryLegendConfig } from '@/modules/metrics/components/member/tooltips/interfaces/members-by-category-legend-config.interface';

export const MembersByCategoryLegendContent = (props: any): JSX.Element => {
  const { payload } = props;
  const newPayload: MembersByCategoryLegendConfig[] = payload;

  return (
    <div>
      <ul className='flex gap-5 md:gap-0 flex-wrap md:flex-nowrap gap-y-1 md:w-[28rem] justify-center md:-ml-12 p-2 md:pb-4'>
        {newPayload.map((item, _) => (
          <li
            key={`${item?.payload?.category}`}
            className='font-medium text-[13px] md:text-[14px] w-[4rem] md:w-full'
          >
            <span
              className='inline-block h-2.5 w-2.5 rounded-[2px] mr-2'
              style={{
                backgroundColor: item.color,
                border: `1px solid ${item.color}`,
              }}
            ></span>
            {item?.payload?.tooltipPayload
              ? item.payload?.tooltipPayload[0].payload.ageRange
              : item.payload?.payload?.ageRange}
          </li>
        ))}
      </ul>
    </div>
  );
};
