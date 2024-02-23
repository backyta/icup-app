import { createBrowserRouter } from 'react-router-dom';

import { Root } from '../Root';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import {
  CopastorPage,
  CreateDisciplePage,
  CreateFamilyHousePage,
  CreateOfferingPage,
  CreateUserPage,
  DashboardPage,
  DisciplePage,
  FamilyHousePage,
  LeaderPage,
  OfferingPage,
  PastorPage,
  UserPage,
  SearchDisciplePage,
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
            path: '/disciples/search-disciple',
            element: <SearchDisciplePage />,
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
