import {
  JobApplicationData,
  JobApplicationStatus,
} from './types/JobApplication';
import { UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export const mockJobApplications: JobApplicationData[] = [
  {
    id: uuidv4() as UUID,
    title: 'Software Engineer',
    companyName: 'Google',
    description: 'Some description',
    status: JobApplicationStatus.Applied,
    role: 'Software Engineer',
    url: 'https://www.google.com',
  },
  {
    id: uuidv4() as UUID,
    title: 'Software Engineer',
    companyName: 'Facebook',
    description: 'Some description',
    status: JobApplicationStatus.InProcess,
    role: 'Software Engineer',
    url: 'https://www.facebook.com',
  },
  {
    id: uuidv4() as UUID,
    title: 'Software Engineer',
    companyName: 'Apple',
    description: 'Some description',
    status: JobApplicationStatus.OfferReceived,
    role: 'Software Engineer',
    url: 'https://www.apple.com',
  },
  {
    id: uuidv4() as UUID,
    title: 'Software Engineer',
    companyName: 'Netflix',
    description: 'Some description',
    status: JobApplicationStatus.OfferAccepted,
    role: 'Software Engineer',
    url: 'https://www.netflix.com',
  },
];
