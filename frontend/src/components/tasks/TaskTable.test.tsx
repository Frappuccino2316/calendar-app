import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskTable from './TaskTable';

describe('Task Table', () => {
  it('Should display TaskTable', () => {
    const tasks = [
      {
        id: 0,
        title: 'Example Task',
        status: 'planning',
        start_date: '2021-04-16',
        end_date: '2021-04-20',
      },
      {
        id: 1,
        title: 'Example Task2',
        status: 'dev_ready',
        start_date: '2020-02-15',
        end_date: '2020-03-13',
      },
      {
        id: 2,
        title: 'Example Task3',
        status: 'developing',
        start_date: '2021-04-15',
        end_date: '2021-04-15',
      },
    ];
    render(<TaskTable tasks={tasks} />);
    expect(screen.getByText('タスク名')).toBeTruthy();
    expect(screen.getByText('planning')).toBeTruthy();
    expect(screen.getByText('2021-04-20')).toBeTruthy();
    expect(screen.getByText('dev_ready')).toBeTruthy();
    expect(screen.getByText('Example Task3')).toBeTruthy();
  });
});
