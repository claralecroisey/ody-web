import { PlusSmallIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Column({ title }: { title: string }) {
  return (
    <div className="h-full rounded-md bg-indigo-100 p-2">
      <div className="p-2 text-center font-semibold">{title}</div>
    </div>
  );
}

export default function Board() {
  const navigate = useNavigate();

  return (
    <div className="container flex h-full flex-col">
      <div className="flex justify-between">
        <h1 className="mb-12 text-xl">Board</h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate('new')}
        >
          <PlusSmallIcon className="h-6 w-6" />
          Add job
        </button>
      </div>
      <div className="flex-1 columns-5">
        <Column title="Saved" />
        <Column title="Applied" />
        <Column title="In Process" />
        <Column title="Offer" />
        <Column title="Archive" />
      </div>
    </div>
  );
}
