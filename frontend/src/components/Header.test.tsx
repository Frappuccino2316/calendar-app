import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, render, screen } from '@testing-library/react';
import Header from 'components/Header';

afterEach(cleanup);

describe('Header', () => {
  it('Should display link by auth user', async () => {
    const setIsLogin = (param: boolean) => {};
    render(
      <BrowserRouter>
        <Header isLogin={true} setIsLogin={setIsLogin} />
      </BrowserRouter>
    );
    expect(screen.getByText('Scrum Calendar')).toBeTruthy();
    expect(screen.getByText('Task')).toBeTruthy();
    expect(screen.getByText('Team')).toBeTruthy();
    expect(screen.getByText('Setting')).toBeTruthy();
  });

  it('Should not display link by not auth user', async () => {
    const setIsLogin = (param: boolean) => {};
    render(
      <BrowserRouter>
        <Header isLogin={false} setIsLogin={setIsLogin} />
      </BrowserRouter>
    );
    expect(screen.getByText('Scrum Calendar')).toBeTruthy();
    expect(screen.queryByText('Task')).not.toBeTruthy();
    expect(screen.queryByText('Team')).not.toBeTruthy();
    expect(screen.queryByText('Setting')).not.toBeTruthy();
  });
});
