import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { apiConfig } from 'commons/apiConfig';
import InvitationList from 'components/Teams/InvitationList';

const baseUrl: string | undefined = apiConfig.apiUrl;

const mock = new MockAdapter(axios);

afterEach(cleanup);

describe('ApplicationForm', () => {
  it('Should display invitation user name', async () => {
    const initialData = [
      {
        id: 24,
        applicant: {
          id: 2,
          username: 'test1',
          email: 'test1@example.com',
          team_of_affiliation: null,
        },
        application_team: 6,
      },
      {
        id: 25,
        applicant: {
          id: 4,
          username: 'test3',
          email: 'test3@example.com',
          team_of_affiliation: null,
        },
        application_team: 6,
      },
    ];

    render(<InvitationList invitations={initialData} />);
    expect(screen.getByText('test1')).toBeTruthy();
    expect(screen.getByText('test3')).toBeTruthy();
  });
});
