import { ModeToggle } from '@/shared/components/toggle-theme/mode-toggle';

export const ToggleNavBar = (): JSX.Element => {
  return (
    <div className='text-white md:hidden'>
      <ModeToggle />
    </div>
  );
};
