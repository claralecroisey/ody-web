import { useAuth0 } from '@auth0/auth0-react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  const { isLoading } = useAuth0();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Outlet />
    </div>
  );
};
