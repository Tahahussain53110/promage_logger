import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Table } from '../components';
import { TasksContext } from '../contexts/TasksContext';
import FormModal from '../components/modals/FormModal';

const Tasks = () => {
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const [projectId, setProjectId] = useState(id);
  const handleClose = () => setShow(false);
  const handleOpenModal = (title: string) => {
    setType(title);
    setShow(true);
  };
  const { getProjectTasks, tasks } = useContext(TasksContext);
  
  const handleGetAllTasks = async () => {
    if (id) {
      await getProjectTasks(+id);
    }
  }
  
  useEffect(() => {
    handleGetAllTasks()
  }, [id])

  return (
    <div>
      <FormModal
        isOpen={show}
        closeModal={handleClose}
        title={type}
        projectId={+(projectId ?? 0)}
      />
      
      <div className='py-4 px-4 flex justify-between'>
        <h1 className='text-sm'>Project: <span className='font-bold'>{tasks[0].project.name}</span></h1>
        <button onClick={() => handleOpenModal('Create Task')} className='border-[1px] border-gray-700 rounded-md text-xs p-1.5'>
          New Task
        </button>
        <button onClick={() => handleOpenModal('Assign Project')} className='border-[1px] border-gray-700 rounded-md text-xs p-1.5'>
          Assign Project
        </button>
      </div>
      <Table tasks={tasks} type='tasks'  />
    </div>
  )
}
export default Tasks;
