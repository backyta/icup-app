import {
  PreacherCreatePage,
  PreacherUpdatePage,
  PreacherDeletePage,
  PreachersSearchPageByTerm,
  PreachersGeneralSearchPage,
} from '@/modules/preacher/pages';

export const PreacherChildrenRoutes = [
  {
    path: '/preachers/create-preacher',
    element: <PreacherCreatePage />,
  },
  {
    path: '/preachers/search-preachers',
    element: <PreachersGeneralSearchPage />,
  },
  {
    path: '/preachers/search-preachers-by-term',
    element: <PreachersSearchPageByTerm />,
  },
  {
    path: '/preachers/update-preacher',
    element: <PreacherUpdatePage />,
  },
  {
    path: '/preachers/delete-preacher',
    element: <PreacherDeletePage />,
  },
];
