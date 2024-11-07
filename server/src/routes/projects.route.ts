import ProjectsController from '../controllers/projects.controller';
import { SendEvents } from '../middlewares/SendEvents';
import type { Route } from '../utils/types';

export const ProjectsRoutes: Array<Route> = [
  {
    method: 'get',
    route: '/api/projects',
    middlewares: [SendEvents],
    controller: ProjectsController,
    action: 'GetAllProjects',
  },
  {
    method: 'get',
    route: '/api/projects/:id',
    middlewares: [SendEvents],
    controller: ProjectsController,
    action: 'GetProjectById',
  },
  {
    method: 'post',
    route: '/api/projects',
    middlewares: [SendEvents],
    controller: ProjectsController,
    action: 'CreateProject',
  },
];
