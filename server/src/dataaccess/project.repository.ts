import { AppDataSource } from '../data-source';
import { Project } from '../entities/project.entity';
import { IProject } from '../utils/types';

export const ProjectRepository = AppDataSource.getRepository(Project).extend({

  async GetAllProjects() {
    const projectsList = await this.find({
      relations: {
        projectManagers: true,
        tasks: true,
      }
    });
    return projectsList;
  },

  async CreateProject(newProject: IProject) {
    const createdProject = await this.save(newProject);
    return createdProject;
  },

  async GetProjectById(projectId: number) {
    const project = await this.findOne({
      where: {
        id: projectId,
      },
      relations: {
        tasks: true,
        projectManagers: true,
      },
    });
    return project;
  }
});
