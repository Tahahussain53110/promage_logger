import { AppDataSource } from '../data-source';
import { Task } from '../entities/task.entity';
import { ITask } from '../utils/types';

export const TaskRepository = AppDataSource.getRepository(Task).extend({

  async GetAll() {
    const taskList = await this.find()
    return taskList;
  },

  async CreateTask(newTask: ITask) {
    const createdTask = await this.save(newTask);
    return createdTask;
  },

  async UpdateTask(taskId: number, updatedTask: ITask) {
    const existingTask = await this.findOne({
      where: { id: taskId},
    });
    if (!existingTask) {
      throw new Error(`Task with ID ${taskId} not found`);
    }
    Object.assign(existingTask, updatedTask);
    const newUpdatedTask = await this.save(existingTask);
    return newUpdatedTask;
  }
});
