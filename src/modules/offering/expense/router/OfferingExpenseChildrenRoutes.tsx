import {
  OfferingExpenseUpdatePage,
  OfferingExpenseCreatePage,
  OfferingExpenseDeletePage,
  OfferingsExpenseSearchPageByTerm,
  OfferingsExpenseGeneralSearchPage,
} from '@/modules/offering/expense/pages';

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
    path: '/offerings/expenses/delete',
    element: <OfferingExpenseDeletePage />,
  },
];
