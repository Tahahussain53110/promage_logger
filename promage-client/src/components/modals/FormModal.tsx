import React from 'react';
import Modal from 'react-modal';

import ModalHeader from './ModalHeader';
import CreateProjectForm from './CreateProjectFields';
import { IProjectModal } from '../../utils';
import CreateTaskForm from './CreateTaskFields';
import AssignProjectForm from './AssignProjectFields';


const FormModal = ({
  isOpen,
  closeModal,
  title,
  projectId = 0,
  projectManagerId = 0,
}: IProjectModal) => {

  const fileNameModalCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "35%",
      minHeight: "fit-content",
    },
    overlay: {
      background: "rgba(71,84,93,0.8)",
      zIndex: 1,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={fileNameModalCustomStyles}
      ariaHideApp={false}
    >
      <div className="space-y-4 sm:p-8">
        <ModalHeader
          title={title}
          closeModal={closeModal}
        />
        <div className="space-y-4">
          {title === 'Create Task' && <CreateTaskForm closeModal={closeModal} projectId={projectId}/>}
          {title === 'Create Project' && <CreateProjectForm closeModal={closeModal} />}
          {title === 'Assign Project' && <AssignProjectForm closeModal={closeModal} projectId={projectId} projectManagerId={projectManagerId} />}
        </div>
      </div>
    </Modal>
  );
};

export default FormModal;
