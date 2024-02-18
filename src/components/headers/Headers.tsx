import { ModeToggle } from '../mode-toggle';

export const Headers = (): JSX.Element => {
  return (
    <div>
      <div className='w-full flex -mb-14 items-center justify-end py-[10px] px-[2rem]'>
        <div className='left'>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
