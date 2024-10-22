import {
  MemberMetrics,
  FamilyGroupMetrics,
  OfferingIncomeMetrics,
  OfferingExpenseMetrics,
  FinancialBalanceAndComparativeMetrics,
} from '@/modules/metrics/pages';

export const MetricsChildrenRoutes = [
  {
    path: '/metrics/member',
    element: <MemberMetrics />,
  },
  {
    path: '/metrics/family-group',
    element: <FamilyGroupMetrics />,
  },
  {
    path: '/metrics/offering-income',
    element: <OfferingIncomeMetrics />,
  },
  {
    path: '/metrics/offering-expense',
    element: <OfferingExpenseMetrics />,
  },
  {
    path: '/metrics/offering-comparative',
    element: <FinancialBalanceAndComparativeMetrics />,
  },
];
