import {
  OfferingCreatePage,
  OfferingDeletePage,
  OfferingsGeneralSearchPage,
  OfferingsSearchPageByTerm,
  UpdateOfferingPage,
} from '@/app/offering/pages';

export const OfferingChildrenRoutes = [
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
  {
    path: '/offerings/update-offering',
    element: <UpdateOfferingPage />,
  },
  {
    path: '/offerings/delete-offering',
    element: <OfferingDeletePage />,
  },
];
