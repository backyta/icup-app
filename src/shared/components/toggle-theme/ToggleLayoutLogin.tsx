import { ModeToggle } from '@/shared/components';

export const ToggleLayoutLogin = (): JSX.Element => {
  return (
    <div>
      <div className='md:w-full md:flex md:-mb-14 md:items-center md:justify-end md:py-[8px] lg:px-[2rem] md:px-[0rem] '>
        <ModeToggle />
      </div>
    </div>
  );
};
