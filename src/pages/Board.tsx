import { PlusSmallIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useGetJobApplicationsQuery } from '../queries/useGetJobApplicationsQuery';
import {
  JobApplicationData,
  JobApplicationStatus,
} from '../types/JobApplication';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from '../components/ui/Modal';
import { LoadingScreen } from '../components/ui/Loader';
import { EditableContent } from '../components/form/EditableContent';
import { Formik } from 'formik';

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

  const { data: jobApplications, isLoading } = useGetJobApplicationsQuery();
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
      {isLoading ? (
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
          <JobApplicationModalContent key={selectedJob.id} job={selectedJob} />
        ) : null}
      </Modal>
    </>
  );
}

function JobApplicationModalContent({
  job: { title, companyName, description },
}: {
  job: JobApplicationData;
}) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Formik
      initialValues={{
        title,
        companyName,
        description,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          // TODO: Call endpoint
        } catch (error) {
          // TODO: Handle error
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {isEditMode ? (
            <>
              <button
                className="place-self-end"
                onClick={() => setIsEditMode(false)}
                disabled={isSubmitting}
                type="submit"
              >
                Save
              </button>
              <ModalHeader>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full max-w-xs text-2xl font-medium"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="input input-bordered input-sm w-full max-w-xs"
                    name="companyName"
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </ModalHeader>
              <ModalBody>
                <EditableContent name="description" />
              </ModalBody>
            </>
          ) : (
            <>
              <button
                type="button"
                className="place-self-end"
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </button>
              <ModalHeader>
                <h1 className="text-2xl font-medium">{title}</h1>
                <span>{values.companyName}</span>
              </ModalHeader>
              <ModalBody>
                <div className="h-48 overflow-x-auto border-b-2 border-solid border-gray-100 p-2">
                  {values.description}
                </div>
              </ModalBody>
            </>
          )}
        </form>
      )}
    </Formik>
  );
}
