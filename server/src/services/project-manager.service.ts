import { ProjectManagerRepository } from '../dataaccess/project-manager.repository';
import { ProjectRepository } from '../dataaccess/project.repository';
import { IProjectManager } from '../utils/types';
import { Send } from '../sockets/websockets';

export class ProjectManagersService {
  
  async CreateProjectManager(newProjectManager: IProjectManager) {
    try {
      const emailExist = await ProjectManagerRepository.findOne({
        where: { email: newProjectManager.email},
      });
      if (emailExist) {
        throw new Error('Project manager with this email already exists!');
      }
      return await ProjectManagerRepository.CreateProjectManager(newProjectManager)
    } catch (error: any) {
      return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
  }

  async GetAllManagers() {
    try {
      return await ProjectManagerRepository.find();
    } catch(error: any) {
      return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
  }

  async AssignProject(projectId: number, projectManagerId: number) {
    try {
      const project = await ProjectRepository.findOne({
        where: { id: projectId },
        relations: {
          projectManagers: true,
        }
      });
      const projectManager = await ProjectManagerRepository.findOne({
        where: { id: projectManagerId },
      });
      if (!project || !projectManager) {
        throw new Error('Either project or project manager does not exist');
      }
      const alreadyAssigned = project.projectManagers.some(manager => manager.id == projectManagerId);
      if (alreadyAssigned) {
        throw new Error('Project Manager is already assigned to the project');
      }
      project.projectManagers.push(projectManager);
      await ProjectRepository.save(project);
      return { success: true, message: 'Project assigned successfully' };
    } catch (error: any) {
      return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
  }
}
