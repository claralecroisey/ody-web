export type Project = {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
};

export enum TaskStatus {
  Todo = 'Todo',
  Doing = 'Doing',
  Done = 'Done',
  Cancelled = 'Cancelled',
}

export enum TaskPriority {
  None = 'None',
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Urgent = 'Urgent',
}
