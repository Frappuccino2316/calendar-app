import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from 'components/Title';

describe('Title', () => {
  it('Should render title word from props', () => {
    render(<Title title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeTruthy();
  });
});
