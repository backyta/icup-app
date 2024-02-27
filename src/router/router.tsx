import { createBrowserRouter } from 'react-router-dom';

import { Root } from '../Root';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import {
  DashboardPage,
  DiscipleCreatePage,
  GeneralPastorsSearchPage,
  GeneralCopastorsSearchPage,
  LeaderOptionsPage,
  GeneralLeadersSearchPage,
  FamilyHouseOptionsPage,
  FamilyHouseCreatePage,
  GeneralFamilyHousesSearchPage,
  OfferingOptionsPage,
  OfferingCreatePage,
  GeneralOfferingsSearchPage,
  DiscipleOptionsPage,
  PastorOptionsPage,
  CopastorOptionsPage,
  DisciplesSearchPageByTerm,
  UserOptionsPage,
  UserCreatePage,
  GeneralUsersSearchPage,
  GeneralDisciplesSearchPage,
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
            element: <DiscipleOptionsPage />,
          },
          {
            path: 'pastors',
            element: <PastorOptionsPage />,
          },
          {
            path: 'copastors',
            element: <CopastorOptionsPage />,
          },
          {
            path: 'leaders',
            element: <LeaderOptionsPage />,
          },
          {
            path: 'family-houses',
            element: <FamilyHouseOptionsPage />,
          },
          {
            path: 'offerings',
            element: <OfferingOptionsPage />,
          },
          {
            path: 'users',
            element: <UserOptionsPage />,
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
            element: <DiscipleCreatePage />,
          },
          {
            path: '/disciples/search-disciples',
            element: <GeneralDisciplesSearchPage />,
          },
          {
            path: '/disciples/search-by-term-disciples',
            element: <DisciplesSearchPageByTerm />,
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
            element: <DiscipleCreatePage />,
          },
          {
            path: '/pastors/search-pastors',
            element: <GeneralPastorsSearchPage />,
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
            element: <DiscipleCreatePage />,
          },
          {
            path: '/copastors/search-copastors',
            element: <GeneralCopastorsSearchPage />,
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
            element: <DiscipleCreatePage />,
          },
          {
            path: '/leaders/search-leaders',
            element: <GeneralLeadersSearchPage />,
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
            element: <FamilyHouseCreatePage />,
          },
          {
            path: '/family-houses/search-family-houses',
            element: <GeneralFamilyHousesSearchPage />,
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
            element: <OfferingCreatePage />,
          },
          {
            path: '/offerings/search-offerings',
            element: <GeneralOfferingsSearchPage />,
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
            element: <UserCreatePage />,
          },
          {
            path: '/users/search-users',
            element: <GeneralUsersSearchPage />,
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
