import React from 'react';

interface TaskProps {
  id: number;
  title: string;
  team_in_charge: number;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

const TaskRow: React.FC<TaskProps> = ({
  id,
  title,
  team_in_charge,
  status,
  start_date,
  end_date,
  created_at,
  updated_at,
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
