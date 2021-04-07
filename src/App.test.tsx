import React from 'react';
import { render, screen } from '@testing-library/react';
import KataForm from './App';

test('renders learn react link', () => {
  render(<KataForm />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
