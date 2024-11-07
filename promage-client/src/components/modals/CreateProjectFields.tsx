import { ChangeEvent, useContext, useState } from "react";
import { createProject } from "../../services/apiCalls";
import { ProjectsContext } from "../../contexts/ProjectsContext";

const CreateProjectForm = ({ closeModal }: any) => {
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value);
  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);

  const { getProjects } = useContext(ProjectsContext);

  const handleSubmit = async () => {
    if (projectName.length < 3 || !startDate || !endDate) {
      alert('Please fill in all fields and ensure the project name is at least 3 characters.');
      return;
    }
    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);
    if (startDateObject >= endDateObject) {
      alert('Start date must be earlier than the end date.');
      return;
    }

    const currentDate = new Date();

    if (startDateObject < currentDate || endDateObject < currentDate) {
      alert('Start and end dates must be in the future.');
      return;
    }

    const obj = {
      name: projectName,
      startDate,
      endDate,
    }
    await createProject(obj);

    setProjectName('');
    setStartDate('');
    setEndDate('');
    getProjects();
    closeModal();
  };

  return (
    <div className="space-y-2">
      <input
        value={projectName}
        onChange={handleNameChange}
        placeholder="Project name"
        className="border-[1px] rounded-md text-sm p-2 border-gray--700 w-full outline-none"
      />

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
export default CreateProjectForm;
