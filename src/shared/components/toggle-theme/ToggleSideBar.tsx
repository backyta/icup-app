import { ModeToggle } from '@/shared/components';

export const ToggleSideBar = (): JSX.Element => {
  return (
    <div>
      <div className='flex -mb-[3.75rem] justify-end pt-[16px] px-[4rem] md:hidden'>
        <ModeToggle />
      </div>
    </div>
  );
};
