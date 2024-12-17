/* eslint-disable @typescript-eslint/promise-function-async */

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/shared/components/spinner/LoadingSpinner';

//! Lazy load children routes
const LazyUsersGeneralSearchPage = lazy(
  () => import('@/modules/user/pages/UsersGeneralSearchPage')
);
const LazyUserCreatePage = lazy(() => import('@/modules/user/pages/UserCreatePage'));
const LazyUserUpdatePage = lazy(() => import('@/modules/user/pages/UserUpdatePage'));
const LazyUserInactivatePage = lazy(() => import('@/modules/user/pages/UserInactivatePage'));
const LazyUsersSearchPageByTerm = lazy(() => import('@/modules/user/pages/UsersSearchPageByTerm'));

export const UserChildrenRoutes = [
  {
    path: '/users/create',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyUserCreatePage />,
      </Suspense>
    ),
  },
  {
    path: '/users/general-search',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyUsersGeneralSearchPage />,
      </Suspense>
    ),
  },
  {
    path: '/users/search-by-term',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyUsersSearchPageByTerm />,
      </Suspense>
    ),
  },
  {
    path: '/users/update',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyUserUpdatePage />,
      </Suspense>
    ),
  },
  {
    path: '/users/inactivate',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyUserInactivatePage />,
      </Suspense>
    ),
  },
];
