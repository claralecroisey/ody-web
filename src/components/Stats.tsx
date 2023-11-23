import {
  JobApplicationData,
  JobApplicationStatus,
} from '../types/JobApplication';

interface StatsProps {
  jobApplications: JobApplicationData[];
}

export function Stats({ jobApplications }: StatsProps) {
  const appliedJobsCount = jobApplications.filter(
    j => j.status !== JobApplicationStatus.Saved,
  ).length;
  const inProcessJobsCount = jobApplications.filter(
    j => j.status === JobApplicationStatus.InProcess,
  ).length;
  const offerReceivedCount = jobApplications.filter(j =>
    [
      JobApplicationStatus.OfferReceived,
      JobApplicationStatus.OfferAccepted,
      JobApplicationStatus.OfferRejected,
    ].includes(j.status),
  ).length;

  return (
    <div className="stats shadow">
      <div className="stat place-items-center">
        <div className="stat-title">Applied</div>
        <div className="stat-value">{appliedJobsCount}</div>
        {/* TODO: Add real date range */}
        <div className="stat-desc">Jan 1st - Feb 1st</div>{' '}
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Currently In Process</div>
        <div className="stat-value">{inProcessJobsCount}</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Offers received</div>
        <div className="stat-value">{offerReceivedCount}</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>
    </div>
  );
}
