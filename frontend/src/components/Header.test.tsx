import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { apiConfig } from 'commons/apiConfig';
import Header from 'components/Header';

const baseUrl: string | undefined = apiConfig.apiUrl;

const mock = new MockAdapter(axios);

afterEach(cleanup);

describe('Header', () => {
  it('Should display link by auth user', async () => {
    mock.onPost(`${baseUrl}auth/jwt/verify`).reply(200, {});
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText('Scrum Calendar')).toBeTruthy();
    await expect(screen.findByText('Task')).toBeTruthy();
    await expect(screen.findByText('Team')).toBeTruthy();
    await expect(screen.findByText('Setting')).toBeTruthy();
  });

  it('Should not display link by not auth user', async () => {
    mock.onPost(`${baseUrl}auth/jwt/verify`).reply(401, {
      detail: 'Token is invalid or expired',
      code: 'token_not_valid',
    });
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText('Scrum Calendar')).toBeTruthy();
    await expect(screen.queryByText('Task')).toBeNull();
    await expect(screen.queryByText('Team')).toBeNull();
    await expect(screen.queryByText('Setting')).toBeNull();
  });
});
