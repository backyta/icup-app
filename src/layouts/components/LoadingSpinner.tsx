import { cn } from '@/shared/lib/utils';
import { useLocation } from 'react-router-dom';

const bibleVerses = [
  'El Señor es mi pastor; nada me faltará. - Salmos 23:1',
  'Todo lo puedo en Cristo que me fortalece. - Filipenses 4:13',
  'Porque yo sé los planes que tengo para ustedes, planes de bienestar y no de calamidad, para darles un futuro y una esperanza. - Jeremías 29:11',
  'El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso. - 1 Corintios 13:4',
  'Y sabemos que en todas las cosas Dios trabaja para el bien de aquellos que lo aman. - Romanos 8:28',
  'El Señor es mi luz y mi salvación; ¿a quién temeré? - Salmos 27:1',
  'Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas. - Isaías 40:31',
  'El Señor es bueno, un refugio en tiempos de angustia. - Nahúm 1:7',
  'Bienaventurados los pacificadores, porque ellos serán llamados hijos de Dios. - Mateo 5:9',
  'El Señor está cerca de todos los que lo invocan. - Salmos 145:18',
];

const getRandomVerse = (): string => {
  const randomIndex = Math.floor(Math.random() * bibleVerses.length);
  return bibleVerses[randomIndex];
};

export const LoadingSpinner = (): JSX.Element => {
  const verse = getRandomVerse();
  const { pathname } = useLocation();

  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center md:min-h-full text-slate-100 dark:bg-slate-950',
        (pathname === '/churches/search-churches' ||
          pathname === '/churches/search-by-term-churches' ||
          pathname === '/churches/update-church' ||
          pathname === '/churches/delete-church') &&
          'min-h-full'
      )}
    >
      <div className='flex flex-col items-center justify-center'>
        <div className='loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-32 w-32 mb-4'></div>
        <h2 className='text-center text-black dark:text-white text-xl font-semibold'>{verse}</h2>
      </div>
    </div>
  );
};
