export enum JobApplicationStatus {
  Saved = 'saved',
  Applied = 'applied',
  Rejected = 'rejected',
  InProcess = 'in_process',
  OfferReceived = 'offer_received',
  OfferRejected = 'offer_rejected',
  OfferAccepted = 'offer_accepted',
  Closed = 'closed',
  Withdrawn = 'withdrawn',
}

export interface JobApplicationData {
  id: number;
  title: string;
  role: string;
  companyName: string;
  description: string;
  url: string;
  status: JobApplicationStatus;
}
