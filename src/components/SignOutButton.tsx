import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export function SignOutButton() {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <button className="btn btn-ghost btn-xs" onClick={handleSignOut}>
      Log Out
    </button>
  );
}
