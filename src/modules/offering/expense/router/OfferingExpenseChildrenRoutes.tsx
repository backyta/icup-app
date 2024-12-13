import { OfferingExpenseCreatePage } from '@/modules/offering/expense/pages/OfferingExpenseCreatePage';
import { OfferingExpenseUpdatePage } from '@/modules/offering/expense/pages/OfferingExpenseUpdatePage';
import { OfferingExpenseInactivatePage } from '@/modules/offering/expense/pages/OfferingExpenseInactivatePage';
import { OfferingsExpenseSearchPageByTerm } from '@/modules/offering/expense/pages/OfferingsExpenseSearchPageByTerm';
import { OfferingsExpenseGeneralSearchPage } from '@/modules/offering/expense/pages/OfferingsExpenseGeneralSearchPage';

export const OfferingExpenseChildrenRoutes = [
  {
    path: '/offerings/expenses/create',
    element: <OfferingExpenseCreatePage />,
  },
  {
    path: '/offerings/expenses/general-search',
    element: <OfferingsExpenseGeneralSearchPage />,
  },
  {
    path: '/offerings/expenses/search-by-term',
    element: <OfferingsExpenseSearchPageByTerm />,
  },
  {
    path: '/offerings/expenses/update',
    element: <OfferingExpenseUpdatePage />,
  },
  {
    path: '/offerings/expenses/inactivate',
    element: <OfferingExpenseInactivatePage />,
  },
];
