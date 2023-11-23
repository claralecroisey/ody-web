import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api';
import { AxiosError } from 'axios';
import { useGetAuthHeadersQuery } from './useGetAuthHeadersQuery';
import { toSnakeCase } from '../utils/helpers';
import { UUID } from 'crypto';

export type UpdateJobApplicationData = {
  title: string;
  description: string;
};

export type UpdateJobApplicationQueryParams = {
  id: UUID;
  data: UpdateJobApplicationData;
  config: Record<string, unknown>;
};

const updateJobApplication = async ({
  id,
  data,
  config,
}: UpdateJobApplicationQueryParams): Promise<void> => {
  return apiClient.put(`/job-applications/${id}`, toSnakeCase(data), config);
};

export const useUpdateJobApplicationMutation = () => {
  const { data: config } = useGetAuthHeadersQuery();
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<{ message: string }>,
    {
      id: UUID;
      data: UpdateJobApplicationData;
    }
  >({
    mutationFn: ({
      id,
      data,
    }: {
      id: UUID;
      data: UpdateJobApplicationData;
    }) => {
      if (config) {
        return updateJobApplication({
          id,
          data,
          config,
        });
      } else {
        return Promise.reject({ message: 'No auth loaded' });
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['jobApplications'] }),
  });
};
