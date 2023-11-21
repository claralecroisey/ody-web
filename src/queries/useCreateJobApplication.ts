import { useMutation } from '@tanstack/react-query';
import apiClient from '../api';
import { AxiosError } from 'axios';
import { useGetAuthHeadersQuery } from './useGetAuthHeadersQuery';

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
  return apiClient.post('/job-applications', data, config);
};

export const useCreateJobApplicationMutation = () => {
  const { data: config } = useGetAuthHeadersQuery();

  return useMutation<
    void,
    AxiosError<{ message: string }>,
    CreateJobApplicationData
  >({
    mutationFn: (data: CreateJobApplicationData) => {
      if (config) {
        return createJobApplication({
          data,
          config,
        });
      } else {
        return Promise.reject({ message: 'No auth loaded' });
      }
    },
  });
};
