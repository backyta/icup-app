import { MetricsMember, MetricsFamilyHouse, MetricsOffering } from '@/app/metrics/pages';

export const MetricsChildrenRoutes = [
  {
    path: '/metrics/metrics-member',
    element: <MetricsMember />,
  },
  {
    path: '/metrics/metrics-family-house',
    element: <MetricsFamilyHouse />,
  },
  {
    path: '/metrics/metrics-offering',
    element: <MetricsOffering />,
  },
];
