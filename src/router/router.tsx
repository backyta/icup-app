import { createBrowserRouter } from 'react-router-dom';

import { Root } from '../Root';
import { DashboardLayout } from '@/layouts';

import {
  DashboardPage,
  DiscipleCreatePage,
  FamilyHouseOptionsPage,
  FamilyHouseCreatePage,
  OfferingOptionsPage,
  OfferingCreatePage,
  DiscipleOptionsPage,
  CopastorOptionsPage,
  DisciplesSearchPageByTerm,
  UserOptionsPage,
  UserCreatePage,
  PastorsSearchPageByTerm,
  CopastorsSearchPageByTerm,
  LeadersSearchPageByTerm,
  FamilyHousesSearchPageByTerm,
  OfferingsSearchPageByTerm,
  UsersSearchPageByTerm,
  LeaderOptionsPage,
  DisciplesGeneralSearchPage,
  PastorsGeneralSearchPage,
  CopastorsGeneralSearchPage,
  LeadersGeneralSearchPage,
  FamilyHousesGeneralSearchPage,
  OfferingsGeneralSearchPage,
  UsersGeneralSearchPage,
  UpdateDisciplePage,
} from '@/pages';
import { PastorOptionsPage } from '@/pages/pastor/PastorOptionsPage';

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
            element: <DisciplesGeneralSearchPage />,
          },
          {
            path: '/disciples/search-by-term-disciples',
            element: <DisciplesSearchPageByTerm />,
          },
          {
            path: '/disciples/update-disciple',
            element: <UpdateDisciplePage />,
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
            element: <PastorsGeneralSearchPage />,
          },
          {
            path: '/pastors/search-by-term-pastors',
            element: <PastorsSearchPageByTerm />,
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
            element: <CopastorsGeneralSearchPage />,
          },
          {
            path: '/copastors/search-by-term-copastors',
            element: <CopastorsSearchPageByTerm />,
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
            element: <LeadersGeneralSearchPage />,
          },
          {
            path: '/leaders/search-by-term-leaders',
            element: <LeadersSearchPageByTerm />,
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
            element: <FamilyHousesGeneralSearchPage />,
          },
          {
            path: '/family-houses/search-by-term-family-houses',
            element: <FamilyHousesSearchPageByTerm />,
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
            element: <OfferingsGeneralSearchPage />,
          },
          {
            path: '/offerings/search-by-term-offerings',
            element: <OfferingsSearchPageByTerm />,
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
            element: <UsersGeneralSearchPage />,
          },
          {
            path: '/users/search-by-term-users',
            element: <UsersSearchPageByTerm />,
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
