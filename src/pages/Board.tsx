import { PlusSmallIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useGetJobApplicationsQuery } from '../queries/useGetJobApplicationsQuery';
import {
  JobApplicationData,
  JobApplicationStatus,
} from '../types/JobApplication';
import { ReactNode } from 'react';

const COLUMNS: {
  key: string;
  statuses: JobApplicationStatus[];
  label: string;
}[] = [
  {
    key: 'saved',
    label: 'Saved',
    statuses: [JobApplicationStatus.Saved],
  },
  {
    key: 'applied',
    label: 'Applied',
    statuses: [JobApplicationStatus.Applied],
  },
  {
    key: 'in_process',
    label: 'In Process',
    statuses: [JobApplicationStatus.InProcess],
  },
  {
    key: 'offer',
    label: 'Offer',
    statuses: [JobApplicationStatus.OfferReceived],
  },
  {
    key: 'archive',
    label: 'Archive',
    statuses: [
      JobApplicationStatus.OfferAccepted,
      JobApplicationStatus.OfferRejected,
      JobApplicationStatus.Rejected,
      JobApplicationStatus.Withdrawn,
      JobApplicationStatus.Closed,
    ],
  },
];

function JobCard({ job }: { job: JobApplicationData }) {
  return (
    <div
      className="h-24 w-full rounded-sm bg-base-100 px-4 py-2 shadow-sm"
      key={job.id}
    >
      <h1 className="text-lg">{job.title}</h1>
      <span className="text-sm">{job.companyName}</span>
    </div>
  );
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="h-full w-[300px] rounded-md bg-indigo-100 p-4">
      <div className="mb-6 p-2 text-center font-medium uppercase text-gray-600">
        {title}
      </div>
      <div className="flex-1 space-y-4 overflow-auto">{children}</div>
    </div>
  );
}

export default function Board() {
  const navigate = useNavigate();
  const { data: jobApplications, isLoading } = useGetJobApplicationsQuery();

  const jobApplicationsByColumn: { [key: string]: JobApplicationData[] } =
    COLUMNS.reduce(
      (acc, col) => {
        acc[col.key] =
          jobApplications?.filter(job => col.statuses.includes(job.status)) ??
          [];
        return acc;
      },
      {} as { [key: string]: JobApplicationData[] },
    );

  return (
    <div className="container flex h-full flex-col">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mb-8 flex justify-between">
            <h1 className="mb-12 text-xl"></h1>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate('new')}
            >
              <PlusSmallIcon className="h-6 w-6" />
              Add job
            </button>
          </div>
          <div id="scroll-container" className="relative flex-1 overflow-auto">
            <div className="flex h-full min-h-fit w-fit space-x-5">
              {COLUMNS.map(column => (
                <Column key={column.key} title={column.label}>
                  {jobApplicationsByColumn[column.key].map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </Column>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
