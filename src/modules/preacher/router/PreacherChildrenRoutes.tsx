import {
  PreacherCreatePage,
  PreacherUpdatePage,
  PreacherDeletePage,
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
    path: '/preachers/delete',
    element: <PreacherDeletePage />,
  },
];
