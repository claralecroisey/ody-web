import { useMutation } from '@tanstack/react-query';
import apiClient from '../api';
import { AxiosError } from 'axios';

export type CreateJobApplicationData = {
  title: string;
  role: string;
  company_name: string;
  description: string;
  url: string;
};

export type CreateJobApplicationQueryParams = {
  data: CreateJobApplicationData;
  config: Record<string, unknown>;
};

const createJobApplication = async ({
  data,
  config,
}: CreateJobApplicationQueryParams): Promise<void> => {
  return apiClient
    .post('/job-applications', data, config)
    .then(res => res.data);
};

export const useCreateJobApplicationMutation = () => {
  return useMutation<
    void,
    AxiosError<{ message: string }>,
    CreateJobApplicationQueryParams
  >({
    mutationFn: createJobApplication,
  });
};
