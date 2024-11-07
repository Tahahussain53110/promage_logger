import React, {
  useEffect,
  useState,
  createContext,
  FC,
  ReactNode,
} from 'react';

import { getAllProjects } from '../services/apiCalls';
import { IProjectsContext } from '../utils';

const defaultProjectsContext: IProjectsContext = {
  projects: [{
    id: 0,
    name: '',
    projectManagers: [{
      id: 0,
      name: '',
      age: 0,
      email: '',
      createdAt: '',
      updatedAt: '',
    }],
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
    startDate: '',
    endDate: '',
    createdAt: '',
    updatedAt: '',
  }],
  setProjects: () => {},
  pagination: {
    page: 1,
    perPage: 10,
    total: 1,
  },
  setPagination: () => {},
  resetPagination: () => {},
  getProjects: () => {},
};
export const ProjectsContext = createContext<IProjectsContext>(
  defaultProjectsContext
);

interface Props {
  children: ReactNode;
}

const ProjectsContextContainer: FC<Props> = (props) => {
  const [projects, setProjects] = useState(defaultProjectsContext.projects);
  const [pagination, setPagination] = useState(
    defaultProjectsContext.pagination
  );

  const resetPagination = () => {
    setPagination(defaultProjectsContext.pagination);
  };

  const getProjects = async() => {
    const res = await getAllProjects()
    setProjects(res);
  }

  useEffect(() => {
    getProjects();
  }, [pagination]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        pagination,
        setPagination,
        resetPagination,
        getProjects,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextContainer;
