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
    <div className="h-screen w-screen">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Take control of your job hunt with Ody – effortlessly organize and
              track your job applications, letting you focus on what truly
              matters: landing your dream job.
            </p>
            <div className="space-x-3">
              <LoginButton />
              <SignupButton />
            </div>
          </div>
        </div>
      </div>
      <footer className="footer items-center bg-neutral p-4 text-neutral-content">
        <aside className="grid-flow-col items-center">
          <p>Copyright © 2023 Ody - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
}
