import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import MembersList from 'components/Teams/MembersList';

afterEach(cleanup);

describe('MemberList', () => {
  it('Should display three member', () => {
    const members_list = [
      {
        id: 2,
        username: 'test1',
        email: 'test1@example.com',
        team_of_affiliation: 1,
      },
      {
        id: 5,
        username: 'test4',
        email: 'test4@example.com',
        team_of_affiliation: 1,
      },
      {
        id: 10,
        username: 'test10',
        email: 'test10@example.com',
        team_of_affiliation: 1,
      },
    ];
    render(<MembersList membersInformation={members_list} />);
    expect(screen.getByText('test1')).toBeTruthy();
    expect(screen.getByText('test4')).toBeTruthy();
    expect(screen.getByText('test10')).toBeTruthy();
  });
});
