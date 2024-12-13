import { MemberMetrics } from '@/modules/metrics/pages/MemberMetrics';
import { FamilyGroupMetrics } from '@/modules/metrics/pages/FamilyGroupMetrics';
import { OfferingIncomeMetrics } from '@/modules/metrics/pages/OfferingIncomeMetrics';
import { OfferingExpenseMetrics } from '@/modules/metrics/pages/OfferingExpenseMetrics';
import { FinancialBalanceComparisonMetrics } from '@/modules/metrics/pages/FinancialBalanceComparisonMetrics';

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
    element: <FinancialBalanceComparisonMetrics />,
  },
];
