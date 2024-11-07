import React, {
  useState,
  createContext,
  FC,
  ReactNode,
} from 'react';

import { getAllManagers } from '../services/apiCalls';
import { IProjectManagersContext } from '../utils';

const defaultProjectManagersContext: IProjectManagersContext = {
  managers: [{
    id: 0,
    name: '',
    age: 0,
    email: '',
    createdAt: '',
    updatedAt: '',
  }],
  getProjectManagers: () => {},
};
export const ProjectManagersContext = createContext<IProjectManagersContext>(
  defaultProjectManagersContext
);

interface Props {
  children: ReactNode;
}

const ProjectManagersContextContainer: FC<Props> = (props) => {
  const [managers, setManagers] = useState(defaultProjectManagersContext.managers);

  const getProjectManagers = async() => {
    const res = await getAllManagers();
    setManagers(res);
  }

  return (
    <ProjectManagersContext.Provider
      value={{
        managers,
        getProjectManagers,
      }}
    >
      {props.children}
    </ProjectManagersContext.Provider>
  );
};

export default ProjectManagersContextContainer;
