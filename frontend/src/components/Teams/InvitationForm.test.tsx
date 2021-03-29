import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { apiConfig } from 'commons/apiConfig';
import InvitationForm from 'components/Teams/InvitationForm';

const baseUrl: string | undefined = apiConfig.apiUrl;

const mock = new MockAdapter(axios);

afterEach(cleanup);

describe('ApplicationForm', () => {
  it('Should display team name and can click select box', async () => {
    render(<InvitationForm />);
    expect(screen.getByText('招待')).toBeTruthy();
  });

  it('Post Invitation', async () => {
    mock.onPost(`${baseUrl}invitation_create/`).reply(201);

    render(<InvitationForm />);
    userEvent.type(screen.getByRole('textbox'), 'test1@example.com');
    userEvent.click(screen.getByText('招待'));
    expect(await screen.findByText('招待しました')).toBeTruthy();
  });
});
