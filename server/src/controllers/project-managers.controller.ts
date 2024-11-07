import { Request, Response } from 'express';
import { ProjectManagersService } from '../services';

export class ProjectManagersController {

  private readonly projectManagersService = new ProjectManagersService();

  async CreateProjectManager(request: Request, response: Response) {
    const { newProjectManager } = request.body;
    const createdProjectManager = this.projectManagersService.CreateProjectManager(newProjectManager)
    return createdProjectManager;
  }

  async AssignProject(request: Request, response: Response) {
    const { projectId, projectManagerId } = request.body;
    const assignedProject = this.projectManagersService.AssignProject(projectId, projectManagerId);
    return assignedProject;
  }

  async GetAllManagers(request: Request, response: Response) {
    const allProjects = this.projectManagersService.GetAllManagers()
    return allProjects;
  }
}

export default ProjectManagersController;
