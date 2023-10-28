import { useMutation } from '@tanstack/react-query';
import apiClient from '../api';

type SignUpQueryParams = {
  email: string;
  password: string;
};

const signUp = async (params: SignUpQueryParams): Promise<void> => {
  return apiClient.post('/sign-up', params);
};

export const useSignUpMutation = () => {
  return useMutation({ mutationFn: signUp });
};
