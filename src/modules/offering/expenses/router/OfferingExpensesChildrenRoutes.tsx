import {
  OfferingExpensesCreatePage,
  OfferingExpensesDeletePage,
  OfferingsExpensesGeneralSearchPage,
  OfferingsExpensesSearchPageByTerm,
  OfferingExpensesUpdatePage,
} from '@/modules/offering/expenses/pages';

export const OfferingExpensesChildrenRoutes = [
  {
    path: '/offerings/expenses/create-offering-expenses',
    element: <OfferingExpensesCreatePage />,
  },
  {
    path: '/offerings/expenses/search-offerings-expenses',
    element: <OfferingsExpensesGeneralSearchPage />,
  },
  {
    path: '/offerings/expenses/search-by-term-offerings-expenses',
    element: <OfferingsExpensesSearchPageByTerm />,
  },
  {
    path: '/offerings/expenses/update-offering-expenses',
    element: <OfferingExpensesUpdatePage />,
  },
  {
    path: '/offerings/expenses/delete-offering-expenses',
    element: <OfferingExpensesDeletePage />,
  },
];
