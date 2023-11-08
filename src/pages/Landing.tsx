import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from '../components/LoginButton';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { SignupButton } from '../components/SignUpButton';

export default function Landing() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoginButton />
      <SignupButton />
    </div>
  );
}
