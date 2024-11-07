import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatDate } from '../helpers/DateFromater';
import { IProjects } from '../utils';
import { isDatePassed } from '../helpers/checkDatePassed';
import FormModal from './modals/FormModal';

const ProjectsBody = ({ projects }: { projects: IProjects[] | undefined }) => {
  const [show, setShow] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [type, setType] = useState('');
  const handleClose = () => setShow(false);
  const handleOpenModal = (id: number, title: string) => {
    setType(title);
    setProjectId(id);
    setShow(true);
  };
  const navigate = useNavigate();

  const showTasks = (project: IProjects) => {
    if (project?.tasks.length > 0) {
      navigate(`/tasks/${project?.id}`);
    } else {
      alert("No Tasks Found");
    }
  };

  return (
    <tbody>
      <FormModal
        isOpen={show}
        closeModal={handleClose}
        title= {type}
        projectId={projectId}
      />
      {Array.isArray(projects) &&
        projects.map((project, index) => (
          <tr key={index} className="text-center text-xs cursor-pointer hover:bg-gray-200" onClick={() => showTasks(project)}>
            <td className="py-2 px-4">{project.name}</td>
            <td className="py-2 px-4">
              {project.projectManagers.length > 0 ? (
                <select>
                  {project.projectManagers.map((manager, index) => (
                    <option key={index}>{manager.name}</option>
                  ))}
                  <option></option>
                </select>
              ) : (
                <span onClick={() => handleOpenModal(project.id, 'Assign Project')} className='text-red-600 font-bold'>not-assigned(click to assign)</span>
              )}
            </td>
            <td className="py-2 px-4">{formatDate(project.startDate)}</td>
            <td className="py-2 px-4">{formatDate(project.endDate)}</td>
            <td className="py-2 px-4">
              <input type='checkbox' className='bg-red-400 text-blue-500' disabled checked={!isDatePassed(project.endDate)} />
            </td>
            <td className="py-2 px-4" onClick={() => handleOpenModal(project.id, 'Create Task')}>Create Task</td>
          </tr>
        ))}
    </tbody>
  );
};

export default ProjectsBody;
