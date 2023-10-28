import { useEffect } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { Outlet, useNavigate } from 'react-router-dom';

export const AuthLayout = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};
