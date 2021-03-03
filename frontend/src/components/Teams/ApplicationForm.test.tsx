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
  it('Should display team name and can click select box', async () => {
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

    mock.onGet(`${baseUrl}my_application/`).reply(200, []);

    // mock.onPost(`${baseUrl}applicants_create/`).reply(201, {
    //   id: 7,
    //   application_team: 1,
    // });

    render(<ApplicationForm />);
    expect(await screen.findByText('Disney')).toBeTruthy();
    userEvent.click(await screen.findByText('Disney'));
    expect(await screen.findByText('Frappuccino')).toBeTruthy();
  });

  it('Can not click application button when not presence team', async () => {
    mock.onGet(`${baseUrl}teams/`).reply(200, []);
    mock.onGet(`${baseUrl}my_application/`).reply(200, []);

    render(<ApplicationForm />);
    expect(await screen.findByText('申請')).toBeDisabled();
  });

  it('Should not display select box, when already apply now', async () => {
    mock.onGet(`${baseUrl}teams/`).reply(200, [
      {
        id: 1,
        team_name: 'Disney',
        created_at: '2021-02-11 22:23',
        updated_at: '2021-02-11 22:23',
      },
    ]);

    mock.onGet(`${baseUrl}my_application/`).reply(200, [
      {
        id: 9,
        applicant: 7,
        application_team: 1,
      },
    ]);

    // mock.onPost(`${baseUrl}applicants_create/`).reply(201, {
    //   id: 7,
    //   application_team: 1,
    // });

    render(<ApplicationForm />);
    expect(await screen.queryByText('Disney')).not.toBeTruthy();
    expect(await screen.findByText('申請中です')).toBeTruthy();
  });
});
