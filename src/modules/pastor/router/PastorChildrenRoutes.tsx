/* eslint-disable @typescript-eslint/promise-function-async */

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/shared/components/spinner/LoadingSpinner';

//! Lazy load children routes
const LazyPastorsSearchPageByTerm = lazy(
  () => import('@/modules/pastor/pages/PastorsSearchPageByTerm')
);
const LazyPastorsGeneralSearchPage = lazy(
  () => import('@/modules/pastor/pages/PastorsGeneralSearchPage')
);
const PastorCreatePage = lazy(() => import('@/modules/pastor/pages/PastorCreatePage'));
const LazyPastorUpdatePage = lazy(() => import('@/modules/pastor/pages/PastorUpdatePage'));
const LazyPastorInactivatePage = lazy(() => import('@/modules/pastor/pages/PastorInactivatePage'));

export const PastorChildrenRoutes = [
  {
    path: '/pastors/create',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <PastorCreatePage />
      </Suspense>
    ),
  },
  {
    path: '/pastors/general-search',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyPastorsGeneralSearchPage />
      </Suspense>
    ),
  },
  {
    path: '/pastors/search-by-term',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyPastorsSearchPageByTerm />
      </Suspense>
    ),
  },
  {
    path: '/pastors/update',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyPastorUpdatePage />
      </Suspense>
    ),
  },
  {
    path: '/pastors/inactivate',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyPastorInactivatePage />
      </Suspense>
    ),
  },
];
