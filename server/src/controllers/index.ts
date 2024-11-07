import ProjectManagersController from './project-managers.controller';
import ProjectsController from './projects.controller';
import TasksController from './tasks.controller';

export const Controllers = [
  ProjectsController,
  ProjectManagersController,
  TasksController,
] as const;
