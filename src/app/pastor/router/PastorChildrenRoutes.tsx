import { MemberCreatePage } from '@/shared/pages';
import {
  PastorDeletePage,
  PastorsGeneralSearchPage,
  PastorsSearchPageByTerm,
  PastorUpdatePage,
} from '@/app/pastor/pages';

export const PastorChildrenRoutes = [
  {
    path: '/pastors/create-pastor',
    element: <MemberCreatePage />,
  },
  {
    path: '/pastors/search-pastors',
    element: <PastorsGeneralSearchPage />,
  },
  {
    path: '/pastors/search-by-term-pastors',
    element: <PastorsSearchPageByTerm />,
  },
  {
    path: '/pastors/update-pastor',
    element: <PastorUpdatePage />,
  },
  {
    path: '/pastors/delete-pastor',
    element: <PastorDeletePage />,
  },
];
