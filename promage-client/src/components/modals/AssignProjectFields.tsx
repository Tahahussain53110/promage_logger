import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { AssignProject } from '../../services/apiCalls';
import { ProjectManagersContext } from '../../contexts/ProjectManagersContext';

const AssignProjectForm = ({ closeModal, projectId }: any) => {

  const [projectManager, setProjectManager] = useState(0);

  const { managers, getProjectManagers } = useContext(ProjectManagersContext);
  const handleSubmit = async () => {
    
    const obj = {
      projectId: +projectId,
      projectManagerId: +projectManager,
    }
    await AssignProject(obj);
    closeModal();
  };

  useEffect(() => {
    getProjectManagers();
  }, []);


  return (
    <div className="space-y-2">

      <select onChange={(e) => setProjectManager(+e.target.value)} className="border-[1px] rounded-md text-sm p-2 border-gray--700 w-full outline-none">
        <option value="">Select a manager</option>
        {
          managers.map((manger, index) => (
            <option key={index} value={manger.id} >{manger.name}</option>
          ))
        }
      </select>
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
export default AssignProjectForm;
