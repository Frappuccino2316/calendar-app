import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { apiConfig } from 'commons/apiConfig';
import ApplicationForm from 'components/Teams/ApplicationForm';

const baseUrl: string | undefined = apiConfig.apiUrl;

const mock = new MockAdapter(axios);

afterEach(cleanup);

describe('ApplicationForm', () => {
  it('Should display team name and cancel button, when success request', async () => {
    mock.onGet(`${baseUrl}teams/`).reply(200, [
      {
        id: 1,
        team_name: 'Disney',
        created_at: '2021-02-11 22:23',
        updated_at: '2021-02-11 22:23',
      },
      {
        id: 2,
        team_name: 'Frappuccino',
        created_at: '2021-02-22 21:55',
        updated_at: '2021-02-22 21:55',
      },
    ]);

    mock.onPost(`${baseUrl}applicants_create/`).reply(201, {
      id: 7,
      application_team: 1,
    });

    render(<ApplicationForm />);
    userEvent.click(screen.getByText('Disney'));
    userEvent.click(screen.getByText('Frappuccino'));
    userEvent.click(screen.getByText('申請'));
    expect(await screen.findByText('申請中です')).toBeTruthy();
    expect(await screen.findByText('Disney')).toBeTruthy();
    expect(await screen.findByText('取消')).toBeTruthy();
  });

  it('Can not click select box', async () => {
    mock.onGet(`${baseUrl}teams/`).reply(200, []);

    render(<ApplicationForm />);
    expect(await screen.findByText('申請')).toBeDisabled();
  });
});
