import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders auth page', () => {
  const { getAllByText } = render(<App />);
  const elements = getAllByText(/Psy Admin/i);
  elements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});
