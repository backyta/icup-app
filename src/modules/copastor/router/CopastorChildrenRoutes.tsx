import { CopastorCreatePage } from '@/modules/copastor/pages/CopastorCreatePage';
import { CopastorUpdatePage } from '@/modules/copastor/pages/CopastorUpdatePage';
import { CopastorInactivatePage } from '@/modules/copastor/pages/CopastorInactivatePage';
import { CopastorsSearchPageByTerm } from '@/modules/copastor/pages/CopastorsSearchPageByTerm';
import { CopastorsGeneralSearchPage } from '@/modules/copastor/pages/CopastorsGeneralSearchPage';

export const CopastorChildrenRoutes = [
  {
    path: '/copastors/create',
    element: <CopastorCreatePage />,
  },
  {
    path: '/copastors/general-search',
    element: <CopastorsGeneralSearchPage />,
  },
  {
    path: '/copastors/search-by-term',
    element: <CopastorsSearchPageByTerm />,
  },
  {
    path: '/copastors/update',
    element: <CopastorUpdatePage />,
  },
  {
    path: '/copastors/inactivate',
    element: <CopastorInactivatePage />,
  },
];
