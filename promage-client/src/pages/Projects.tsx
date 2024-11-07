import { useContext, useState } from 'react';

import { Table } from '../components'
import { ProjectsContext } from '../contexts/ProjectsContext';
import FormModal from '../components/modals/FormModal';

const Projects = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpenModal = () => setShow(true);
  const { projects } = useContext(ProjectsContext);

  return (
    <div>
      <FormModal
        isOpen={show}
        closeModal={handleClose}
        title='Create Project'
      />
      <div className='flex justify-between p-4'>
        <h3 className='font-bold'>Projects</h3>
        <button onClick={handleOpenModal} className='border-[1px] border-gray-700 rounded-md text-xs p-1.5'>
          New Project
        </button>
      </div>
      <Table projects={projects} type='projects' />
    </div>
  )
}
export default Projects;
