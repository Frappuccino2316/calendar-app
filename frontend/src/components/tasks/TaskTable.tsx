import React from 'react';
import TaskRow from 'components/tasks/TaskRow';

interface Task {
  id: number;
  title: string;
  status: string;
  start_date: string;
  end_date: string;
}

interface TasksProps {
  tasks: Task[];
}

const TaskTable: React.FC<TasksProps> = ({ tasks }) => {
  const taskRows = tasks.map((task) => {
    <tr key={task.id}>
      <TaskRow {...task} />
    </tr>;
  });
  return (
    <table>
      <thead>
        <th>Title</th>
        <th>Status</th>
        <th>Start</th>
        <th>End</th>
      </thead>
      <tbody>{taskRows}</tbody>
    </table>
  );
};

export default TaskTable;
