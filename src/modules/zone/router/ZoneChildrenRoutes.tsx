/* eslint-disable @typescript-eslint/promise-function-async */

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/shared/components/spinner/LoadingSpinner';

//! Lazy load children routes
const LazyZonesGeneralSearchPage = lazy(
  () => import('@/modules/zone/pages/ZonesGeneralSearchPage')
);
const LazyZoneCreatePage = lazy(() => import('@/modules/zone/pages/ZoneCreatePage'));
const LazyZoneUpdatePage = lazy(() => import('@/modules/zone/pages/ZoneUpdatePage'));
const LazyZoneInactivatePage = lazy(() => import('@/modules/zone/pages/ZoneInactivatePage'));
const LazyZonesSearchPageByTerm = lazy(() => import('@/modules/zone/pages/ZonesSearchPageByTerm'));

export const ZoneChildrenRoutes = [
  {
    path: '/zones/create',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyZoneCreatePage />,
      </Suspense>
    ),
  },
  {
    path: '/zones/general-search',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyZonesGeneralSearchPage />,
      </Suspense>
    ),
  },
  {
    path: '/zones/search-by-term',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyZonesSearchPageByTerm />,
      </Suspense>
    ),
  },
  {
    path: '/zones/update',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyZoneUpdatePage />,
      </Suspense>
    ),
  },
  {
    path: '/zones/inactivate',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyZoneInactivatePage />,
      </Suspense>
    ),
  },
];
