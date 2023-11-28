import { useAuth0 } from '@auth0/auth0-react';
import { Stats } from '../components/Stats';
import { useGetJobApplicationsQuery } from '../queries/useGetJobApplicationsQuery';
import { Loader } from '../components/ui/Loader';
import { JobApplicationData } from '../types/JobApplication';

export default function Home() {
  const { user } = useAuth0();
  const { data: jobApplications, isPending } = useGetJobApplicationsQuery();

  return (
    <div className="container flex h-full flex-col">
      <h1 className="pb-16 text-2xl font-medium">
        Welcome back {user?.given_name} 👋
      </h1>
      {isPending ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Stats jobApplications={jobApplications as JobApplicationData[]} />
      )}
    </div>
  );
}
