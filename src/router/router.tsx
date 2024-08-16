import { createBrowserRouter } from 'react-router-dom';

import { Root } from '@/Root';
import { RedirectIfMatch } from '@/router';
import { DashboardLayout, AuthLayout } from '@/layouts';

// ?  Direct pages
//* Members
import { DashboardPage } from '@/modules/dashboard/pages';
import { ChurchOptionsPage } from '@/modules/church/pages';
import { PastorOptionsPage } from '@/modules/pastor/pages';
import { CopastorOptionsPage } from '@/modules/copastor/pages';
import { SupervisorOptionsPage } from '@/modules/supervisor/pages';
import { PreacherOptionsPage } from '@/modules/preacher/pages';
import { DiscipleOptionsPage } from '@/modules/disciple/pages';
//* Family groups and zones
import { FamilyGroupOptionsPage } from '@/modules/family-group/pages';
import { ZoneOptionsPage } from '@/modules/zone/pages';
//* Offerings
import { OfferingOptionsPage } from '@/modules/offering/pages';
import { OfferingIncomeOptionsPage } from '@/modules/offering/income/pages';
import { OfferingExpensesOptionsPage } from '@/modules/offering/expenses/pages';
//* Metrics and charts
import { MetricsOptionsPage } from '@/modules/metrics/pages';
//* Users
import { UserOptionsPage } from '@/modules/user/pages';

// ? Routers by module
//* Members
import { ChurchChildrenRoutes } from '@/modules/church/router';
import { PastorChildrenRoutes } from '@/modules/pastor/router';
import { CopastorChildrenRoutes } from '@/modules/copastor/router';
import { SupervisorChildrenRoutes } from '@/modules/supervisor/router';
import { PreacherChildrenRoutes } from '@/modules/preacher/router';
import { DiscipleChildrenRoutes } from '@/modules/disciple/router';
//* Family groups and zones
import { FamilyGroupChildrenRoutes } from '@/modules/family-group/router';
import { ZoneChildrenRoutes } from '@/modules/zone/router';
//* Offering
import { OfferingIncomeChildrenRoutes } from '@/modules/offering/income/router';
import { OfferingExpensesChildrenRoutes } from '@/modules/offering/expenses/router';
//* Metrics and charts
import { MetricsChildrenRoutes } from '@/modules/metrics/router';
//* Users
import { UserChildrenRoutes } from '@/modules/user/router';
//* Auth
import { AuthChildrenRoutes } from '@/modules/auth/router';

//* NotFound page
import { NotFoundPage } from '@/shared/pages';

// ? Browser router
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          // * Main pages by module
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/churches', element: <ChurchOptionsPage /> },
          { path: '/pastors', element: <PastorOptionsPage /> },
          { path: '/copastors', element: <CopastorOptionsPage /> },
          { path: '/supervisors', element: <SupervisorOptionsPage /> },
          { path: '/preachers', element: <PreacherOptionsPage /> },
          { path: '/disciples', element: <DiscipleOptionsPage /> },
          { path: '/family-groups', element: <FamilyGroupOptionsPage /> },
          { path: '/zones', element: <ZoneOptionsPage /> },
          { path: '/offerings', element: <OfferingOptionsPage /> },
          { path: '/offerings/income', element: <OfferingIncomeOptionsPage /> },
          { path: '/offerings/expenses', element: <OfferingExpensesOptionsPage /> },
          { path: '/metrics', element: <MetricsOptionsPage /> },
          { path: '/users', element: <UserOptionsPage /> },
        ],
      },

      // ? Children routes and pages by module
      //* Members
      { path: '/churches', element: <DashboardLayout />, children: ChurchChildrenRoutes },
      { path: '/disciples', element: <DashboardLayout />, children: DiscipleChildrenRoutes },
      { path: '/pastors', element: <DashboardLayout />, children: PastorChildrenRoutes },
      { path: '/copastors', element: <DashboardLayout />, children: CopastorChildrenRoutes },
      { path: '/supervisors', element: <DashboardLayout />, children: SupervisorChildrenRoutes },
      { path: '/preachers', element: <DashboardLayout />, children: PreacherChildrenRoutes },
      { path: '/family-groups', element: <DashboardLayout />, children: FamilyGroupChildrenRoutes },
      { path: '/zones', element: <DashboardLayout />, children: ZoneChildrenRoutes },

      //* Offering income
      {
        path: '/offerings/income',
        element: <DashboardLayout />,
        children: OfferingIncomeChildrenRoutes,
      },

      //* Offering expenses
      {
        path: '/offerings/expenses',
        element: <DashboardLayout />,
        children: OfferingExpensesChildrenRoutes,
      },

      //* Users
      { path: '/users', element: <DashboardLayout />, children: UserChildrenRoutes },

      //* Metrics and charts
      { path: '/metrics', element: <DashboardLayout />, children: MetricsChildrenRoutes },

      //* Auth
      { path: '/auth', element: <AuthLayout />, children: AuthChildrenRoutes },
    ],
  },
  {
    path: '*',
    element: <RedirectIfMatch />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
]);
