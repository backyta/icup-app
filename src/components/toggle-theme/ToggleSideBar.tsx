import { ModeToggle } from '../mode-toggle';

export const ToggleSideBar = (): JSX.Element => {
  return (
    <div>
      <div className='flex -mb-14 justify-end pt-[12px] px-[4rem]  md:hidden'>
        <ModeToggle />
      </div>
    </div>
  );
};
