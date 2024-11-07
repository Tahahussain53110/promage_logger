import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { createTask } from '../../services/apiCalls';
import { ProjectManagersContext } from '../../contexts/ProjectManagersContext';
import { TasksContext } from '../../contexts/TasksContext';

const CreateTaskForm = ({ closeModal, projectId = 0 }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectManager, setProjectManager] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { managers, getProjectManagers } = useContext(ProjectManagersContext);
  const { getProjectTasks, tasks } = useContext(TasksContext);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);

  const handleSubmit = async () => {
    if (title.length < 3 || !startDate || !endDate) {
      alert('Please fill in all fields and ensure the project name is at least 3 characters.');
      return;
    }
    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);
    if (startDateObject >= endDateObject) {
      alert('Start date must be earlier than the end date.');
      return;
    }

    if (projectManager == 0) {
      alert('Select a Project Manager');
      return;
    }

    const currentDate = new Date();

    if (startDateObject < currentDate || endDateObject < currentDate) {
      alert('Start and end dates must be in the future.');
      return;
    }
    const projectID = projectId > 0 ? projectId : +(window.location.pathname.split('/').pop() || 0);
    const obj = {
      title,
      description,
      projectManager,
      project: projectID,
      startDate,
      endDate,
    }
    await createTask(obj);

    setTitle('');
    setDescription('')
    setProjectManager(0);
    setStartDate('');
    setEndDate('');
    getProjectTasks(tasks[0].project.id);
    closeModal();
  };

  useEffect(() => {
    getProjectManagers();
  }, []);

  return (
    <div className="space-y-2">
      <input
        value={title}
        onChange={handleTitleChange}
        placeholder="Task title"
        className="border-[1px] rounded-md text-sm p-2 border-gray--700 w-full outline-none"
      />

      <input
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Task description"
        className="border-[1px] rounded-md text-sm p-2 border-gray--700 w-full outline-none"
      />

      <select onChange={(e) => setProjectManager(+e.target.value)} className="border-[1px] rounded-md text-sm p-2 border-gray--700 w-full outline-none">
        <option value="">Select a manager</option>
        {
          managers.map((manger, index) => (
            <option key={index} value={manger.id} >{manger.name}</option>
          ))
        }
      </select>

      <input
        type="text"
        value={startDate}
        onChange={handleStartDateChange}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        placeholder="Start Date"
        className="border-[1px] rounded-md text-sm p-2 border-gray--700 w-full outline-none"
      />
      <input
        type="text"
        value={endDate}
        onChange={handleEndDateChange}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        placeholder="End Date"
        className="border-[1px] rounded-md text-sm p-2 border-gray--700 w-full outline-none"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="text-white bg-gray-700
          font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-secondary_bg_color"
      >
        Submit
      </button>
    </div>
  )
}
export default CreateTaskForm;
