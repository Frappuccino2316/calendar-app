import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskRow from 'components/tasks/TaskRow';

describe('Task Row', () => {
  it('Should display task title', () => {
    const task = {
      id: 0,
      title: 'Example Task',
      status: 'planning',
      start_date: '2021-04-16',
      end_date: '2021-04-20',
    };
    render(<TaskRow {...task} />);
    expect(screen.getByText('Example Task')).toBeTruthy();
  });
});
