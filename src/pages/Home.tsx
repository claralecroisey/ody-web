import Tag from '../components/ui/Tag';
import { tasksData } from '../mock';
import { Project } from '../types/ProjectsTasks';

function ProjectLine({ project }: { project: Project }) {
  return (
    <div>
      <h1 className="text-lg font-bold">{project.title}</h1>
      <p className="font-light italic">{project.description}</p>
      <div className="mt-4 space-y-3">
        {project.tasks.map(({ id, title, description, status, priority }) => (
          <div
            key={id}
            className="card card-compact card-bordered w-full border-4"
          >
            <div className="card-body">
              <h3 className="flex justify-between text-base font-semibold">
                {title} <Tag color="grey">{status}</Tag>
              </h3>
              {description ? <span>{description}</span> : null}
              <span className="text-xs font-light">Priority: {priority}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const userData = {
    firstName: 'Jane',
  };
  const data = tasksData;

  return (
    <div className="container">
      <h1 className="text-2xl font-medium">Hello {userData.firstName} 👋</h1>
      <div className="container mt-12 flex">
        <div id="current-tasks" className="flex flex-col space-y-8">
          {data.projects.map(project => (
            <ProjectLine key={project.id} project={project} />
          ))}
        </div>
        <div id="stats"></div>
      </div>
    </div>
  );
}
