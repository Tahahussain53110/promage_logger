import React, {
  useState,
  createContext,
  FC,
  ReactNode,
  useEffect,
} from 'react';

import { getAllProjectTasks } from '../services/apiCalls';
import { ITasksContext } from '../utils';

const defaultTasksContext: ITasksContext = {
  tasks: [{
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    project: {
      id: 0,
      name: '',
      tasks: [{
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        id: 0,
        status: '',
        createdAt: '',
        updatedAt: '',
      }],
      projectManagers: [{
        id: 0,
        name: '',
        age: 0,
        email: '',
        createdAt: '',
        updatedAt: '',
      }],
      startDate: '',
      endDate: '',
      createdAt: '',
      updatedAt: '',
    },
    projectManager: {
      id: 0,
      name: '',
      age: 0,
      email: '',
      createdAt: '',
      updatedAt: '',
    },
    id: 0,
    status: '',
    createdAt: '',
    updatedAt: '',
  }],
  setTasks: () => {},
  pagination: {
    page: 1,
    perPage: 10,
    total: 1,
  },
  setPagination: () => {},
  resetPagination: () => {},
  getProjectTasks: (projectId: number) => {},
};
export const TasksContext = createContext<ITasksContext>(
  defaultTasksContext
);

interface Props {
  children: ReactNode;
}

const TasksContextContainer: FC<Props> = (props) => {
  const [tasks, setTasks] = useState(defaultTasksContext.tasks);
  const [pagination, setPagination] = useState(
    defaultTasksContext.pagination
  );

  const resetPagination = () => {
    setPagination(defaultTasksContext.pagination);
  };

  const getProjectTasks = async(projectId: number) => {
    const res = await getAllProjectTasks(projectId);
    setTasks(res);
  }

  // useEffect(() => {
  //   getProjectTasks();
  // }, [pagination]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        pagination,
        setPagination,
        resetPagination,
        getProjectTasks,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksContextContainer;
