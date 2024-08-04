import { Navigate, useLocation } from 'react-router-dom';

export const RedirectIfMatch = (): JSX.Element => {
  const location = useLocation();

  // If starts with church
  if (location.pathname.startsWith('/churches/search-churches/')) {
    return <Navigate to='/churches/search-churches' />;
  }
  if (location.pathname.startsWith('/churches/search-churches-by-term/')) {
    return <Navigate to='/churches/search-churches' />;
  }
  if (location.pathname.startsWith('/churches/update-church/')) {
    return <Navigate to='/churches/update-church' />;
  }
  if (location.pathname.startsWith('/churches/delete-church/')) {
    return <Navigate to='/churches/delete-church' />;
  }

  // If starts with pastor
  if (location.pathname.startsWith('/pastors/search-pastors/')) {
    return <Navigate to='/pastors/search-pastors' />;
  }
  if (location.pathname.startsWith('/pastors/search-pastors-by-term/')) {
    return <Navigate to='/pastors/search-pastors' />;
  }
  if (location.pathname.startsWith('/pastors/update-pastor/')) {
    return <Navigate to='/pastors/update-pastor' />;
  }
  if (location.pathname.startsWith('/pastors/delete-pastor/')) {
    return <Navigate to='/pastors/delete-pastor' />;
  }

  // If starts with copastor
  if (location.pathname.startsWith('/copastors/search-copastors/')) {
    return <Navigate to='/copastors/search-copastors' />;
  }
  if (location.pathname.startsWith('/copastors/search-copastors-by-term/')) {
    return <Navigate to='/copastors/search-copastors' />;
  }
  if (location.pathname.startsWith('/copastors/update-copastor/')) {
    return <Navigate to='/copastors/update-copastor' />;
  }
  if (location.pathname.startsWith('/copastors/delete-copastor/')) {
    return <Navigate to='/copastors/delete-copastor' />;
  }

  // If starts with supervisor
  if (location.pathname.startsWith('/supervisors/search-supervisors/')) {
    return <Navigate to='/supervisors/search-supervisors' />;
  }
  if (location.pathname.startsWith('/supervisors/search-supervisors-by-term/')) {
    return <Navigate to='/supervisors/search-supervisors' />;
  }
  if (location.pathname.startsWith('/supervisors/update-supervisor/')) {
    return <Navigate to='/supervisors/update-supervisor' />;
  }
  if (location.pathname.startsWith('/supervisors/delete-supervisor/')) {
    return <Navigate to='/supervisors/delete-supervisor' />;
  }

  // If starts with zone
  if (location.pathname.startsWith('/zones/search-zones/')) {
    return <Navigate to='/zones/search-zones' />;
  }
  if (location.pathname.startsWith('/zones/search-zones-by-term/')) {
    return <Navigate to='/zones/search-zones' />;
  }
  if (location.pathname.startsWith('/zones/update-zone/')) {
    return <Navigate to='/zones/update-zone' />;
  }
  if (location.pathname.startsWith('/zones/delete-zone/')) {
    return <Navigate to='/zones/delete-zone' />;
  }

  // If starts with preacher
  if (location.pathname.startsWith('/preachers/search-preachers/')) {
    return <Navigate to='/preachers/search-preachers' />;
  }
  if (location.pathname.startsWith('/preachers/search-preachers-by-term/')) {
    return <Navigate to='/preachers/search-preachers' />;
  }
  if (location.pathname.startsWith('/preachers/update-preacher/')) {
    return <Navigate to='/preachers/update-preacher' />;
  }
  if (location.pathname.startsWith('/preachers/delete-preacher/')) {
    return <Navigate to='/preachers/delete-preacher' />;
  }

  // If starts with family group
  if (location.pathname.startsWith('/family-groups/search-family-groups/')) {
    return <Navigate to='/family-groups/search-family-groups' />;
  }
  if (location.pathname.startsWith('/family-groups/search-family-groups-by-term/')) {
    return <Navigate to='/family-groups/search-family-groups' />;
  }
  if (location.pathname.startsWith('/family-groups/update-family-group/')) {
    return <Navigate to='/family-groups/update-family-group' />;
  }
  if (location.pathname.startsWith('/family-groups/delete-family-group/')) {
    return <Navigate to='/family-groups/delete-family-group' />;
  }

  // If starts with disciple
  if (location.pathname.startsWith('/disciples/search-disciples/')) {
    return <Navigate to='/disciples/search-disciples' />;
  }
  if (location.pathname.startsWith('/disciples/search-disciples-by-term/')) {
    return <Navigate to='/disciples/search-disciples' />;
  }
  if (location.pathname.startsWith('/disciples/update-disciple/')) {
    return <Navigate to='/disciples/update-disciple' />;
  }
  if (location.pathname.startsWith('/disciples/delete-disciple/')) {
    return <Navigate to='/disciples/delete-disciple' />;
  }

  // If starts with user
  if (location.pathname.startsWith('/users/search-users/')) {
    return <Navigate to='/users/search-users' />;
  }
  if (location.pathname.startsWith('/users/search-users-by-term/')) {
    return <Navigate to='/users/search-users' />;
  }
  if (location.pathname.startsWith('/users/update-user/')) {
    return <Navigate to='/users/update-user' />;
  }
  if (location.pathname.startsWith('/users/delete-user/')) {
    return <Navigate to='/users/delete-user' />;
  }

  // Si no coincide con el patrón, muestra el componente 404 o redirige de otra forma
  return <Navigate to='/404' />;
};
