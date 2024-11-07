import { Request, Response } from 'express';
import { ProjectsService } from '../services';

export class ProjectsController {

  private readonly projectService = new ProjectsService();

  async GetAllProjects(request: Request, response: Response) {
    const allProjects = this.projectService.GetAllProjects();
    return allProjects;
  }

  async CreateProject(request: Request, response: Response) {
    const { newProject } = request.body;
    const createdProject = this.projectService.CreateProject(newProject)
    return createdProject;
  }

  async GetProjectById(request: Request, response: Response) {
    const projectId = request.params.id;
    const project = this.projectService.GetProjectById(+projectId);
    return project;
  }
}

export default ProjectsController;
