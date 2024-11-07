import { Controllers } from '../controllers';

export type Route = {
  method: string;
  route: string;
  middlewares: Array<Function>;
  controller: (typeof Controllers)[number];
  action: string;
};

export interface IProject {
  name: string;
  tasks: [ITask];
  startDate: string;
  endDate: string;
  projectManagers: [any];
}

export interface ITask {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: TaskStatusType;
  project: IProject;
  projectManager: IProjectManager;
}

export interface IProjectManager {
  name: string;
  age: number;
  email: string;
  tasks: [ITask];
  projects: [IProject];
}

export type TaskStatusType = 'completed' | 'started' | 'not-started' | 'rejected';
