import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import RequireAuth from 'react-auth-kit/PrivateRoute';

export const DashboardLayout = () => {
  return (
    <RequireAuth loginPath={'/login'}>
      <div className="flex">
        <NavBar />
        <div className="container m-8 w-full">
          <Outlet />
        </div>
      </div>
    </RequireAuth>
  );
};
