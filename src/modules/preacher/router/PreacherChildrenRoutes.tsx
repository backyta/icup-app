/* eslint-disable @typescript-eslint/promise-function-async */

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/shared/components/spinner/LoadingSpinner';

//! Lazy load children routes
const LazyPreacherInactivatePage = lazy(
  () => import('@/modules/preacher/pages/PreacherInactivatePage')
);
const LazyPreachersSearchPageByTerm = lazy(
  () => import('@/modules/preacher/pages/PreachersSearchPageByTerm')
);
const LazyPreachersGeneralSearchPage = lazy(
  () => import('@/modules/preacher/pages/PreachersGeneralSearchPage')
);
const LazyPreacherUpdatePage = lazy(() => import('@/modules/preacher/pages/PreacherUpdatePage'));
const LazyPreacherCreatePage = lazy(() => import('@/modules/preacher/pages/PreacherCreatePage'));

export const PreacherChildrenRoutes = [
  {
    path: 'create',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyPreacherCreatePage />,
      </Suspense>
    ),
  },
  {
    path: 'general-search',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyPreachersGeneralSearchPage />,
      </Suspense>
    ),
  },
  {
    path: 'search-by-term',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyPreachersSearchPageByTerm />,
      </Suspense>
    ),
  },
  {
    path: 'update',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyPreacherUpdatePage />,
      </Suspense>
    ),
  },
  {
    path: 'inactivate',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyPreacherInactivatePage />,
      </Suspense>
    ),
  },
];
