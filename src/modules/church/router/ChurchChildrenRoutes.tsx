import { ChurchCreatePage } from '@/modules/church/pages/ChurchCreatePage';
import { ChurchUpdatePage } from '@/modules/church/pages/ChurchUpdatePage';
import { ChurchInactivatePage } from '@/modules/church/pages/ChurchInactivatePage';
import { ChurchesSearchPageByTerm } from '@/modules/church/pages/ChurchesSearchPageByTerm';
import { ChurchesGeneralSearchPage } from '@/modules/church/pages/ChurchesGeneralSearchPage';

export const ChurchChildrenRoutes = [
  {
    path: '/churches/create',
    element: <ChurchCreatePage />,
  },
  {
    path: '/churches/general-search',
    element: <ChurchesGeneralSearchPage />,
  },
  {
    path: '/churches/search-by-term',
    element: <ChurchesSearchPageByTerm />,
  },
  {
    path: '/churches/update',
    element: <ChurchUpdatePage />,
  },
  {
    path: '/churches/inactivate',
    element: <ChurchInactivatePage />,
  },
];
