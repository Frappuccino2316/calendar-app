import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { apiConfig } from 'commons/apiConfig';
import CancelButton from 'components/Teams/CancelButton';

const baseUrl: string | undefined = apiConfig.apiUrl;

const mock = new MockAdapter(axios);

afterEach(cleanup);

describe('Cancel Button', () => {
  it('Should display cancel button', () => {
    // render(<CancelButton application_id="10" />);
    // expect(screen.getByText('取消')).toBeTruthy();
  });
});
