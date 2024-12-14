import { Navigate, useLocation } from 'react-router-dom';

export const RedirectIfMatch = (): JSX.Element => {
  const location = useLocation();

  // If starts with church
  if (location.pathname.startsWith('/churches/general-search/')) {
    return <Navigate to='/churches/general-search' />;
  }
  if (location.pathname.startsWith('/churches/search-by-term/')) {
    return <Navigate to='/churches/search-by-term' />;
  }
  if (location.pathname.startsWith('/churches/update/')) {
    return <Navigate to='/churches/update' />;
  }
  if (location.pathname.startsWith('/churches/inactivate/')) {
    return <Navigate to='/churches/inactivate' />;
  }

  // If starts with pastor
  if (location.pathname.startsWith('/pastors/general-search/')) {
    return <Navigate to='/pastors/general-search' />;
  }
  if (location.pathname.startsWith('/pastors/search-by-term/')) {
    return <Navigate to='/pastors/search-by-term' />;
  }
  if (location.pathname.startsWith('/pastors/update/')) {
    return <Navigate to='/pastors/update' />;
  }
  if (location.pathname.startsWith('/pastors/inactivate/')) {
    return <Navigate to='/pastors/inactivate' />;
  }

  // If starts with copastor
  if (location.pathname.startsWith('/copastors/general-search/')) {
    return <Navigate to='/copastors/general-search' />;
  }
  if (location.pathname.startsWith('/copastors/search-by-term/')) {
    return <Navigate to='/copastors/search-by-term' />;
  }
  if (location.pathname.startsWith('/copastors/update/')) {
    return <Navigate to='/copastors/update' />;
  }
  if (location.pathname.startsWith('/copastors/inactivate/')) {
    return <Navigate to='/copastors/inactivate' />;
  }

  // If starts with supervisor
  if (location.pathname.startsWith('/supervisors/general-search/')) {
    return <Navigate to='/supervisors/general-search' />;
  }
  if (location.pathname.startsWith('/supervisors/search-by-term/')) {
    return <Navigate to='/supervisors/search-by-term' />;
  }
  if (location.pathname.startsWith('/supervisors/update/')) {
    return <Navigate to='/supervisors/update' />;
  }
  if (location.pathname.startsWith('/supervisors/inactivate/')) {
    return <Navigate to='/supervisors/inactivate' />;
  }

  // If starts with zone
  if (location.pathname.startsWith('/zones/general-search/')) {
    return <Navigate to='/zones/general-search' />;
  }
  if (location.pathname.startsWith('/zones/search-by-term/')) {
    return <Navigate to='/zones/search-by-term' />;
  }
  if (location.pathname.startsWith('/zones/update/')) {
    return <Navigate to='/zones/update' />;
  }
  if (location.pathname.startsWith('/zones/inactivate/')) {
    return <Navigate to='/zones/inactivate' />;
  }

  // If starts with preacher
  if (location.pathname.startsWith('/preachers/general-search/')) {
    return <Navigate to='/preachers/general-search' />;
  }
  if (location.pathname.startsWith('/preachers/search-by-term/')) {
    return <Navigate to='/preachers/search-by-term' />;
  }
  if (location.pathname.startsWith('/preachers/update/')) {
    return <Navigate to='/preachers/update' />;
  }
  if (location.pathname.startsWith('/preachers/inactivate/')) {
    return <Navigate to='/preachers/inactivate' />;
  }

  // If starts with family group
  if (location.pathname.startsWith('/family-groups/general-search/')) {
    return <Navigate to='/family-groups/general-search' />;
  }
  if (location.pathname.startsWith('/family-groups/search-by-term/')) {
    return <Navigate to='/family-groups/search-by-term' />;
  }
  if (location.pathname.startsWith('/family-groups/update/')) {
    return <Navigate to='/family-groups/update' />;
  }
  if (location.pathname.startsWith('/family-groups/inactivate/')) {
    return <Navigate to='/family-groups/inactivate' />;
  }

  // If starts with disciple
  if (location.pathname.startsWith('/disciples/general-search/')) {
    return <Navigate to='/disciples/general-search' />;
  }
  if (location.pathname.startsWith('/disciples/search-by-term/')) {
    return <Navigate to='/disciples/search-by-term' />;
  }
  if (location.pathname.startsWith('/disciples/update/')) {
    return <Navigate to='/disciples/update' />;
  }
  if (location.pathname.startsWith('/disciples/inactivate/')) {
    return <Navigate to='/disciples/inactivate' />;
  }

  // If starts with user
  if (location.pathname.startsWith('/users/general-search/')) {
    return <Navigate to='/users/general-search' />;
  }
  if (location.pathname.startsWith('/users/search-by-term/')) {
    return <Navigate to='/users/search-by-term' />;
  }
  if (location.pathname.startsWith('/users/update/')) {
    return <Navigate to='/users/update' />;
  }
  if (location.pathname.startsWith('/users/inactivate/')) {
    return <Navigate to='/users/inactivate' />;
  }

  // If starts with offering income
  if (location.pathname.startsWith('/offerings/income/general-search/')) {
    return <Navigate to='/offerings/income/general-search' />;
  }
  if (location.pathname.startsWith('/offerings/income/search-by-term/')) {
    return <Navigate to='/offerings/income/search-by-term' />;
  }
  if (location.pathname.startsWith('/offerings/income/update/')) {
    return <Navigate to='/offerings/income/update' />;
  }
  if (location.pathname.startsWith('/offerings/income/inactivate/')) {
    return <Navigate to='/offerings/income/inactivate' />;
  }

  // If starts with offering expense
  if (location.pathname.startsWith('/offerings/expenses/general-search/')) {
    return <Navigate to='/offerings/expenses/general-search' />;
  }
  if (location.pathname.startsWith('/offerings/expenses/search-by-term/')) {
    return <Navigate to='/offerings/expenses/search-by-term' />;
  }
  if (location.pathname.startsWith('/offerings/expenses/update/')) {
    return <Navigate to='/offerings/expenses/update' />;
  }
  if (location.pathname.startsWith('/offerings/expenses/inactivate/')) {
    return <Navigate to='/offerings/expenses/inactivate' />;
  }

  // If it doesn't match the pattern, show the 404 component or redirect in another way
  return <Navigate to='/404' />;
};

export default RedirectIfMatch;
