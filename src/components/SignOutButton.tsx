import { useAuth0 } from '@auth0/auth0-react';

export function SignOutButton() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button className="btn btn-ghost btn-xs" onClick={handleLogout}>
      Log Out
    </button>
  );
}
