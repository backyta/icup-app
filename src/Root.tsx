import { ThemeProvider } from '@/shared/components/toggle-theme/theme-provider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const Root = (): JSX.Element => {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return <Navigate to='/dashboard' />;
  }

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Outlet />
    </ThemeProvider>
  );
};
