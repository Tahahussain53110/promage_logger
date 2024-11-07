import { FiX } from 'react-icons/fi';
import { ModalHeaderProps } from '../../utils';

const ModalHeader = ({ title, closeModal, parentBoxStyle = "" }: ModalHeaderProps) => {
  return (
    <div className={`flex justify-between items-center ${parentBoxStyle}`}>
      <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-black'>
        {title}
      </h1>
      <FiX
        size={25}
        onClick={closeModal}
        className="bg-gray-700 text-white p-1 ml-4 rounded-full hover:bg-gray-400 transition-colors duration-300 cursor-pointer"
      />
    </div>
  );
};

export default ModalHeader;
