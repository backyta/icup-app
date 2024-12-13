import { DiscipleCreatePage } from '@/modules/disciple/pages/DiscipleCreatePage';
import { DiscipleUpdatePage } from '@/modules/disciple/pages/DiscipleUpdatePage';
import { DiscipleInactivatePage } from '@/modules/disciple/pages/DiscipleInactivatePage';
import { DisciplesSearchPageByTerm } from '@/modules/disciple/pages/DisciplesSearchPageByTerm';
import { DisciplesGeneralSearchPage } from '@/modules/disciple/pages/DisciplesGeneralSearchPage';

export const DiscipleChildrenRoutes = [
  {
    path: '/disciples/create',
    element: <DiscipleCreatePage />,
  },
  {
    path: '/disciples/general-search',
    element: <DisciplesGeneralSearchPage />,
  },
  {
    path: '/disciples/search-by-term',
    element: <DisciplesSearchPageByTerm />,
  },
  {
    path: '/disciples/update',
    element: <DiscipleUpdatePage />,
  },
  {
    path: '/disciples/inactivate',
    element: <DiscipleInactivatePage />,
  },
];
