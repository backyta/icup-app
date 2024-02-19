import classNames from 'classnames';

interface Props {
  children?: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export const WhiteCard = ({
  children,
  centered,
  className,
}: Props): JSX.Element => {
  return (
    <div
      className={classNames(
        'border-[1.5px] rounded-[20px] shadow-3xl shadow-shadow-500 w-full border-slate-500 h-[9rem] sm:h-[11rem] lg:h-full xl:h-full 2xl:h-full gap-0 lg:gap-2 p-4 justify-center xl:gap-4 ease-in duration-200 dark:hover:bg-slate-800 hover:bg-slate-200',
        className,
        {
          'text-center': centered,
          'flex flex-col items-center': centered,
        }
      )}
    >
      {children}
    </div>
  );
};
