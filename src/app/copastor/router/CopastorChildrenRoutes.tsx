import { MemberCreatePage } from '@/shared/pages';
import {
  CopastorDeletePage,
  CopastorsGeneralSearchPage,
  CopastorsSearchPageByTerm,
  CopastorUpdatePage,
} from '../pages';

export const CopastorChildrenRoutes = [
  {
    path: '/copastors/create-copastor',
    element: <MemberCreatePage />,
  },
  {
    path: '/copastors/search-copastors',
    element: <CopastorsGeneralSearchPage />,
  },
  {
    path: '/copastors/search-by-term-copastors',
    element: <CopastorsSearchPageByTerm />,
  },
  {
    path: '/copastors/update-copastor',
    element: <CopastorUpdatePage />,
  },
  {
    path: '/copastors/delete-copastor',
    element: <CopastorDeletePage />,
  },
];
