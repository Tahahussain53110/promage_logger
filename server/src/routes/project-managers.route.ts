import ProjectManagersController from '../controllers/project-managers.controller';
import { SendEvents } from '../middlewares/SendEvents';
import type { Route } from '../utils/types';

export const ProjectManagersRoutes: Array<Route> = [
  {
    method: 'post',
    route: '/api/project-managers',
    middlewares: [],
    controller: ProjectManagersController,
    action: 'CreateProjectManager',
  },
  {
    method: 'get',
    route: '/api/project-managers',
    middlewares: [SendEvents],
    controller: ProjectManagersController,
    action: 'GetAllManagers',
  },
  {
    method: 'patch',
    route: '/api/project-managers',
    middlewares: [SendEvents],
    controller: ProjectManagersController,
    action: 'AssignProject',
  },
];
