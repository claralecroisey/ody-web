import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Stats } from './Stats';
import { JobApplicationData } from '../types/JobApplication';
import { mockJobApplications } from '../mockData';

describe('Stats', () => {
  test('should show empty stats if jobApplications is empty', async () => {
    const jobApplications: JobApplicationData[] = [];
    const { getByTestId } = render(<Stats jobApplications={jobApplications} />);
    const appliedJobsCount = getByTestId('applied-jobs-count');
    const inProcessJobsCount = getByTestId('in-process-jobs-count');
    const offerReceivedCount = getByTestId('offers-received-count');

    expect(appliedJobsCount.textContent).toBe('0');
    expect(inProcessJobsCount.textContent).toBe('0');
    expect(offerReceivedCount.textContent).toBe('0');
  });

  test('should show calculate stats from jobApplications items and their statuses', async () => {
    const { getByTestId } = render(
      <Stats jobApplications={mockJobApplications} />,
    );
    const appliedJobsCount = getByTestId('applied-jobs-count');
    const inProcessJobsCount = getByTestId('in-process-jobs-count');
    const offerReceivedCount = getByTestId('offers-received-count');

    expect(appliedJobsCount.textContent).toBe('4');
    expect(inProcessJobsCount.textContent).toBe('1');
    expect(offerReceivedCount.textContent).toBe('2');
  });
});
