import { ModeToggle } from '@/shared/components';

export const ToggleNavBar = (): JSX.Element => {
  return (
    <div>
      <div className='flex -mb-[4.25rem] justify-end pt-[16px] px-[4rem] md:hidden'>
        <ModeToggle />
      </div>
    </div>
  );
};