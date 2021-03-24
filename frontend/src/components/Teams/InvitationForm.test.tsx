import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import { apiConfig } from 'commons/apiConfig';
import InvitationForm from 'components/Teams/InvitationForm';

// const baseUrl: string | undefined = apiConfig.apiUrl;

// const mock = new MockAdapter(axios);

afterEach(cleanup);

describe('ApplicationForm', () => {
  it('Should display team name and can click select box', async () => {
    render(<InvitationForm />);
    expect(screen.findByText('招待')).toBeTruthy();
  });
});
