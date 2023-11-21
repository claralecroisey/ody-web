import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';

const useGetAccessTokenQuery = () => {
  const { getAccessTokenSilently } = useAuth0();

  async function getAccessToken() {
    const token = await getAccessTokenSilently();
    return token;
  }

  return useQuery({
    queryKey: ['accessToken'],
    queryFn: getAccessToken,
  });
};

export const useGetAuthHeadersQuery = () => {
  const { data: token, ...properties } = useGetAccessTokenQuery();

  const config = token
    ? {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined;

  return {
    data: config,
    ...properties,
  };
};
