import axios, { setInterceptors } from '../helpers/AxiosConfig';

setInterceptors();
export const getAllProjects = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'api/projects',
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllManagers = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'api/project-managers',
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createProject = async (data: { name: string, startDate: string, endDate: string}) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'api/projects',
      data: { newProject: data },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const AssignProject = async (data: { projectId: number, projectManagerId: number}) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: 'api/project-managers',
      data: { newProject: data },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllProjectTasks = async (projectId: number) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `/api/tasks/${projectId}`,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createTask = async (
  data: {
    title: string,
    description: string,
    project: number,
    projectManager: number,
    startDate: string,
    endDate: string,
  }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'api/tasks',
      data: { newTask: data },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};