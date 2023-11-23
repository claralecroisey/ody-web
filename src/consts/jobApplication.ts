import { JobApplicationStatus } from '../types/JobApplication';

export const JobApplicationStatuses: { [key in JobApplicationStatus]: string } =
  {
    [JobApplicationStatus.Saved]: 'Saved',
    [JobApplicationStatus.Applied]: 'Applied',
    [JobApplicationStatus.Rejected]: 'Rejected',
    [JobApplicationStatus.InProcess]: 'In Process',
    [JobApplicationStatus.OfferReceived]: 'Offer Received',
    [JobApplicationStatus.OfferRejected]: 'Offer Rejected',
    [JobApplicationStatus.OfferAccepted]: 'Offer Accepted',
    [JobApplicationStatus.Closed]: 'Closed',
    [JobApplicationStatus.Withdrawn]: 'Withdrawn',
  };
