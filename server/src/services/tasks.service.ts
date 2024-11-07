import { TaskRepository } from '../dataaccess/task.repository';
import { ITask } from '../utils/types';

export class TasksService {

  async GetAllProjectTasks(projectId: number) {
    try {
      return await TaskRepository.find({
        where: { project: { id: projectId } },
        relations: { projectManager: true, project: true, },
      })
    } catch(error: any) {
      return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
  }

  async CreateTask(newTask: ITask) {
    try {
      const alreadyExist = await TaskRepository.findOne({
        where: { title: newTask.title },
      });
      if (alreadyExist) {
        throw new Error('Task with this title already exists!');
      }
      return await TaskRepository.CreateTask(newTask);
    } catch(error: any) {
      return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
  }

  async UpdateTask(taskId: number, taskData: ITask) {
    try {
      const task = await TaskRepository.findOne({
        where: { id: taskId },
      })
      if (!task) {
        throw new Error('No task found');
      }
      const updatedTask = await TaskRepository.UpdateTask(taskId, taskData);
      return updatedTask;
    } catch(error: any) {
      return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
  }
}
