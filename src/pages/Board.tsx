import { PlusSmallIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useGetJobApplicationsQuery } from '../queries/useGetJobApplicationsQuery';
import {
  JobApplicationData,
  JobApplicationStatus,
} from '../types/JobApplication';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { Modal } from '../components/ui/Modal';
import { LoadingScreen } from '../components/ui/Loader';
import { JobApplicationModalContent } from '../components/JobApplicationModalContent';

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
      className="h-24 w-full rounded-md bg-base-100 px-4 py-2 shadow-sm transition-all hover:shadow-xl"
      key={job.id}
    >
      <h1 className="text-lg font-medium">{job.title}</h1>
      <span className="text-sm">{job.companyName}</span>
    </div>
  );
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-full w-[300px] flex-col rounded-md bg-indigo-100 p-4">
      <div className="mb-6 p-2 text-center font-medium uppercase text-gray-600">
        {title}
      </div>
      <div className="relative flex-1 overflow-auto">
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

export default function Board() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDialogElement>(null);

  const { data: jobApplications, isPending } = useGetJobApplicationsQuery();
  const [selectedJob, setSelectedJob] = useState<JobApplicationData | null>(
    null,
  );

  const displayApplicationContent = useCallback(
    (jobApplication: JobApplicationData) => {
      setSelectedJob(jobApplication);
      ref.current?.showModal();
    },
    [ref],
  );

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
    <>
      {isPending ? (
        <div className="container flex h-full items-center justify-center">
          <LoadingScreen />
        </div>
      ) : (
        <div className="container flex h-full flex-col">
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
                    <button
                      key={job.id}
                      className="w-full focus-visible:outline-none"
                      onClick={() => displayApplicationContent(job)}
                    >
                      <JobCard key={job.id} job={job} />
                    </button>
                  ))}
                </Column>
              ))}
            </div>
          </div>
        </div>
      )}
      <Modal ref={ref}>
        {selectedJob ? (
          <JobApplicationModalContent
            key={selectedJob.id}
            job={selectedJob}
            onDelete={() => ref.current?.close()}
          />
        ) : null}
      </Modal>
    </>
  );
}
