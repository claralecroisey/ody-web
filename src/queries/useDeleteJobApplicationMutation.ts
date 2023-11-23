import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api';
import { AxiosError } from 'axios';
import { useGetAuthHeadersQuery } from './useGetAuthHeadersQuery';
import { UUID } from 'crypto';

export type DeleteJobApplicationQueryParams = {
  id: UUID;
  config: Record<string, unknown>;
};

const deleteJobApplication = async ({
  id,
  config,
}: DeleteJobApplicationQueryParams): Promise<void> => {
  return apiClient.delete(`/job-applications/${id}`, config);
};

export const useDeleteJobApplicationMutation = () => {
  const { data: config } = useGetAuthHeadersQuery();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, UUID>({
    mutationFn: (id: UUID) => {
      if (config) {
        return deleteJobApplication({
          id,
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
