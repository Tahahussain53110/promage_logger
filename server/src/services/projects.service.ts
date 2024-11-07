import { ProjectRepository } from '../dataaccess/project.repository';
import { IProject } from '../utils/types';

export class ProjectsService {

  async GetAllProjects() {
    try {
      return await ProjectRepository.GetAllProjects();
    } catch(error: any) {
      return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
  }

  async CreateProject(newProject: IProject) {
    try {
      const alreadyExist = await ProjectRepository.findOne({
        where: { name: newProject.name },
      });
      if (alreadyExist) {
        throw new Error('Project already exists!');
      }
      return await ProjectRepository.CreateProject(newProject);
    } catch(error: any) {
      return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
  }

  async GetProjectById(projectId: number) {
    try {
      const project = await ProjectRepository.GetProjectById(projectId);
      
      if (!project) {
        throw new Error('No project found');
      }
      return project;
    } catch(error: any) {
      return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
  }
}
