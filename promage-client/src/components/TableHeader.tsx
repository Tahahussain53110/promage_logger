const TableHeader = ({ type }: { type: string }) => {
  const projectHeader = ['Name', 'Manager', 'Start Date', 'End Date', 'Is Running', 'Task'];
  const taskHeader = ['Name', 'Description', 'Manager', 'Start Date', 'End Date', 'Action'];
  const tableHeader = type === 'projects' ? projectHeader : taskHeader;
  return (
    <thead className='bg-gray-700 text-white'>
      <tr className='text-center text-sm'>
        {
          tableHeader.map((headerItem, index) => (
            <th key={index} className='py-2 px-4'>{headerItem}</th>
          ))
        }
      </tr>
    </thead>
  )
}
export default TableHeader;
