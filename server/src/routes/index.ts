import { Route } from '../utils/types';
import { ProjectManagersRoutes } from './project-managers.route';
import { ProjectsRoutes } from './projects.route';
import { TasksRoutes } from './tasks.route';

export const Routes: Array<Route> = [
  ...ProjectsRoutes,
  ...ProjectManagersRoutes,
  ...TasksRoutes,
];
