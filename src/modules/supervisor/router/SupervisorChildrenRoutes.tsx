/* eslint-disable @typescript-eslint/promise-function-async */

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/shared/components/spinner/LoadingSpinner';

//! Lazy load children routes
const LazySupervisorUpdatePage = lazy(
  () => import('@/modules/supervisor/pages/SupervisorUpdatePage')
);
const LazySupervisorCreatePage = lazy(
  () => import('@/modules/supervisor/pages/SupervisorCreatePage')
);
const LazySupervisorInactivatePage = lazy(
  () => import('@/modules/supervisor/pages/SupervisorInactivatePage')
);
const LazySupervisorsSearchPageByTerm = lazy(
  () => import('@/modules/supervisor/pages/SupervisorsSearchPageByTerm')
);
const LazySupervisorsGeneralSearchPage = lazy(
  () => import('@/modules/supervisor/pages/SupervisorsGeneralSearchPage')
);

export const SupervisorChildrenRoutes = [
  {
    path: '/supervisors/create',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazySupervisorCreatePage />,
      </Suspense>
    ),
  },
  {
    path: '/supervisors/general-search',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazySupervisorsGeneralSearchPage />,
      </Suspense>
    ),
  },
  {
    path: '/supervisors/search-by-term',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazySupervisorsSearchPageByTerm />,
      </Suspense>
    ),
  },
  {
    path: '/supervisors/update',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazySupervisorUpdatePage />,
      </Suspense>
    ),
  },
  {
    path: '/supervisors/inactivate',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazySupervisorInactivatePage />,
      </Suspense>
    ),
  },
];
