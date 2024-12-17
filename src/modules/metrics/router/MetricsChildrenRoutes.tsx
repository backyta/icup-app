/* eslint-disable @typescript-eslint/promise-function-async */

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/shared/components/spinner/LoadingSpinner';

//! Lazy load children routes
const LazyOfferingIncomeMetrics = lazy(
  () => import('@/modules/metrics/pages/OfferingIncomeMetrics')
);
const LazyOfferingExpenseMetrics = lazy(
  () => import('@/modules/metrics/pages/OfferingExpenseMetrics')
);
const LazyFinancialBalanceComparisonMetrics = lazy(
  () => import('@/modules/metrics/pages/FinancialBalanceComparisonMetrics')
);
const LazyMemberMetrics = lazy(() => import('@/modules/metrics/pages/MemberMetrics'));
const LazyFamilyGroupMetrics = lazy(() => import('@/modules/metrics/pages/FamilyGroupMetrics'));

export const MetricsChildrenRoutes = [
  {
    path: '/metrics/member',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyMemberMetrics />,
      </Suspense>
    ),
  },
  {
    path: '/metrics/family-group',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyFamilyGroupMetrics />,
      </Suspense>
    ),
  },
  {
    path: '/metrics/offering-income',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyOfferingIncomeMetrics />,
      </Suspense>
    ),
  },
  {
    path: '/metrics/offering-expense',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyOfferingExpenseMetrics />,
      </Suspense>
    ),
  },
  {
    path: '/metrics/offering-comparative',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyFinancialBalanceComparisonMetrics />,
      </Suspense>
    ),
  },
];
