/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { cn } from '@/shared/lib/utils';
import { useLocation } from 'react-router-dom';

const bibleVerses = [
  'El Señor es mi pastor; nada me faltará. - Salmos 23:1',
  'Todo lo puedo en Cristo que me fortalece. - Filipenses 4:13',
  'Porque yo sé los planes que tengo para ustedes, planes de bienestar y no de calamidad. - Jeremías 29:11',
  'El amor es paciente, es bondadoso. - 1 Corintios 13:4',
  'Dios trabaja para el bien de aquellos que lo aman. - Romanos 8:28',
  'El Señor es mi luz y mi salvación; ¿a quién temeré? - Salmos 27:1',
  'Los que esperan a Jehová tendrán nuevas fuerzas. - Isaías 40:31',
  'El Señor es bueno, un refugio en tiempos de angustia. - Nahúm 1:7',
  'Bienaventurados los pacificadores. - Mateo 5:9',
  'El Señor está cerca de los que lo invocan. - Salmos 145:18',
  'El que habita al abrigo del Altísimo morará bajo su sombra. - Salmos 91:1',
  'Bendice alma mía al Señor, y no olvides sus beneficios. - Salmos 103:2',
  'Con Dios haremos proezas. - Salmos 60:12',
  'Jehová peleará por vosotros, y vosotros estaréis tranquilos. - Éxodo 14:14',
  'Esforzaos y cobrad ánimo, no temáis ni tengáis miedo. - Deuteronomio 31:6',
];

interface SpinnerProps {
  isPendingRequest?: boolean;
}

const getRandomVerse = (): string => {
  const randomIndex = Math.floor(Math.random() * bibleVerses.length);
  return bibleVerses[randomIndex];
};

export const LoadingSpinner = ({ isPendingRequest }: SpinnerProps): JSX.Element => {
  const verse = getRandomVerse();
  const { pathname } = useLocation();

  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center md:min-h-full text-slate-100 dark:bg-slate-950',
        isPendingRequest && '-mt-[20rem] md:mt-0',
        !isPendingRequest &&
          'md:min-h-screen md:flex md:flex-col md:items-center md:justify-center -mt-[4rem]',
        (pathname === '/churches/general-search' ||
          pathname === '/churches/search-by-term' ||
          pathname === '/churches/update' ||
          pathname === '/churches/inactivate' ||
          pathname === '/pastors/general-search' ||
          pathname === '/pastors/search-by-term' ||
          pathname === '/pastors/update' ||
          pathname === '/pastors/inactivate' ||
          pathname === '/copastors/general-search' ||
          pathname === '/copastors/search-by-term' ||
          pathname === '/copastors/update' ||
          pathname === '/copastors/inactivate' ||
          pathname === '/supervisors/general-search' ||
          pathname === '/supervisors/search-by-term' ||
          pathname === '/supervisors/update' ||
          pathname === '/supervisors/inactivate' ||
          pathname === '/preachers/general-search' ||
          pathname === '/preachers/search-by-term' ||
          pathname === '/preachers/update' ||
          pathname === '/preachers/inactivate' ||
          pathname === '/disciples/general-search' ||
          pathname === '/disciples/search-by-term' ||
          pathname === '/disciples/update' ||
          pathname === '/disciples/inactivate' ||
          pathname === '/family-groups/general-search' ||
          pathname === '/family-groups/search-by-term' ||
          pathname === '/family-groups/update' ||
          pathname === '/family-groups/inactivate' ||
          pathname === '/zones/general-search' ||
          pathname === '/zones/search-by-term' ||
          pathname === '/zones/update' ||
          pathname === '/zones/inactivate' ||
          pathname === '/offerings/income/general-search' ||
          pathname === '/offerings/income/search-by-term' ||
          pathname === '/offerings/income/update' ||
          pathname === '/offerings/income/inactivate' ||
          pathname === '/offerings/expenses/general-search' ||
          pathname === '/offerings/expenses/search-by-term' ||
          pathname === '/offerings/expenses/update' ||
          pathname === '/offerings/expenses/inactivate' ||
          pathname === '/users/general-search' ||
          pathname === '/users/search-by-term' ||
          pathname === '/users/update' ||
          pathname === '/users/inactivate') &&
          'min-h-screen',
        (pathname === '/metrics/member' ||
          pathname === '/metrics/family-group' ||
          pathname === '/metrics/offering-income' ||
          pathname === '/metrics/offering-expenses' ||
          pathname === '/metrics/offering-comparative') &&
          'bg-slate-50/40 dark:bg-slate-950/10'
      )}
    >
      <div className='flex flex-col items-center justify-center px-4 mt-[2rem]'>
        {(pathname === '/churches' ||
          pathname === '/pastors' ||
          pathname === '/copastors' ||
          pathname === '/supervisors' ||
          pathname === '/zones' ||
          pathname === '/family-groups' ||
          pathname === '/offerings' ||
          pathname === '/offerings/income' ||
          pathname === '/offerings/expenses' ||
          pathname === '/preachers' ||
          pathname === '/disciples' ||
          pathname === '/users' ||
          pathname === '/metrics' ||
          pathname === '/zones' ||
          pathname === '/dashboard') && (
          <div className={cn('flex flex-col items-center justify-center space-y-4 min-h-screen')}>
            <div className='flex space-x-2'>
              <div className='w-4 h-4 bg-blue-500 rounded-full animate-bounce'></div>
              <div className='w-4 h-4 bg-blue-500 rounded-full animate-bounce animation-delay-200'></div>
              <div className='w-4 h-4 bg-blue-500 rounded-full animate-bounce animation-delay-400'></div>
            </div>
            <span className='text-blue-500 text-lg font-medium'>Cargando...</span>
          </div>
        )}

        {pathname !== '/churches' &&
          pathname !== '/pastors' &&
          pathname !== '/copastors' &&
          pathname !== '/supervisors' &&
          pathname !== '/zones' &&
          pathname !== '/family-groups' &&
          pathname !== '/offerings' &&
          pathname !== '/offerings/income' &&
          pathname !== '/offerings/expenses' &&
          pathname !== '/preachers' &&
          pathname !== '/disciples' &&
          pathname !== '/users' &&
          pathname !== '/metrics' &&
          pathname !== '/zones' &&
          pathname !== '/dashboard' && (
            <>
              <div
                className={cn(
                  'loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-32 w-32 mb-2',
                  pathname === '/dashboard' && '-mt-10'
                )}
              ></div>
              <h2 className='text-center text-black dark:text-white text-[15px] md:text-[18px] font-semibold'>
                {verse}
              </h2>
            </>
          )}
      </div>
    </div>
  );
};
