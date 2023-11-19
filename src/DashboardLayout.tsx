import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { withAuthenticationRequired } from '@auth0/auth0-react';

export const DashboardLayout = withAuthenticationRequired(() => {
  return (
    <>
      <div className="flex">
        <NavBar />
        <div className="container m-8 w-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
});
