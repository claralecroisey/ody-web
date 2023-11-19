import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

export default function Home() {
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessTokenSilently();
      const config = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/test`,
        config,
      );
      const data = await response.json();
      console.log(data);
    }

    fetchData();
  }, [getAccessTokenSilently]);

  return (
    <div className="container">
      <h1 className="text-2xl font-medium">
        Welcome back {user?.given_name} 👋
      </h1>
    </div>
  );
}
