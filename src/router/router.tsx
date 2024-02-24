import { createBrowserRouter } from 'react-router-dom';

import { Root } from '../Root';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import {
  DashboardPage,
  DisciplePage,
  PastorPage,
  CopastorPage,
  LeaderPage,
  UserPage,
  FamilyHousePage,
  OfferingPage,
  CreateDisciplePage,
  CreateFamilyHousePage,
  CreateOfferingPage,
  CreateUserPage,
  SearchPastorsPage,
  SearchCopastorsPage,
  SearchLeadersPage,
  SearchDisciplesPage,
  SearchFamilyHousesPage,
  SearchOfferingsPage,
} from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      // dashboard and initial pages routes
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'disciples',
            element: <DisciplePage />,
          },
          {
            path: 'pastors',
            element: <PastorPage />,
          },
          {
            path: 'copastors',
            element: <CopastorPage />,
          },
          {
            path: 'leaders',
            element: <LeaderPage />,
          },
          {
            path: 'family-houses',
            element: <FamilyHousePage />,
          },
          {
            path: 'offerings',
            element: <OfferingPage />,
          },
          {
            path: 'users',
            element: <UserPage />,
          },
        ],
      },
      // routes disciple
      {
        path: '/disciples',
        element: <DashboardLayout />,
        children: [
          {
            path: '/disciples/create-disciple',
            element: <CreateDisciplePage />,
          },
          {
            path: '/disciples/search-disciples',
            element: <SearchDisciplesPage />,
          },
        ],
      },
      // routes pastor
      {
        path: '/pastors',
        element: <DashboardLayout />,
        children: [
          {
            path: '/pastors/create-pastor',
            element: <CreateDisciplePage />,
          },
          {
            path: '/pastors/search-pastors',
            element: <SearchPastorsPage />,
          },
        ],
      },
      // routes co-pastor
      {
        path: '/copastors',
        element: <DashboardLayout />,
        children: [
          {
            path: '/copastors/create-copastor',
            element: <CreateDisciplePage />,
          },
          {
            path: '/copastors/search-copastors',
            element: <SearchCopastorsPage />,
          },
        ],
      },
      // routes leader
      {
        path: '/leaders',
        element: <DashboardLayout />,
        children: [
          {
            path: '/leaders/create-leader',
            element: <CreateDisciplePage />,
          },
          {
            path: '/leaders/search-leaders',
            element: <SearchLeadersPage />,
          },
        ],
      },
      // routes family-house
      {
        path: '/family-houses',
        element: <DashboardLayout />,
        children: [
          {
            path: '/family-houses/create-family-house',
            element: <CreateFamilyHousePage />,
          },
          {
            path: '/family-houses/search-family-houses',
            element: <SearchFamilyHousesPage />,
          },
        ],
      },
      // routes offering
      {
        path: '/offerings',
        element: <DashboardLayout />,
        children: [
          {
            path: '/offerings/create-offering',
            element: <CreateOfferingPage />,
          },
          {
            path: '/offerings/search-offerings',
            element: <SearchOfferingsPage />,
          },
        ],
      },
      // routes user
      {
        path: '/users',
        element: <DashboardLayout />,
        children: [
          {
            path: '/users/create-user',
            element: <CreateUserPage />,
          },
        ],
      },

      /// Auth Routes
      // {
      //   path: 'auth',
      //   element: <AuthLayout />,
      //   children: [
      //     {
      //       path: 'login',
      //       element: <LoginPage />
      //     }
      //   ]

      // },
    ],
  },
]);
