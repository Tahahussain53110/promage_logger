import ProjectsController from '../controllers/projects.controller';
import TasksController from '../controllers/tasks.controller';
import { SendEvents } from '../middlewares/SendEvents';
import type { Route } from '../utils/types';

export const TasksRoutes: Array<Route> = [
  {
    method: 'get',
    route: '/api/tasks/:id',
    middlewares: [SendEvents],
    controller: TasksController,
    action: 'GetAllProjectTasks',
  },
  {
    method: 'patch',
    route: '/api/tasks',
    middlewares: [SendEvents],
    controller: TasksController,
    action: 'UpdateTask',
  },
  {
    method: 'post',
    route: '/api/tasks',
    middlewares: [SendEvents],
    controller: TasksController,
    action: 'CreateTask',
  },
];
