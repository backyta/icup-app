import { ModeToggle } from './mode-toggle';

export const ToggleLayout = (): JSX.Element => {
  return (
    <div>
      <div className='hidden md:w-full md:flex md:-mb-14 md:items-center md:justify-end md:py-[10px] lg:px-[2rem] md:px-[0rem] '>
        <ModeToggle />
      </div>
    </div>
  );
};
