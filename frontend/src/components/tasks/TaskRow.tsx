import React from 'react';

interface TaskProps {
  id: number;
  title: string;
  status: string;
  start_date: string;
  end_date: string;
}

const TaskRow: React.FC<TaskProps> = ({
  id,
  title,
  status,
  start_date,
  end_date,
}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{status}</td>
      <td>{start_date}</td>
      <td>{end_date}</td>
    </tr>
  );
};

export default TaskRow;
