import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { apiConfig } from 'commons/apiConfig';
import Member from 'components/Teams/Member';

afterEach(cleanup);

describe('Member', () => {
  it('Should display member name', async () => {
    const member_information = {
      id: 2,
      username: 'test1',
      email: 'test1@example.com',
      team_of_affiliation: 1,
    };
    render(<Member user={member_information} />);
    expect(screen.getByText('test1')).toBeTruthy();
  });
});
