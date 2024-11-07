import { NextFunction, Request, Response } from 'express';
import { Send } from '../sockets/websockets';

export const  SendEvents = (req: Request, res: Response, next: NextFunction) => {
  const url = req.originalUrl; // Gets the original URL, including query parameters
  const method = req.method;
  const urlMethodKey = `${method}:${url}`;
console.log("kkkkkk - ", urlMethodKey);
  switch(urlMethodKey) {
    case 'GET:/api/project-managers':
      Send('get-all-project-managers');
      break;
    case 'POST:/api/project-managers':
      Send('create-project-manager');
      break;
    case 'PATCH:/api/project-managers':
      Send('assign-project-to-manager');
      break;
    case 'GET:/api/projects':
      Send('get-all-projects');
      break;
    case 'GET:/api/projects/:id':
      Send('get-one-project');
      break;
    case 'POST:/api/projects':
      Send('create-a-project');
      break;
    case 'POST:/api/tasks':
      Send('create-a-task');
      break;
    case 'PATCH:/api/tasks':
      Send('update-a-task');
      break;
    case 'GET:/api/tasks/:id':
      Send('get-one-task');
      break;
    default:
      break;
  }
  next();
}
