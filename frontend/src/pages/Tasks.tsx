import React from 'react';
import Auth from 'components/Auth';
import Title from 'components/Title';
import TaskTable from 'components/tasks/TaskTable';

const Tasks: React.FC = () => {
  const tasks = [
    {
      id: 0,
      title: 'Task1',
      status: 'planning',
      start_date: '2021-04-16',
      end_date: '2021-04-18',
    },
    {
      id: 1,
      title: 'Task2',
      status: 'dev_ready',
      start_date: '2021-04-19',
      end_date: '2021-05-17',
    },
  ];
  return (
    <Auth>
      <Title title="Task" />
      <TaskTable tasks={tasks} />
    </Auth>
  );
};

export default Tasks;
