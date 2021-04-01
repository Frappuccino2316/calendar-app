import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from 'components/utils/button/Button';

describe('Button component', () => {
  it('display Button by props text', () => {
    render(<Button text="Test" onClickFunction={() => console.log('test')} />);
    expect(screen.getByText('Test')).toBeTruthy();
  });
});
