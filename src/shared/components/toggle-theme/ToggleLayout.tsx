import { ModeToggle } from '@/shared/components';

export const ToggleLayout = (): JSX.Element => {
  return (
    <div>
      <div className='hidden md:block md:absolute right-10 top-3'>
        <ModeToggle />
      </div>
    </div>
  );
};
