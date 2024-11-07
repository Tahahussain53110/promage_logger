import { Dispatch, SetStateAction } from 'react';

export interface IProjects {
  id: number;
  name: string;
  projectManagers: [IProjectManager];
  tasks: [any];
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITasks {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  project: IProjects;
  projectManager: IProjectManager;
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectManager {
  id: number;
  name: string;
  age: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectManagersContext {
  managers: [IProjectManager];
  getProjectManagers: () => void;
}
export interface IProjectsContext {
  projects: [IProjects];
  setProjects: Dispatch<SetStateAction<[IProjects]>>;
  pagination: IPagination;
  tasks?: [ITasks];
  setPagination: Dispatch<SetStateAction<IPagination>>;
  resetPagination: () => void;
  getProjects: () => void;
}

export interface ITasksContext {
  tasks: [any];
  setTasks: Dispatch<SetStateAction<[any]>>;
  pagination: IPagination;
  setPagination: Dispatch<SetStateAction<IPagination>>;
  resetPagination: () => void;
  getProjectTasks: (projectId: number) => void,
}

export interface IPagination {
  page: number;
  perPage: number;
  total: number;
}

export interface ModalHeaderProps {
  title: string;
  closeModal: () => void;
  parentBoxStyle?: string;
}

export interface IProjectModal {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  projectId?: number;
  projectManagerId?: number;
}