/* eslint-disable @typescript-eslint/promise-function-async */

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/shared/components/spinner/LoadingSpinner';

//! Lazy load children routes
const LazyCopastorInactivatePage = lazy(
  () => import('@/modules/copastor/pages/CopastorInactivatePage')
);
const LazyCopastorsSearchPageByTerm = lazy(
  () => import('@/modules/copastor/pages/CopastorsSearchPageByTerm')
);
const LazyCopastorsGeneralSearchPage = lazy(
  () => import('@/modules/copastor/pages/CopastorsGeneralSearchPage')
);
const LazyCopastorUpdatePage = lazy(() => import('@/modules/copastor/pages/CopastorUpdatePage'));
const LazyCopastorCreatePage = lazy(() => import('@/modules/copastor/pages/CopastorCreatePage'));

export const CopastorChildrenRoutes = [
  {
    path: '/copastors/create',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyCopastorCreatePage />
      </Suspense>
    ),
  },
  {
    path: '/copastors/general-search',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyCopastorsGeneralSearchPage />
      </Suspense>
    ),
  },
  {
    path: '/copastors/search-by-term',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyCopastorsSearchPageByTerm />
      </Suspense>
    ),
  },
  {
    path: '/copastors/update',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyCopastorUpdatePage />
      </Suspense>
    ),
  },
  {
    path: '/copastors/inactivate',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyCopastorInactivatePage />
      </Suspense>
    ),
  },
];
