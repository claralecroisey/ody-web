import { useMutation } from '@tanstack/react-query';
import apiClient from '../api';
import { AxiosError } from 'axios';

export type CreateJobListingData = {
  title: string;
  role: string;
  company_name: string;
  description: string;
  url: string;
};

export type CreateJobListingQueryParams = {
  data: CreateJobListingData;
  config: Record<string, unknown>;
};

const createJobListing = async ({
  data,
  config,
}: CreateJobListingQueryParams): Promise<void> => {
  return apiClient.post('/job-listing', data, config).then(res => res.data);
};

export const useCreateJobListingMutation = () => {
  return useMutation<
    void,
    AxiosError<{ message: string }>,
    CreateJobListingQueryParams
  >({
    mutationFn: createJobListing,
  });
};
