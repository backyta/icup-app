import { PreacherUpdatePage } from '@/modules/preacher/pages/PreacherUpdatePage';
import { PreacherCreatePage } from '@/modules/preacher/pages/PreacherCreatePage';
import { PreacherInactivatePage } from '@/modules/preacher/pages/PreacherInactivatePage';
import { PreachersSearchPageByTerm } from '@/modules/preacher/pages/PreachersSearchPageByTerm';
import { PreachersGeneralSearchPage } from '@/modules/preacher/pages/PreachersGeneralSearchPage';

export const PreacherChildrenRoutes = [
  {
    path: '/preachers/create',
    element: <PreacherCreatePage />,
  },
  {
    path: '/preachers/general-search',
    element: <PreachersGeneralSearchPage />,
  },
  {
    path: '/preachers/search-by-term',
    element: <PreachersSearchPageByTerm />,
  },
  {
    path: '/preachers/update',
    element: <PreacherUpdatePage />,
  },
  {
    path: '/preachers/inactivate',
    element: <PreacherInactivatePage />,
  },
];
