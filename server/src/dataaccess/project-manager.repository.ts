import { AppDataSource } from '../data-source';
import { ProjectManager } from '../entities/project-manager.entity';
import { IProjectManager } from '../utils/types';

export const ProjectManagerRepository = AppDataSource.getRepository(ProjectManager).extend({

  async GetAllProjectTasks() {
    const taskList = await this.find();
    return taskList;
  },

  async CreateProjectManager(newProjectManager: IProjectManager) {
    const createdProjectManager = await this.save(newProjectManager);
    return createdProjectManager;
  },

  async UpdateProjectManager(projectManagerID: number, updatedData: IProjectManager) {
    const existingProjectManager = await this.findOne({
      where: { id: projectManagerID },
    });
    if (!existingProjectManager) {
      throw new Error(`Project Manager with ID ${projectManagerID} not found`);
    }
    Object.assign(existingProjectManager, updatedData);
    const newUpdatedPM = await this.save(existingProjectManager);
    return newUpdatedPM;
  },
});
