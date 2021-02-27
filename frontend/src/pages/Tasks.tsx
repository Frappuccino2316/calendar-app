import React from 'react';
import Auth from 'components/Auth';
import Title from 'components/Title';

const Tasks: React.FC = () => {
  return (
    <Auth>
      <Title title="Task" />
    </Auth>
  );
};

export default Tasks;
