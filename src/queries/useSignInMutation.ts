import { useMutation } from '@tanstack/react-query';
import apiClient from '../api';
import { AxiosError } from 'axios';

type SignInQueryParams = {
  email: string;
  password: string;
};

type SignInResponse = {
  access_token: string;
  expires_in: number;
};

const signIn = async (params: SignInQueryParams): Promise<SignInResponse> => {
  return apiClient.post('/sign-in', params).then(res => res.data);
};

export const useSignInMutation = () => {
  return useMutation<
    SignInResponse,
    AxiosError<{ message: string }>,
    SignInQueryParams
  >({
    mutationFn: signIn,
  });
};
