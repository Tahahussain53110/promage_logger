import { formatDate } from '../helpers/DateFromater';
import { ITasks } from '../utils';

const TasksBody = ({ tasks }: { tasks: [ITasks] | undefined }) => {

  return (
    <tbody>
  {
    tasks?.map((task, index) => (
      <tr className='text-center text-xs cursor-pointer hover:bg-gray-200'>
        <td className='py-2 px-4'>{task.title}</td>
        <td className='py-2 px-4'>{task.description}</td>
        <td className='py-2 px-4'>
        {
          task.projectManager.name ?
            task.projectManager.name
          : <span className='text-red-600 font-bold'>not-assigned</span>
        }
        </td>
        <td className='py-2 px-4'>{formatDate(task.startDate)}</td>
        <td className='py-2 px-4'>{formatDate(task.endDate)}</td>
        <td className='py-2 px-4 text-red border-[1px] p-2'>
          Edit
        </td>
      </tr>
    ))
  }
  </tbody>
  )
}
export default TasksBody;
