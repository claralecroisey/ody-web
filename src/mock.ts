import { Project, TaskPriority, TaskStatus } from './types/ProjectsTasks';

export const tasksData: { projects: Project[] } = {
  projects: [
    {
      id: 'etzet-tzhreh-75',
      title: 'Get a job',
      description: 'Preparing and applyig to jobs in Tokyo or in other areas',
      tasks: [
        {
          id: 'etzet-tzhreh-75-1',
          title: 'Send an email',
          status: TaskStatus.Doing,
          priority: TaskPriority.None,
        },
        {
          id: 'etzet-tzhreh-75-2',
          title: 'Apply to jobs in Tokyo',
          status: TaskStatus.Todo,
          priority: TaskPriority.High,
        },
      ],
    },
    {
      id: 'birle-tgisfh-72',
      title: 'Build Ody',
      description: 'a full stack app',
      tasks: [
        {
          id: 'birle-tgisfh-72-1',
          title: 'Start building a POC with React',
          description:
            'Choose frameworks, libs, styling, state management, and start building',
          status: TaskStatus.Doing,
          priority: TaskPriority.High,
        },
      ],
    },
  ],
};
