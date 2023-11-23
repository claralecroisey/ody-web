import { useQuery } from '@tanstack/react-query';
import { useGetAuthHeadersQuery } from './useGetAuthHeadersQuery';
import apiClient from '../api';
import { JobApplicationData } from '../types/JobApplication';

export function useGetJobApplicationsQuery() {
  const { data: config } = useGetAuthHeadersQuery();

  async function getJobApplications(): Promise<JobApplicationData[]> {
    return apiClient
      .get('/job-applications', config)
      .then(res => res.data as JobApplicationData[]);
  }

  return useQuery({
    queryKey: ['jobApplications'],
    queryFn: getJobApplications,
    enabled: !!config,
  });
}
