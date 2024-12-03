import {
  PreacherCreatePage,
  PreacherUpdatePage,
  PreacherInactivatePage,
  PreachersSearchPageByTerm,
  PreachersGeneralSearchPage,
} from '@/modules/preacher/pages';

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
