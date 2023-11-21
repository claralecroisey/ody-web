import { useAuth0 } from '@auth0/auth0-react';

export default function Home() {
  const { user } = useAuth0();

  return (
    <div className="container">
      <h1 className="text-2xl font-medium">
        Welcome back {user?.given_name} 👋
      </h1>
    </div>
  );
}
