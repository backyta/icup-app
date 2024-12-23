/* eslint-disable @typescript-eslint/promise-function-async */

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/shared/components/spinner/LoadingSpinner';

//! Lazy load children routes
const LazyOfferingIncomeCreatePage = lazy(
  () => import('@/modules/offering/income/pages/OfferingIncomeCreatePage')
);
const LazyOfferingIncomeUpdatePage = lazy(
  () => import('@/modules/offering/income/pages/OfferingIncomeUpdatePage')
);
const LazyOfferingIncomeInactivatePage = lazy(
  () => import('@/modules/offering/income/pages/OfferingIncomeInactivatePage')
);
const LazyOfferingsIncomeSearchPageByTerm = lazy(
  () => import('@/modules/offering/income/pages/OfferingsIncomeSearchPageByTerm')
);
const LazyOfferingsIncomeGeneralSearchPage = lazy(
  () => import('@/modules/offering/income/pages/OfferingsIncomeGeneralSearchPage')
);

export const OfferingIncomeChildrenRoutes = [
  {
    path: 'create',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyOfferingIncomeCreatePage />,
      </Suspense>
    ),
  },
  {
    path: 'general-search',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyOfferingsIncomeGeneralSearchPage />,
      </Suspense>
    ),
  },
  {
    path: 'search-by-term',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyOfferingsIncomeSearchPageByTerm />,
      </Suspense>
    ),
  },
  {
    path: 'update',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyOfferingIncomeUpdatePage />,
      </Suspense>
    ),
  },
  {
    path: 'inactivate',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyOfferingIncomeInactivatePage />,
      </Suspense>
    ),
  },
];
