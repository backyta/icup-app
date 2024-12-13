import { PastorUpdatePage } from '@/modules/pastor/pages/PastorUpdatePage';
import { PastorCreatePage } from '@/modules/pastor/pages/PastorCreatePage';
import { PastorInactivatePage } from '@/modules/pastor/pages/PastorInactivatePage';
import { PastorsSearchPageByTerm } from '@/modules/pastor/pages/PastorsSearchPageByTerm';
import { PastorsGeneralSearchPage } from '@/modules/pastor/pages/PastorsGeneralSearchPage';

export const PastorChildrenRoutes = [
  {
    path: '/pastors/create',
    element: <PastorCreatePage />,
  },
  {
    path: '/pastors/general-search',
    element: <PastorsGeneralSearchPage />,
  },
  {
    path: '/pastors/search-by-term',
    element: <PastorsSearchPageByTerm />,
  },
  {
    path: '/pastors/update',
    element: <PastorUpdatePage />,
  },
  {
    path: '/pastors/inactivate',
    element: <PastorInactivatePage />,
  },
];
